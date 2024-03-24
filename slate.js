(async function(){
  var http=require('http'), https=require('https'), fs=require('fs');
  var {rsa_decrypt,get_RSA_keys,make_RSA_keys,ab2str,str2ab,seal_init}=require('./encryption.js');
  var site = fs.readFileSync(__dirname + '/client.html').toString();
  function log(text){console.log('\x1b[1m\x1b[33m'+text+'\x1b[0m')}
  try{ var[rsa_private,rsa_public]=get_RSA_keys('slate') }
  catch{ var[rsa_private,rsa_public]=make_RSA_keys('slate') }
  async function bufferChunk(stream,maxLength=Infinity){
    return new Promise((resolve,reject)=>{
      var temp="" //adding text faster than Buffer.concat
      stream.on('data', function(chunk){
        if(temp.length+chunk.length>maxLength)
          return reject("data length exceeded");
        temp+=ab2str(chunk)
      })
      stream.on('end', function(){ resolve(str2ab(temp)) })
      stream.on('error', reject)
    })
  }
  async function requestURL(url,method="GET",headers={},data=""){
    try{var {hostname,protocol,pathname,search}=new URL(url)}
    catch{return "INVALID URL"}
    return new Promise(function(resolve,reject){
      let options={hostname, port:protocol==="https:"?443:80, path:pathname+search, method, headers}
      let request=(protocol==="https:"?https:http).request(options,async function respond(response){
        resolve(  {headers:response.headers, body:await bufferChunk(response)}  )
      })
      request.on('error',function(error){ reject(error.code||error.message||error) })
      request.write(data)
      request.end()
    })
  }
  await seal_init()
  const server=http.createServer(function(req,res){
    if(req.method==="GET") return res.end(site);
    res.end("");
  }).listen(8082)
})()