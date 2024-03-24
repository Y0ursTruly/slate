//relic of my past, of the first coding project I engaged in :D
var defaultLedger={
    "leno": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ">", "<", "-", "_", "+", "=", "{", ":", "\\", "[", "]", "|", ",", ".", "?", "/", "'", "\"", "}", ";", " "],
    "lepo": ["1^(3)", "2^(3)", "3^(3)", "4^(3)", "5^(3)", "6^(3)", "7^(3)", "8^(3)", "9^(3)", "10^(3)", "1^(2)", "2^(2)", "3^(2)", "4^(2)", "5^(2)", "6^(2)", "7^(2)", "8^(2)", "9^(2)", "10^(2)", "11^(2)", "12^(2)", "13^(2)", "14^(2)", "15^(2)", "16^(2)", "17^(2)", "18^(2)", "19^(2)", "20^(2)", "21^(2)", "22^(2)", "23^(2)", "24^(2)", "25^(2)", "26^(2)", "1^(1)", "2^(1)", "3^(1)", "4^(1)", "5^(1)", "6^(1)", "7^(1)", "8^(1)", "9^(1)", "10^(1)", "11^(1)", "12^(1)", "13^(1)", "14^(1)", "15^(1)", "16^(1)", "17^(1)", "18^(1)", "19^(1)", "20^(1)", "21^(1)", "22^(1)", "23^(1)", "24^(1)", "25^(1)", "26^(1)", "1^(4)", "2^(4)", "3^(4)", "4^(4)", "5^(4)", "6^(4)", "7^(4)", "8^(4)", "9^(4)", "10^(4)", "11^(4)", "12^(4)", "13^(4)", "14^(4)", "15^(4)", "16^(4)", "17^(4)", "18^(4)", "19^(4)", "20^(4)", "21^(4)", "22^(4)", "23^(4)", "24^(4)", "25^(4)", "26^(4)", "27^(4)", "28^(4)", "29^(4)", "30^(4)", "31^(4)", "32^(4)", "33^(4)"],
    "o34": ",34^(4),", //line
    "o35": ",35^(4),", //number
    "o36": ",36^(4)," //part of number
}
const {floor,ceil,pow,round}=Math;
const random=_=> (crypto.webcrypto||crypto).getRandomValues(new Uint32Array(1))[0] / pow(2,32);
//join function below is significantly faster than Array.prototype.join no cap
function join(array,joiner){
  let string=""; //the string that will be returned
  for(let i=0;i<array.length-1;i++){
    string+=array[i]+joiner;
  }
  return string+array[array.length-1]
}

function getRange(){
  let min=round(random()*(7-2))+2;
  let max=round(random()*( ((2*min)-1) - min ))+min;
  return [min,max];
}
function randomise (theNumber, theList) {
  var chars = theList!==undefined? theList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ">", "<", "-", "_", "+", "=", "{", ":", "\\", "[", "]", "|", ".", "?", "/", "}", ";", " "];
  var length=theNumber!==undefined? theNumber: floor( 10+(random()*10) ), toReturn="";
  for(let i=0;i<length;i++){
    toReturn += chars[ floor(random()*chars.length) ];
  }
  return(toReturn);
}

function search (theItem, theList) {
  var temp = "";
  for(let i=0;i<theItem.length;i++){
    temp+=theItem[i];
    if(theList[temp]){return true}
  }
}
function unequal(length,alphabet,list,min){ //used to return a unique value
  var item=randomise(length,alphabet);
  while(search(item,list)){
    item=randomise(length,alphabet);
  }
  let temp=item.substr(0,min-1);
  for(let i=min-1;i<item.length;i++){
    temp+=item[i]; list[temp]=true;
  }
  return(item);
}

function makeLedger(chars,RANGE){
  if(chars!==undefined){
    let err="If the 'chars' argument is given, it MUST be an ARRAY of 1 length STRINGS"
    if(!Array.isArray(chars)){throw new TypeError(err)}
    const maxNumFromChars=(2*(chars.length-1))**2
    //this only goes above Number.MAX_SAFE_INTEGER when the length is MORE THAN 47453133 LOL
    if(maxNumFromChars>Number.MAX_SAFE_INTEGER){throw new RangeError("The length of the given array is too long")}
    for(let i=0;i<chars.length;i++){
      if(typeof chars[i]!=="string"){throw new TypeError(err+`\nCaused by chars[${i}]`)}
      if(chars[i].length!==1){throw new TypeError(err+`\nCaused by chars[${i}]`)}
    }
  }
  if(RANGE!==undefined){
    let incorrectRange="If the 'RANGE' argument is given, it must be an ARRAY of NUMBERS: [min,max]"
    +"\nSuch that [min=n, n<=max<=2n-1] where n>=2"
    if(!Array.isArray(RANGE)){throw new TypeError(incorrectRange)}
    if(typeof RANGE[0]!=="number"||typeof RANGE[1]!=="number"){
      throw new TypeError(incorrectRange);
    }
    if(RANGE[0] < 2){throw new RangeError(incorrectRange)}
    if(RANGE[1] > (2*RANGE[0])-1){throw new RangeError(incorrectRange)}
  }
  
  chars = chars||["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")",">","<","-","_","+","=","{",":","\\","[","]","|",",",".","?","/","'","\"","}",";"," "];
  var leoo = [...chars], leno = [], lepo = [], cache={};
  let [min,max]=RANGE||getRange(), length =()=> round(random()*(max-min))+min;
  
  for(let i=0;i<chars.length;i++){  lepo.push(unequal(length(),leoo,cache,min))  }
  var o34=unequal(length(),leoo,cache,min);
  var o35=unequal(length(),leoo,cache,min);
  var o36=unequal(length(),leoo,cache,min);
  while (chars.length !== 0) {
    leno.push(chars.splice(  floor(random()*chars.length),1  )[0]);
  }
  return {leno,lepo,o34,o35,o36};
}

function checkArguments(key,data,ledger){
  let type_err=(  !(key?.length)||!(data?.length)  )||(  typeof(key)!=="string"||typeof(data)!=="string"  )
  if(type_err){throw new TypeError("The first 2 arguments, 'key' and 'data' MUST each be a NON-EMPTY STRING")}
  if(key.length<4){throw new RangeError("The length of 'key' MUST be AT LEAST 4")}
  const count={} //throw an error if less than 3 unique characters
  for(let i=0;i<key.length;i++){
    if(ledger.leno.index[key[i]]===undefined){
      let err="The 'key' contains at least one character that DOES NOT EXIST in the ledger:\n"+key[i]
      +"\nThis means the default ledger OR the one given didn't include that character"
      +"\nSuggestion: Try using a custom ledger or standard QWERTY keyboard characters"
      throw new ReferenceError(err);
    }
    if(ledger.leno.index[key[i]]>0){ count[key[i]]=true }
    else{ Object.defineProperty(count,key[i],{value:true,enumerable:false}) }
  }
  if(Object.keys(count).length<3){
    let err="A valid 'key' MUST have at least 3 UNIQUE characters"
    if(Object.getOwnPropertyNames().length<3){throw new Error(err)}
    else{
      let ERR="While 'key' TECHNICALLY has 3 UNIQUE characters, the problem is:\n"+ledger.leno[0]
      +"\nThis character has a ledger value of 0. Minus this character and there are not 3 UNIQUE ones"
      +"\nYou can use this character in a key still, however your key must have ANOTHER UNIQUE character"
      throw new Error(ERR);
    }
  }
  for(let i=0;i<data.length;i++){
    if(ledger.leno.index[data[i]]===undefined){
      let err="The 'data' contains at least one character that DOES NOT EXIST in the ledger:\n"+data[i]
      +"\nThis means the default ledger OR the one given didn't include that character"
      +"\nSuggestion: Try using a custom ledger or standard QWERTY keyboard characters"
      throw new ReferenceError(err);
    }
  }
}

//helper functions that encrypt use begin
function matrix (keyCol1, keyCol2, dataRow1, dataRow2) {
  var matricies = [], index = 0;
  for(let i=0;i<keyCol1.length;i++){
    matricies[index++] = [];
    for(let j=0;j<dataRow1.length;j++){
      matricies[index-1].push((keyCol1[i] * dataRow1[j]) + (keyCol2[i] * dataRow2[j]));
    }
  }
  return(matricies);
}

function alphaEnc (nums, alphabet, key) { //encodes an array of numbers based on an albhabet of characters
  var anAnswer = [];
  for(let i=0;i<nums.length;i++){
    let o1=1, o0=0, myNum=nums[i], toPut=[], base=alphabet.length;
    let keyCount = key.reduce((a,b,i1)=>a + (key[i1-1]*2 +b-1));
    for(let c=0;c<=i%key.length;c++){ keyCount+=key[c] }
    myNum *= keyCount;
    while (myNum > 0) {
      //until all the value is extracted, keep encoding based on the alphabet
      var toNum = (myNum % pow(base, o1)) / pow(base, o0);
      toPut.unshift(alphabet[toNum]);
      myNum -= toNum * pow(base, o0);
      o1++; o0++;
    }
    anAnswer.push(join(toPut,""));
  }
  return(anAnswer);
}
//helper functions that encrypt use end

//helper functions that decrypt use begin
function alphaDec (data, alphabet, key) {
  var answWerr = [];
  for(let i=0;i<data.length;i++){
    let toAdd=0, datum=data[i], power=0;
    let toDivide = key.reduce((a, b, i1)=>a + (key[i1-1]*2 +b-1));
    for(let j=datum.length-1;j>-1;j--){
      //use each part of the alphabet to decode value as a number
      let toAddto = alphabet.index[ datum[j] ];
      toAdd += (toAddto * pow(alphabet.length, power++));
    }
    for(let j=0;j<=i%key.length;j++){ toDivide+=key[j] }
    toAdd/=toDivide; answWerr.push(toAdd);
  }
  return(answWerr);
}

function simult (x1, y1, ans1, x2, y2, ans2) {
  x1=Number(x1); y1=Number(y1); ans1=Number(ans1);
  x2=Number(x2); y2=Number(y2); ans2=Number(ans2);
  var v1 = [x1, y1, ans1]; //x1+y1=ans1 aka statement1
  var v2 = [x2, y2, ans2]; //x2+y2=ans2 aka statement2
  var plac0 = 0, v3=[];
  
  //x or y is instantly known if one of these values are 0(substitution)
  if([x1,y1,x2,y2].includes(0)){
    if(x1===0){
      let y=ans1/y1, x=(ans2-(y2*y))/x2;
      return [round(x),round(y)];
    }
    else if(x2===0){
      let y=ans2/y2, x=(ans1-(y1*y))/x1;
      return [round(x),round(y)];
    }
    else if(y1===0){
      let x=ans1/x1, y=(ans2-(x2*x))/y2;
      return [round(x),round(y)];
    }
    else if(y2===0){
      let x=ans2/x2, y=(ans1-(x1*x))/y1;
      return [round(x),round(y)];
    }
  }
  
  //else, work them out with the equation comparisons(elimination)
  //multiply statement with lower x by (higher x/lower x) known as plac0
  if (x1 < x2) {
    plac0 = x2 / x1;
    for(let i=0;i<v1.length;i++){ v1[i]*=plac0 }
  }
  else {
    plac0 = x1 / x2;
    for(let i=0;i<v2.length;i++){ v2[i]*=plac0 }
  }
  
  //make a third statement of the differences of (higher x-lower x)
  if (y1 < y2) {
    for(let i=0;i<3;i++){ v3.push(v2[i]-v1[i]) }
  }
  else {
    for(let i=0;i<3;i++){ v3.push(v1[i]-v2[i]) }
  }
  
  var y = v3[2] / v3[1];
  var x = ((ans1 - (y1 * y)) / x1);
  
  return([round(x), round(y)]);
  //the round function is used to correct the roughings made when calculating x and y
  //The roughings happen because when some numbers are divided, multiplying them back is NOT EXACT
}
//helper functions that decrypt use end
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function encrypt (key, data, ledger) {
  var pKeyTEXT = ledger || defaultLedger; //the ledger
  if(!pKeyTEXT.leno.index){ //for caching indexes
    Object.defineProperty(pKeyTEXT.leno,'index',{value:{},enumerable:false});
    pKeyTEXT.leno.index={}; //for caching indexes
    for(let i=0;i<pKeyTEXT.leno.length;i++){ pKeyTEXT.leno.index[pKeyTEXT.leno[i]]=i }
  }
  if(!pKeyTEXT.lepo.index){ //for caching indexes
    Object.defineProperty(pKeyTEXT.lepo,'index',{value:{},enumerable:false});
    for(let i=0;i<pKeyTEXT.lepo.length;i++){ pKeyTEXT.lepo.index[pKeyTEXT.lepo[i]]=i }
  }
  checkArguments(key,data,pKeyTEXT);
  let {leno,lepo} = pKeyTEXT;
  
  key = key.split(""); data = data.split("");
  for(let i=0;i<key.length;i++){ key[i]=leno.index[key[i]] }
  for(let i=0;i<data.length;i++){ data[i]=leno.index[data[i]] }
  var key1=[], key2=[];
  for(let i=1;i<key.length;i+=2){
    key2.push(key[i]); key1.push(key[i-1]);
  }
  
  //the point of this loop is to turn [a,b,c] into [[a1,b1,c1], [a2,b2,c2]]
  //that above example where (a1+a2)%alphabet.length===a and so forth
  //noting that (alphabet) is the the list of characters from a ledger(ledger.leno)
  var theSplit = [data,[]];
  for(let i=0;i<data.length;i++) {
    const modulus=leno.length, number=theSplit[0][i];
    let n1=ceil(random()*((modulus*2)-1)), mod=n1%modulus;
    let n2=mod>number? (modulus+number)-mod: number-mod;
    theSplit[0][i] = n1; //part 1 of n
    theSplit[1][i] = n2; //part 2 of n
  }
  
  var [row1,row2] = theSplit;
  var commEncryption = matrix(key1, key2, row1, row2), thePlacer = [];
  for(let i=0;i<commEncryption.length;i++) {
    thePlacer.push(alphaEnc(commEncryption[i], leno, key));
  }
  for(let i=0;i<thePlacer.length;i++){
    for(let j=0;j<thePlacer[i].length;j++){
      let thePlacing = [];
      for(let k=0;k<thePlacer[i][j].length;k++){
        thePlacing[k] = leno.index[ thePlacer[i][j][k] ];
        thePlacing[k] = lepo[ thePlacing[k] ];
      }
      thePlacer[i][j] = join(thePlacing,pKeyTEXT.o36);
    }
    thePlacer[i] = join(thePlacer[i],pKeyTEXT.o35);
  }
  return join(thePlacer,pKeyTEXT.o34);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function decrypt (key, data, ledger) {
  var pKeyTEXT = ledger || defaultLedger; //the ledger
  if(!pKeyTEXT.leno.index){ //for caching indexes
    Object.defineProperty(pKeyTEXT.leno,'index',{value:{},enumerable:false});
    pKeyTEXT.leno.index={}; //for caching indexes
    for(let i=0;i<pKeyTEXT.leno.length;i++){ pKeyTEXT.leno.index[pKeyTEXT.leno[i]]=i }
  }
  if(!pKeyTEXT.lepo.index){ //for caching indexes
    Object.defineProperty(pKeyTEXT.lepo,'index',{value:{},enumerable:false});
    for(let i=0;i<pKeyTEXT.lepo.length;i++){ pKeyTEXT.lepo.index[pKeyTEXT.lepo[i]]=i }
  }
  checkArguments(key,data,pKeyTEXT);
  let {leno,lepo} = pKeyTEXT;
  
  key = key.split("")
  for(let i=0;i<key.length;i++){ key[i]=leno.index[key[i]] }
  var line=0,numb=0,part=0, temp="", commDecryption=[[[]]];
  for(let i=0;i<data.length;i++){
    temp+=data[i];
    if(temp===ledger.o34){
      temp=""; numb=0; part=0; line++; commDecryption[line]=[[]];
    }
    else if(temp===ledger.o35){
      temp=""; part=0; numb++; commDecryption[line][numb]=[];
    }
    else if(temp===ledger.o36){
      temp=""; part++; //well no arrays to append here xD
    }
    else if(ledger.lepo.index[temp]!==undefined){
      commDecryption[line][numb][part]=temp; temp="";
   }
  }
  
  if (commDecryption[1] === undefined) {throw new Error("Decryption FAILED")}
  for(let i=0;i<commDecryption.length;i++){
    commDecryption[i] = alphaDec(commDecryption[i], lepo, key);
  }
  console.log("after",commDecryption,{temp})
  let eq1=0, eq2=1, x1=key[(2*eq1)], y1=key[(2*eq1)+1], x2=key[(2*eq2)], y2=key[(2*eq2)+1];
  while ((x1===0&&y1===0)||(x2===0&&y2===0)) {
    eq1++; eq2++; x1=key[(2*eq1)]; y1=key[(2*eq1)+1]; x2=key[(2*eq2)]; y2=key[(2*eq2)+1];
  }
  while (x1===x2&&y1===y2) {
    eq2++; x2=key[(2*eq2)]; y2=key[(2*eq2)+1];
  }
  var ans1 = commDecryption[eq1];
  var ans2 = commDecryption[eq2];
  commDecryption.length=0; //emptying array as it will be filled with the decrypted text
  
  for(let i=0;i<ans1.length;i++){
    //ans1 and ans2 are same length btw
    let solution = simult(x1, y1, ans1[i], x2, y2, ans2[i]);
    commDecryption[i] = leno[ (solution[0]+solution[1])%leno.length ];
  }
  return join(commDecryption,"");
}

//--------------------------------------------------------------------------------------------------------------

module.exports={encrypt,decrypt,makeLedger}