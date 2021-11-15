var crypto=require('crypto'), fs=require('fs')
var padding=crypto.constants.RSA_PKCS1_OAEP_PADDING
var rootDir=__dirname+(process.platform=="win32"?"\\":"/")
const atob=(text)=>Buffer.from(text,'base64').toString('binary')
const btoa=(text)=>Buffer.from(text,'binary').toString('base64')
let oaepHash="sha256"

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function ab2str(buf,getOwnPropertyNames) {
    var buff=new Uint8Array(buf)
    return Object.getOwnPropertyNames(buff)
    .map(i=>String.fromCharCode(buff[i])).join('')
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

module.exports={rsa_encrypt,rsa_decrypt,get_RSA_keys,make_RSA_keys,ab2str,str2ab}
