var http = require('http');
var fs = require('fs');
var url = require('url');
var {rsa_decrypt,get_RSA_keys,make_RSA_keys}=require('./myRSA.js');
var site = fs.readFileSync(__dirname + '/localhost.html').toString();
var siter = () => site.split('\\\\').join(timesOpened);
var theChat = []; var theList = []; var toAll = {};
var myLocalIp = ""; var myIP = ""; toAll.closed=true;
var theName = ""; var theKey = ""; var theCode = "";
var msl = fs.readFileSync(__dirname + '/mainserverlocation.txt').toString();
var myAddr = ""; var pKeyy = ""; var pKey = ""; var setupComplete=false;
var oi = "yes"; var isLogged = false; var pii = []; var timesOpened=0;
let {encrypt,decrypt,makeLedger} = require('./encryption.js');
let {exec,spawn}=require('child_process')
let shellCommand=(require('util')).promisify(exec)
let specialText=(text)=>'\x1b[1m\x1b[33m'+text+'\x1b[0m'
var keysJSON=require('./JSON/keys.json')
var keyCode=null; var ledger=null; var public=null

async function showShell(command){
  return await new Promise(resolve=>{
    let options={stdio:'inherit',env:process.env,cwd:undefined,shell:true}
    let myChild=spawn(command,options)
    myChild.on('close',resolve)
  })
}
async function getMyKeys(message){
  return new Promise((r,j)=>{
    try{ var[rsa_private,rsa_public]=get_RSA_keys('slate') }
    catch{ var[rsa_private,rsa_public]=make_RSA_keys('slate') }
    console.log(specialText(message))
    var xhd=new XMLHttpRequest()
    xhd.open('POST',msl,true)
    xhd.setRequestHeader("keys","yes")
    xhd.send(rsa_public); xhd.onerror=j
    xhd.onload=function(){
      try{
        keysJSON[msl]=JSON.parse(rsa_decrypt(rsa_private,xhd.responseText))
        keyCode=keysJSON[msl].private.key
        ledger=keysJSON[msl].private.ledger
        public=keysJSON[msl].public.toString()
        fs.writeFileSync(__dirname+'/JSON/keys.json',JSON.stringify(keysJSON))
        setTimeout(r,0) //if no private key for site exists(like on FIRST ever connection since u get the package)
      }
      catch(err){console.log(specialText("Well, the mainserver isn't responding to our request(it's probably updating)")); process.exit(0)}
    }
  })
}
async function wakeUp(n){
  //sometimes the mainserver is sleeping so this is to wake it up
  n=n||0 //the MAX amount of time trying to wake up server would be ~ 35 seconds
  if(n>5){
    console.log(specialText("mainserver is not waking up right now.. maybe it's updating"))
    process.exit(0) //at this point, continuing to try wouldn't make sense
  }
  if(n){console.log(specialText(`Wake up Attempt ${n}/5`))}
  return await new Promise((r,j)=>{
    var xhd=new XMLHttpRequest()
    xhd.open('GET',msl,true)
    let recurse=()=>{
      xhd.onload=()=>{} //stops trying this instance of request after 5 seconds
      wakeUp(n+1).then(r) //so another instance of a request is tried
    }
    let s=setTimeout(recurse,7e3); xhd.onerror=recurse
    xhd.send(); xhd.onload=()=>r(clearTimeout(s))
  })
}

var XMLHttpRequest, ngrok;
(async function() {
try{
  try{
    XMLHttpRequest=require("xmlhttprequest")
    XMLHttpRequest=XMLHttpRequest.XMLHttpRequest
    ngrok=require('ngrok')
  }
  catch{
    console.log(specialText("Installing Dependencies..."))
    let directory=process.argv[1].split('').map(letter=>letter=='"'?"\\"+letter:letter).join('')
    directory=directory.substr(0, directory.length-9)
    await showShell(`cd "${directory}"`)
    await showShell("npm update")
    XMLHttpRequest=require("xmlhttprequest")
    XMLHttpRequest=XMLHttpRequest.XMLHttpRequest
    ngrok=require('ngrok')
  }
  console.log(specialText("Ensuring this mainserver is awake..."))
  await wakeUp()
  if(!keysJSON[msl]){await getMyKeys("Obtaining first-time keys for this server...")}
  else{
    keyCode=keysJSON[msl].private.key
    ledger=keysJSON[msl].private.ledger
    public=keysJSON[msl].public.toString()
    console.log(specialText("Ensuring that this server uses your stored keys..."))
    await new Promise((r,j)=>{
      var xhr=new XMLHttpRequest()
      xhr.open('POST',msl,true)
      xhr.setRequestHeader("public",public)
      xhr.setRequestHeader("s", commEncrypt(keyCode, "makeJSON", ledger))
      xhr.send(); xhr.onload=async function(){
        if(xhr.responseText=="yes"){return r()}
        await getMyKeys("Re-Obtaining keys for this server...")
        return r()
      }
      xhr.onerror=j
    })
  }
  console.log(specialText("Ready to Launch >:D"))
  
  //ngrok for port tunnelling 
  try{myAddr = await ngrok.connect(8082);}
  catch(err){console.error("Failed setting up required ngrok tunnel.. reason being\n~",err); process.exit(0)}
  
  //now to try to open browser with localhost:8082
  let stderr=null; let stdout=null; setupComplete=true
  console.log(specialText("Launching..."))
  //in one case the shellCommand function was hanging so no more await
  if(process.platform=="win32"){
    let x = shellCommand("start http://localhost:8082"); stdout=x.stdout; stderr=x.stderr
  }
  else if(process.platform=="darwin"){
    let x = shellCommand("open http://localhost:8082"); stdout=x.stdout; stderr=x.stderr
  }
  else{
    let x = shellCommand("xdg-open http://localhost:8082"); stdout=x.stdout; stderr=x.stderr //waiting on this hangs until browser closed
  }
  
  //if it isn't possible, ask the user to open a browser to localhost:8082
  if(stderr){
    console.log(specialText("automatic open failed, so please open a browser tab and go to 'localhost:8082' to connect"));
  }
}
catch(err){console.error(specialText("Slate setup-before-launch failed.. reason being:\n~"),err,specialText("\nPlease raise an issue to my git about this")); process.exit(0)}
})();













///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function commEncrypt (key, data, pKey1) {
  if(pKey1==undefined){pKey1=""}var pKeyTEXT=null
  if(typeof pKey1=="object"){pKeyTEXT=pKey1}
  else if(pKey1!=""){  try{pKeyTEXT = JSON.parse(fs.readFileSync(__dirname + '/JSON/(' + pKey1 + ').json').toString());}catch(err){return("")}  }
  if (key === undefined || data === undefined) {return("")} if (data.length === 0 || key.length === 0) {return("")}
  return encrypt(key,data,pKeyTEXT)||"" //if encrypt action not possible, null returned
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function commDecrypt (key, data, pKey1) {
  if(pKey1==undefined){pKey1=""}var pKeyTEXT=null
  if(typeof pKey1=="object"){pKeyTEXT=pKey1}
  else if(pKey1!=""){  try{pKeyTEXT = JSON.parse(fs.readFileSync(__dirname + '/JSON/(' + pKey1 + ').json').toString());}catch(err){return("")}  }
  if (key === undefined || data === undefined) {return("")} if (data.length === 0 || key.length === 0) {return("")}
  return decrypt(key,data,pKeyTEXT)||"" //if encrypt action not possible, null returned
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














function randomise (theLetter, theNumber, theList) {
let lenp = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ">", "<", "-", "_", "+", "=", "{", ":", "\\", "[", "]", "|", ".", "?", "/", "}", ";", " "];
if (theLetter != undefined) {lenp.forEach((a,i)=>{if(a===theLetter){lenp.splice(i,1);}});}
    var aToi = Math.random() * 10; aToi += 10; aToi = Math.floor(aToi);
    if (theNumber != undefined) {aToi = theNumber;}
    if (theList != undefined) {lenp = theList;}
    var toReturn = "";
    for (var i = 0; i < aToi; i++) {
        var bToi = Math.random() * lenp.length; bToi = Math.floor(bToi);
        toReturn += lenp[bToi];
    }
    return(toReturn);
}
function search (theItem, theList) {
    var ifTrue = false;
    for (var i = 0; i < theList.length; i++) {
      if (theList[i] === theItem) {ifTrue = true;}
    }
    return(ifTrue);
}

function _logout (res) {
  var xhd = new XMLHttpRequest(); xhd.open('POST', msl, true); xhd.setRequestHeader("public",public); xhd.setRequestHeader("s", commEncrypt(keyCode, "logout", ledger));
  var sendData={n:theName, p:theKey}; xhd.send(commEncrypt(keyCode, JSON.stringify(sendData), ledger));
  xhd.onload = function () {isLogged = false; res.write(xhd.responseText); clearInterval(toAll.toInterval); res.end();}
  //even if incorrect data is entered here, because of afk rules on the mainserver, you would still logout
}
function startInterval () {toAll.toInterval = setInterval(()=>{var xhd = new XMLHttpRequest(); xhd.open('POST', msl, true); xhd.setRequestHeader("s", commEncrypt(keyCode, "killT", ledger)); xhd.setRequestHeader("public",public); var sendData={p:theKey, n:theName}; xhd.send(commEncrypt(keyCode, JSON.stringify(sendData), ledger));}, 3000);}

function randomWarning () {
let lenp = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ">", "<", "-", "_", "+", "=", "{", ":", "\\", "[", "]", "|", ",", ".", "?", "/", "}", ";", " "];
    var aToi = Math.random() * 10; aToi += 10; aToi = Math.floor(aToi);
    var toReturn = "";
    for (var i = 0; i < aToi; i++) {
        var bToi = Math.random() * lenp.length; bToi = Math.floor(bToi);
        toReturn += lenp[bToi];
    }
    toReturn += "_almostNoMessageIsTheSame";
    return(toReturn);
}






var x = http.createServer(function (req, res) {
if(!setupComplete){return res.end("WHY are you here already, I'm not finished setting up :/")}
try{
  if (req.method === "GET") {  delete(toAll.closed); res.write(siter()); timesOpened++; res.end();  } //browser load
  else if (req.method === "POST") {
    if (commDecrypt(keyCode, req.headers.s, ledger) === "ipList") { var datum = ""; //list of users to talk to(given from mainserver)
      req.on('data', chunk => {
        datum += chunk;
      }); req.on('end', () => {datum = commDecrypt(keyCode, datum, ledger); theList = datum.split(","); res.end();});
    }
    else if (commDecrypt(theCode, req.headers.s, pKeyy) === "aMessage") { var datum = ""; //a message from a user
      req.on('data', chunk => {
        datum += chunk;
      }); req.on('end', () => {datum=JSON.parse(commDecrypt(theCode, datum, pKeyy)); theChat.push(datum.text); pii.push(datum.pi); res.end();});
    }
    else if(req.headers.host !== "localhost:8082"){ //everything else(below) must be from localhost:8082
      res.write("For Security Reasons, you must access your local slate app at 'localhost:8082'"); res.end();
    }
    else if (req.headers.s === "neither") { //client sending message to other clients
      if (req.headers.m != "" && req.headers.m != undefined) {
        theList.forEach((a,i)=>{
          try{
            var xhd = new XMLHttpRequest();
            xhd.open('POST', a, true);
            xhd.setRequestHeader("s", commEncrypt(theCode, "aMessage", pKeyy));
            var sendData={text:'<b id="'+randomWarning()+'">'+theName+'</b>'+req.headers.m, pi:theName};
            xhd.send(commEncrypt(theCode, JSON.stringify(sendData), pKeyy));
          }
          catch{/*if someone customized their stuff to give a faulty url this catches instead of crashes*/}
        });
      }
      res.end();
    }
    else if (req.headers.s === "either") { //returning received messages to browser
      res.setHeader("oi", oi); var instaText = [];
      for (var i = 0; i < theChat.length; i++) {
        instaText[i]={};
        if (pii[i] === theName) {instaText[i].you=true}
        else {instaText[i].you=false}
        instaText[i].text=theChat[i];
      }
      res.write(JSON.stringify(instaText)); theChat = []; pii = [];
      pKey = ""; res.end();
    }
    else if (req.headers.s === "no" && req.headers.n != undefined && req.headers.p != undefined) { //login
      if (isLogged === false) {
        var xhd = new XMLHttpRequest();
        xhd.open('POST', msl, true);
        xhd.setRequestHeader("public",public);
        xhd.setRequestHeader("s", commEncrypt(keyCode, req.headers.s, ledger));
        var sendData={p:req.headers.p, n:req.headers.n, ip:myAddr};
        xhd.send(commEncrypt(keyCode, JSON.stringify(sendData), ledger));
        xhd.onload = function() {if (xhd.responseText === req.headers.n) {isLogged = true; theName = req.headers.n; theKey = req.headers.p; startInterval();} res.write(xhd.responseText); res.end();}
      }//FIND IP
      else{res.end("Your Device's host is already logged in to an account. CANNOT Login TWICE");} //checking of simultaneous login on one device also checked by main-server BTW :)
    }
    else if (req.headers.s === "yes" && req.headers.n != undefined && req.headers.p != undefined && req.headers.host === "localhost:8082") { //signUp
      var xhd = new XMLHttpRequest();
      xhd.open('POST', msl, true);
      xhd.setRequestHeader("public",public);
      xhd.setRequestHeader("s", commEncrypt(keyCode, req.headers.s, ledger));
      var sendData={p:req.headers.p, n:req.headers.n};
      xhd.send(commEncrypt(keyCode, JSON.stringify(sendData), ledger));
      xhd.onload = function() {res.write(xhd.responseText); res.end();}
    }
    else if (req.headers.s === "logout") {_logout(res)} //logout is a function
    else if (req.headers.s === "createRoom" && req.headers.n != undefined && req.headers.p != undefined && req.headers.z != undefined) { //make room
      var zz = req.headers.z=="yes"?"yes":"no"
      var xhd = new XMLHttpRequest();
      xhd.open('POST', msl, true);
      xhd.setRequestHeader("public",public);
      xhd.setRequestHeader("s", commEncrypt(keyCode, "createRoom", ledger));
      var sendData={n:theName, p:theKey, m:req.headers.n, q:req.headers.p, z:zz};
      xhd.send(commEncrypt(keyCode, JSON.stringify(sendData), ledger));
      xhd.onload = function () {res.write(xhd.responseText); res.end();}
    }
    else if (req.headers.s === "joinRoom" && req.headers.n != undefined && req.headers.p != undefined && req.headers.z != undefined) { //join room
      var zz = req.headers.z=="yes"?"yes":"no"
      var xhd = new XMLHttpRequest();
      xhd.open('POST', msl, true);
      xhd.setRequestHeader("public",public);
      xhd.setRequestHeader("s", commEncrypt(keyCode, "joinRoom", ledger));
      var sendData={n:theName, p:theKey, m:req.headers.n, q:req.headers.p, z:zz};
      xhd.send(commEncrypt(keyCode, JSON.stringify(sendData), ledger));
      xhd.onload = function () {if (xhd.responseText === "Success") {if (zz === "yes") {pKeyy = req.headers.n;} else {pKeyy = "";} theCode = req.headers.p;} res.write(xhd.responseText); res.end();}
    }
    else if (req.headers.s === "makeJSON") { //writing a newly created ledger in JSON folder(for use of custom ledger for room that uses custom ledger)
      var obj=makeLedger(); var mm = req.headers.m; if (req.headers.m === undefined || req.headers.m === "") {mm = "not named_"+randomise();} fs.writeFile(__dirname + '/JSON/('+mm+').json', JSON.stringify(obj), (err) => {if (err) throw err;});
      res.write("Successfully Created Config File"); res.end();
    }
    else if(req.headers.off=="yes"&&req.headers.host === "localhost:8082"){ //program ends when browser connection is closed(CLOSED not RELOADED)
      _logout(res);toAll.closed=true;setTimeout(()=>{if(!toAll.closed){return;}console.log('browser session ended');process.exit(0);},500)
    }
    else {
      res.write("Invalid Request Parameters. This version of Slate is probably outdated ;-;"); res.end();
    }
  }
  else {
    res.write("Invalid Request Method. Who ARE you?"); res.end();
  }
}catch(err){console.error(err); try{res.end("Strange.. an error happened when processing your request.. you doing anything sus?")}catch{} }
}).listen(8082); //the server object listens on port 8082
