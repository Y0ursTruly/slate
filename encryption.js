var crypto=require('node:crypto'), fs=require('node:fs'), path=require('node:path')
var padding=crypto.constants.RSA_PKCS1_OAEP_PADDING
var rootDir=__dirname+(process.platform=="win32"?"\\":"/")
const atob=(text)=>Buffer.from(text,'base64').toString('binary')
const btoa=(text)=>Buffer.from(text,'binary').toString('base64')
const oaepHash="sha256", SEAL=require('node-seal')
let seal=null, seal_generator=null, seal_encoder=null, seal_context=null, seal_evaluator=null

let ab_map=[], str_map={__proto__:null}, seal_map=new WeakMap()
for(let i=0;i<256;i++){
  ab_map[i]=String.fromCharCode(i)
  str_map[ab_map[i]]=i
}

function str2ab(str,typedarray){
  let buf=Buffer.alloc(str.length)
  for (let i=0;i<str.length;i++) buf[i]=str_map[str[i]];
  return !typedarray? buf: new typedarray(buf)
}
function ab2str(buf,isUint8){
  let arr=!isUint8? new Uint8Array(buf): buf, chars=""
  for(let i=0;i<arr.length;i++) chars+=ab_map[arr[i]];
  return chars
}
function str2bfr(str,typedarray){
  let buf=Buffer.alloc(str.length)
  for (let i=0;i<str.length;i++) buf[i]=str_map[str[i]];
  return !typedarray? buf: new typedarray(buf)
}
function bfr2str(buf){
  let chars=""
  for(let i=0;i<buf.length;i++) chars+=ab_map[buf[i]];
  return chars
}
function int32From(data){
  if(typeof data==="string") return str2ab(data,Int32Array);
  if(data[Symbol.toStringTag]!=="Int32Array") return new Int32Array(data);
  return data
}
function uint8From(data){
  if(typeof data==="string") return str2ab(data,Uint8Array);
  if(data[Symbol.toStringTag]!=="Uint8Array") return new Uint8Array(data);
  return data
}
function arraysEqual(arr1,arr2){
  if(arr1.length!==arr2.length) return false;
  for(let i=0;i<arr1.length;i++)
    if(arr1[i]!==arr2[i]) return false;
  return true
}

function make_RSA_keys(key_name){
  let publicKeyEncoding={type:'spki',format:'pem'}
  let privateKeyEncoding={type:'pkcs8',format:'pem'}
  let {privateKey,publicKey}=crypto.generateKeyPairSync('rsa',
    {modulusLength:4096,publicKeyEncoding,privateKeyEncoding}
  )
  fs.writeFileSync( path.join(rootDir,key_name+'-prv.pem'),privateKey )
  fs.writeFileSync( path.join(rootDir,key_name+'-pub.pem'),publicKey )
  return [privateKey, publicKey]
}
function get_RSA_keys(key_name){
  return [
    fs.readFileSync( path.join(rootDir,key_name+'-prv.pem') ),
    fs.readFileSync( path.join(rootDir,key_name+'-pub.pem') )
  ]
}
function remove_RSA_keys(key_name){
  fs.unlinkSync( path.join(rootDir,key_name+'-prv.pem') )
  fs.unlinkSync( path.join(rootDir,key_name+'-pub.pem') )
}
function rsa_decrypt(key,text){
  if(typeof key=="string"){key=Buffer.from(key)}
  return JSON.parse(text).map(txt=>{
    let data=str2ab(atob(txt))
    let result=crypto.privateDecrypt({key,padding,oaepHash},data)
    return ab2str(result)
  }).join('')
}
function rsa_encrypt(key,text){
  var list=[], n=446
  for(let i in text){
    let index=(i-(i%n))/n
    list[index]=list[index]!=undefined? list[index]+text[i]: text[i]
  }
  if(typeof key=="string"){key=Buffer.from(key)}
  return JSON.stringify( list.map(txt=>{
    let data=str2ab(txt)
    let result=crypto.publicEncrypt({key,padding,oaepHash},data)
    return btoa(ab2str(result))
  }) )
}

async function seal_init(){
  if(seal !== null) return; //already initialised
  seal = await SEAL()
  const schemeType = seal.SchemeType.bfv
  const securityLevel = seal.SecurityLevel.tc128
  const polyModulusDegree = 4096
  const bitSizes = [36, 36, 37]
  const bitSize = 20

  const parms = seal.EncryptionParameters(schemeType)
  // Set the PolyModulusDegree
  parms.setPolyModulusDegree(polyModulusDegree)
  // Create a suitable set of CoeffModulus primes
  parms.setCoeffModulus(
    seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
  )
  // Set the PlainModulus to a prime of bitSize 20.
  parms.setPlainModulus(
    seal.PlainModulus.Batching(polyModulusDegree, bitSize)
  )
  seal_context = seal.Context(
    parms, // Encryption Parameters
    true, // ExpandModChain
    securityLevel // Enforce a security level
  )
  seal_encoder = seal.BatchEncoder(seal_context)
  seal_generator = seal.KeyGenerator(seal_context)
  seal_evaluator = seal.Evaluator(seal_context)
}
function make_SEAL_keys(key_name){
  let prv=seal_generator.secretKey(), pub=seal_generator.createPublicKey()
  fs.writeFileSync( path.join(rootDir,key_name+'-prv.bin'),prv.saveArray() )
  fs.writeFileSync( path.join(rootDir,key_name+'-pub.bin'),pub.saveArray() )
  return [prv,pub]
}
function get_SEAL_keys(key_name){
  let uint8prv=new Uint8Array(fs.readFileSync( path.join(rootDir,key_name+'-prv.bin') ))
  let uint8pub=new Uint8Array(fs.readFileSync( path.join(rootDir,key_name+'-pub.bin') ))
  let prv=seal.SecretKey(), pub=seal.PublicKey()
  prv.loadArray(seal_context,uint8prv)
  pub.loadArray(seal_context,uint8pub)
  return [prv,pub]
}
function remove_SEAL_keys(key_name){
  fs.unlinkSync( path.join(rootDir,key_name+'-prv.bin') )
  fs.unlinkSync( path.join(rootDir,key_name+'-pub.bin') )
}
function seal_decrypt(data,prv){
  if(!seal_map.has(prv)) seal_map.set(prv,seal.Decryptor(seal_context,prv));
  const interface=seal_map.get(prv)
  const ciphertext=seal.CipherText()
  ciphertext.loadArray(seal_context,uint8From(data))
  const result=seal_encoder.decode( interface.decrypt(ciphertext) )
  return ab2str(result,true)
}
function seal_encrypt(data,pub){
  if(!seal_map.has(pub)) seal_map.set(pub,seal.Encryptor(seal_context,pub));
  const interface=seal_map.get(pub)
  const result=interface.encrypt(seal_encoder.encode(int32From(data))).saveArray()
  return ab2str(result,true)
}
function seal_add(cipher_text1, cipher_text2){
  const ciphertext1=seal.CipherText(), ciphertext2=seal.CipherText()
  ciphertext1.loadArray(seal_context,uint8From(cipher_text1))
  ciphertext2.loadArray(seal_context,uint8From(cipher_text2))
  return ab2str( seal_evaluator.add(ciphertext1, ciphertext2).saveArray(),true )
}

async function aes_enc(data,key,s,throwErrors){
  s ||= String(salt)
  key ||= String(aes256key)
  return new Promise(function(resolve,reject){
    scrypt(key,s,32,function(err,key){
      if(err) return throwErrors?reject(err):resolve("");
      const iv=Buffer.from( (crypto.webcrypto||crypto).getRandomValues(new Uint8Array(16)) )
      let cipher=createCipheriv('aes-256-ctr',key,iv), str=bfr2str(iv)
      cipher.on('error',function(err){throwErrors?reject(err):resolve("")})
      cipher.on('data',function(chunk){str+=bfr2str(chunk)})
      cipher.on('end',function(){resolve(btoa(str))})
      cipher.write(data)
      cipher.end()
    })
  })
}
async function aes_dec(base64str,key,s,throwErrors){
  s ||= String(salt)
  key ||= String(aes256key)
  const encrypted=atob(base64str), iv=str2bfr(encrypted.substring(0,16)), data=encrypted.substring(16)
  return new Promise(function(resolve,reject){
    //scryptPbkdf.scrypt(key,s,32,{N:16384,r:8,p:1}).then(function(key,err){
    scrypt(key,s,32,function(err,key){
      if(err) return throwErrors?reject(err):resolve("");
      let decipher=createDecipheriv('aes-256-ctr',key,iv), str=""
      decipher.on('readable',function(){
        for(let chunk=decipher.read(); chunk!==null; chunk=decipher.read())
          str+=bfr2str(chunk);
      })
      decipher.on('error',function(err){throwErrors?reject(err):resolve("")})
      decipher.on('end',function(){resolve(str)})
      decipher.write(data,'binary')
      decipher.end()
    })
  })
}

module.exports={
  ab2str, str2ab, bfr2str, str2bfr, arraysEqual, aes_enc, aes_dec,
  rsa_encrypt, rsa_decrypt, get_RSA_keys, make_RSA_keys, remove_RSA_keys,
  seal_encrypt, seal_decrypt, seal_add, seal_init, get_SEAL_keys, make_SEAL_keys, remove_SEAL_keys
}
