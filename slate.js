var http = require('http');
var fs = require('fs');
var url = require('url');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var siter = fs.readFileSync(__dirname + '/localhost.html');
var theChat = []; var theList = []; var toAll = {};
var myLocalIp = ""; var myIP = ""; toAll.closed=true;
var theName = ""; var theKey = ""; var theCode = "";
var msl = fs.readFileSync(__dirname + '/mainserverlocation.txt').toString();
var myAddr = ""; var pKeyy = ""; var pKey = ""; var setupComplete=false
var oi = "yes"; var isLogged = false; var pii = []
let {encrypt,decrypt,makeLedger} = require('./encryption.js');
let shellCommand=(require('util')).promisify((require('child_process')).exec)
var keysJSON=require('./JSON/keys.json')
var keyCode=null; var ledger=null; var public=null

const ngrok = require('ngrok');
(async function() {
try{
  if(!keysJSON[msl]){await new Promise(r=>{
    var xhd=new XMLHttpRequest()
    xhd.open('POST',msl,true)
    xhd.setRequestHeader("keys","yes")
    xhd.send()
    xhd.onload=function(){
      keysJSON[msl]=JSON.parse(xhd.responseText)
      keyCode=keysJSON[msl].private.key
      ledger=keysJSON[msl].private.ledger
      public=keysJSON[msl].public.toString()
      fs.writeFileSync(__dirname+'/JSON/keys.json',JSON.stringify(keysJSON))
      setTimeout(r,0) //if no private key for site exists(like on FIRST ever connection since u get the package)
    }
  })}
  else{
    keyCode=keysJSON[msl].private.key
    ledger=keysJSON[msl].private.ledger
    public=keysJSON[msl].public.toString()
  }
  
  //ngrok for port tunnelling 
  //try{myAddr = await ngrok.connect(8082);}
  try{myAddr = await ngrok.connect({authtoken: "1YdUnfVDZugXYijco5fQcOAtCy0_5BT1htXvUVKmApuWydeiR", addr: 8082});}
  catch(err){console.error("Failed setting up required ngrok tunnel.. reason being\n~",err); process.exit(0)}
  
  //now to try to open browser with localhost:8082
  let stderr=null; let stdout=null
  if(process.platform=="win32"){
    let x = await shellCommand("start http://localhost:8082"); stdout=x.stdout; stderr=x.stderr
  }
  else if(process.platform=="darwin"){
    let x = await shellCommand("open http://localhost:8082"); stdout=x.stdout; stderr=x.stderr
  }
  else{
    let x = await shellCommand("xdg-open http://localhost:8082"); stdout=x.stdout; stderr=x.stderr
  }
  setupComplete=true
  
  //if it isn't possible, ask the user to open a browser to localhost:8082
  if(stderr){
    console.log("automatic open failed, so please open a browser tab and go to 'localhost:8082' to connect");
  }
}
catch(err){console.error("Slate setup-before-launch failed.. reason being:\n~",err); process.exit(0)}
})();













///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function commEncrypt (key, data, pKey1) {
  if(pKey1==undefined){pKey1=""}var pKeyTEXT=null
  if(typeof pKey1=="object"){pKeyTEXT=pKey1}
  else{  try{pKeyTEXT = JSON.parse(fs.readFileSync(__dirname + '/JSON/(' + pKey1 + ').json').toString());}catch(err){return("")}  }
  if (key === undefined || data === undefined) {return("")} if (data.length === 0 || key.length === 0) {return("")}
  return encrypt(key,data,pKeyTEXT)||"" //if encrypt action not possible, null returned
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function commDecrypt (key, data, pKey1) {
  if(pKey1==undefined){pKey1=""}var pKeyTEXT=null
  if(typeof pKey1=="object"){pKeyTEXT=pKey1}
  else{  try{pKeyTEXT = JSON.parse(fs.readFileSync(__dirname + '/JSON/(' + pKey1 + ').json').toString());}catch(err){return("")}  }
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
  var xhd = new XMLHttpRequest(); xhd.open('POST', msl, true); xhd.setRequestHeader("public",public); xhd.setRequestHeader("s", commEncrypt(keyCode, "logout", ledger)); xhd.setRequestHeader("n", commEncrypt(keyCode, theName, ledger)); xhd.setRequestHeader("p", commEncrypt(keyCode, theKey, ledger)); xhd.send();
  xhd.onload = function () {isLogged = false; res.write(xhd.responseText); clearInterval(toAll.toInterval); /*clearTimeout(toAll.toTimeout);*/ res.end();} //even if incorrect data is entered here, because of afk rules on the mainserver, you would still logout
}
function startInterval () {toAll.toInterval = setInterval(()=>{var xhd = new XMLHttpRequest(); xhd.open('POST', msl, true); xhd.setRequestHeader("s", commEncrypt(keyCode, "killT", ledger)); xhd.setRequestHeader("public",public); xhd.setRequestHeader("p", commEncrypt(keyCode, theKey, ledger)); xhd.setRequestHeader("n", commEncrypt(keyCode, theName, ledger)); xhd.send();}, 3000);}
//function startTimeout () {toAll.toTimeout = setTimeout(()=>{var xhd = new XMLHttpRequest(); xhd.open('POST', msl, true); xhd.setRequestHeader("public",public); xhd.setRequestHeader("s", commEncrypt(keyCode, "logout", ledger)); xhd.setRequestHeader("p", commEncrypt(keyCode, theKey, ledger)); xhd.setRequestHeader("n", commEncrypt(keyCode, theName, ledger)); xhd.send(); clearInterval(toAll.toInterval); oi="no"}, 5000);} ///logout if localhost stops asking for text(action stopped since it creates useless flaws)

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
  if (req.method === "GET") {  delete(toAll.closed); res.write(siter); res.end();  }
  else if (req.method === "POST") {
    if (commDecrypt(keyCode, req.headers.s, ledger) === "ipList") { var datum = ""; //list of users to talk to
      req.on('data', chunk => {
        datum += chunk;
      }); req.on('end', () => {datum = commDecrypt(keyCode, datum, ledger); theList = datum.split(","); res.end();});
    }
    else if (commDecrypt(theCode, req.headers.s, pKeyy) === "aMessage" && req.headers.pi != undefined && commDecrypt(theCode, req.headers.pi, pKeyy) != "") { var datum = ""; //a message from a user
      req.on('data', chunk => {
        datum += chunk;
      }); req.on('end', () => {theChat.push(datum); pii.push(commDecrypt(theCode, req.headers.pi, pKeyy)); res.end();});
    }
    else if(req.headers.host !== "localhost:8082"){ //everything else(below) must be from localhost:8082
      res.write("For Security Reasons, you must access your local slate app at 'localhost:8082'"); res.end();
    }
    else if (req.headers.s === "neither") {
      if (req.headers.m != "" && req.headers.m != undefined) {
        theList.forEach((a,i)=>{
          var xhd = new XMLHttpRequest();
          xhd.open('POST', a, true);
          xhd.setRequestHeader("s", commEncrypt(theCode, "aMessage", pKeyy));
          xhd.setRequestHeader("pi", commEncrypt(theCode, theName, pKeyy));
          xhd.send(commEncrypt(theCode, '<b id="'+randomWarning()+'">'+theName+': </b>'+req.headers.m, pKeyy));
        });
      }
      res.end();
    }
    else if (req.headers.s === "either") {
      res.setHeader("oi", oi); var instaText = [];
      for (var i = 0; i < theChat.length; i++) {
        instaText[i]={};
        if (pii[i] === theName) {instaText[i].you=true}
        else {instaText[i].you=false}
        instaText[i].text=commDecrypt(theCode, theChat[i], pKeyy);
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
        xhd.setRequestHeader("p", commEncrypt(keyCode, req.headers.p, ledger));
        xhd.setRequestHeader("n", commEncrypt(keyCode, req.headers.n, ledger));
        xhd.setRequestHeader("ip", commEncrypt(keyCode, myAddr, ledger));
        xhd.send();
        xhd.onload = function() {if (xhd.responseText === req.headers.n) {isLogged = true; theName = req.headers.n; theKey = req.headers.p; startInterval();} res.write(xhd.responseText); res.end();}
      }//FIND IP
      else{res.end("Your Device's host is already logged in to an account. CANNOT Login TWICE");} //checking of simultaneous login on one device also checked by main-server BTW :)
    }
    else if (req.headers.s === "yes" && req.headers.n != undefined && req.headers.p != undefined && req.headers.host === "localhost:8082") { //signUp
      var xhd = new XMLHttpRequest();
      xhd.open('POST', msl, true);
      xhd.setRequestHeader("public",public);
      xhd.setRequestHeader("s", commEncrypt(keyCode, req.headers.s, ledger));
      xhd.setRequestHeader("p", commEncrypt(keyCode, req.headers.p, ledger));
      xhd.setRequestHeader("n", commEncrypt(keyCode, req.headers.n, ledger));
      xhd.send();
      xhd.onload = function() {res.write(xhd.responseText); res.end();}
    }
    else if (req.headers.s === "logout") {_logout(res)} //logout is a function
    else if (req.headers.s === "createRoom" && req.headers.n != undefined && req.headers.p != undefined && req.headers.z != undefined) {
      var zz = req.headers.z;
      var xhd = new XMLHttpRequest();
      xhd.open('POST', msl, true);
      xhd.setRequestHeader("public",public);
      xhd.setRequestHeader("s", commEncrypt(keyCode, "createRoom", ledger));
      xhd.setRequestHeader("n", commEncrypt(keyCode, theName, ledger));
      xhd.setRequestHeader("p", commEncrypt(keyCode, theKey, ledger));
      xhd.setRequestHeader("m", commEncrypt(keyCode, req.headers.n, ledger));
      xhd.setRequestHeader("q", commEncrypt(keyCode, req.headers.p, ledger));
      if(zz!="yes"){zz="no"} xhd.setRequestHeader("z", commEncrypt(keyCode, zz, ledger));
      xhd.send();
      xhd.onload = function () {res.write(xhd.responseText); res.end();}
    }
    else if (req.headers.s === "joinRoom" && req.headers.n != undefined && req.headers.p != undefined && req.headers.z != undefined) {
      var zz = req.headers.z;
      var xhd = new XMLHttpRequest();
      xhd.open('POST', msl, true);
      xhd.setRequestHeader("public",public);
      xhd.setRequestHeader("s", commEncrypt(keyCode, "joinRoom", ledger));
      xhd.setRequestHeader("n", commEncrypt(keyCode, theName, ledger));
      xhd.setRequestHeader("p", commEncrypt(keyCode, theKey, ledger));
      xhd.setRequestHeader("m", commEncrypt(keyCode, req.headers.n, ledger));
      xhd.setRequestHeader("q", commEncrypt(keyCode, req.headers.p, ledger));
      if(zz!="yes"){zz="no"} xhd.setRequestHeader("z", commEncrypt(keyCode, zz, ledger));
      xhd.send();
      xhd.onload = function () {if (xhd.responseText === "Success") {if (zz === "yes") {pKeyy = req.headers.n;} else {pKeyy = "";} theCode = req.headers.p;} res.write(xhd.responseText); res.end();}
    }
    else if (req.headers.s === "makeJSON") {
      var obj=makeLedger(); var mm = req.headers.m; if (req.headers.m === undefined || req.headers.m === "") {mm = "not named_"+randomise();} fs.writeFile(__dirname + '/JSON/('+mm+').json', JSON.stringify(obj), (err) => {if (err) throw err;});
      res.write("Successfully Created Config File"); res.end();
    }
    else if(req.headers.off=="yes"&&req.headers.host === "localhost:8082"){
      _logout(res);toAll.closed=true;setTimeout(()=>{if(!toAll.closed){return;}console.log('browser session ended');process.exit(0);},500)
    } //program ends when browser connection is closed(CLOSED not RELOADED)
    else {
      res.write("Invalid Request Parameters. This version of Slate is probably outdated ;-;"); res.end();
    }
  }
  else {
    res.write("Invalid Request Method. Who ARE you?"); res.end();
  }
}catch(err){console.error(err); try{res.end("Strange.. an error happened when processing your request.. you doing anything sus?")}catch{} }
}).listen(8082); //the server object listens on port 8082
