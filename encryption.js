var crypto=require('crypto'), fs=require('fs')
var padding=crypto.constants.RSA_PKCS1_OAEP_PADDING
var rootDir=__dirname+(process.platform=="win32"?"\\":"/")
const atob=(text)=>Buffer.from(text,'base64').toString('binary')
const btoa=(text)=>Buffer.from(text,'binary').toString('base64')
const oaepHash="sha256", SEAL=require('node-seal')
let seal=null, seal_generator=null, seal_encoder=null, seal_evaluator=null

function str2ab(str,typedarray) {
  let buf=Buffer.alloc(str.length);
  for (let i=0;i<str.length;i++) buf[i]=str_map[str[i]];
  return !typedarray? buf: new typedarray(buf);
}
function ab2str(buf) {
  let arr=new Uint8Array(buf), chars="";
  for(let i=0;i<arr.length;i++) chars+=ab_map[arr[i]];
  return chars;
}
function int32From(data){
  if(typeof data==="string") return str2ab(data,Int32Array);
  if(data[Symbol.toStringTag]!=="Int32Array") return new Int32Array(data);
  return data;
}

function make_RSA_keys(key_name){
  let publicKeyEncoding={type:'spki',format:'pem'}
  let privateKeyEncoding={type:'pkcs8',format:'pem'}
  let {privateKey,publicKey}=crypto.generateKeyPairSync('rsa',
    {modulusLength:4096,publicKeyEncoding,privateKeyEncoding}
  )
  fs.writeFileSync(rootDir+key_name+'-prv.pem',privateKey)
  fs.writeFileSync(rootDir+key_name+'-pub.pem',publicKey)
  return [privateKey, publicKey]
}

function get_RSA_keys(key_name){
  return [
    fs.readFileSync(rootDir+key_name+'-prv.pem'),
    fs.readFileSync(rootDir+key_name+'-pub.pem')
  ]
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
  context = seal.Context(
    parms, // Encryption Parameters
    true, // ExpandModChain
    securityLevel // Enforce a security level
  )
  seal_encoder = seal.BatchEncoder(context)
  seal_generator = seal.KeyGenerator(context)
  seal_evaluator = seal.Evaluator(context)
}
function get_SEAL_keys(){
  //
}
function set_SEAL_keys(){
  //
}
function seal_encrypt(data,pub){
  return seal.Encryptor(context, pub)
  .encrypt(encoder.encode(int32From(data)))
}
function seal_decrypt(data,prv){
  return seal.Decryptor(context, pub)
  .decrypt(encoder.encode(int32From(data)))
}

module.exports={rsa_encrypt,rsa_decrypt,get_RSA_keys,make_RSA_keys,ab2str,str2ab}
