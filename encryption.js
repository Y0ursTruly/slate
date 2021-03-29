//I mean if you're here can you 'npm install the-slate'? It would be like an upvote or a like :D
//I know this might seem like a rudimentary algorithm for scrambling(it probably is), but the logic(of the encryption) is sound and encrypting the same text with the same key can produce different results every time
var defaultLedger={
    "leno": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ">", "<", "-", "_", "+", "=", "{", ":", "\\", "[", "]", "|", ",", ".", "?", "/", "'", "\"", "}", ";", " "],
    "lepo": ["1^(3)", "2^(3)", "3^(3)", "4^(3)", "5^(3)", "6^(3)", "7^(3)", "8^(3)", "9^(3)", "10^(3)", "1^(2)", "2^(2)", "3^(2)", "4^(2)", "5^(2)", "6^(2)", "7^(2)", "8^(2)", "9^(2)", "10^(2)", "11^(2)", "12^(2)", "13^(2)", "14^(2)", "15^(2)", "16^(2)", "17^(2)", "18^(2)", "19^(2)", "20^(2)", "21^(2)", "22^(2)", "23^(2)", "24^(2)", "25^(2)", "26^(2)", "1^(1)", "2^(1)", "3^(1)", "4^(1)", "5^(1)", "6^(1)", "7^(1)", "8^(1)", "9^(1)", "10^(1)", "11^(1)", "12^(1)", "13^(1)", "14^(1)", "15^(1)", "16^(1)", "17^(1)", "18^(1)", "19^(1)", "20^(1)", "21^(1)", "22^(1)", "23^(1)", "24^(1)", "25^(1)", "26^(1)", "1^(4)", "2^(4)", "3^(4)", "4^(4)", "5^(4)", "6^(4)", "7^(4)", "8^(4)", "9^(4)", "10^(4)", "11^(4)", "12^(4)", "13^(4)", "14^(4)", "15^(4)", "16^(4)", "17^(4)", "18^(4)", "19^(4)", "20^(4)", "21^(4)", "22^(4)", "23^(4)", "24^(4)", "25^(4)", "26^(4)", "27^(4)", "28^(4)", "29^(4)", "30^(4)", "31^(4)", "32^(4)", "33^(4)"],
    "Aletter": "-2",
    "o34": ",34^(4),",
    "o35": ",35^(4),",
    "o36": ",36^(4),"
}

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

function makeLedger(){
  var lenp = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")",">","<","-","_","+","=","{",":","\\","[","]","|",",",".","?","/","'","\"","}",";"," "];
  var leno = []; var lepo = []; var leo = Math.random() * 7; leo = Math.ceil(leo); leo += 5; var leoo = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","!","@","#","$","%","^","&","*","(",")",">","<","-","_","+","=","{","[","]","|","}"];
  for (var i = 0; i < lenp.length; i++) {var abc = randomise("", leo, leoo); while(search(abc,leno)===true){abc=randomise("", leo, leoo);} lepo.push(abc);}
  var Aletter = randomise(",", leo, leoo);   while(search(Aletter,lepo) === true){Aletter = randomise(",", leo, leoo);}   var theCount = []; theCount.push(Aletter);
  var o34 = randomise("", leo, leoo);   while(search(o34,lepo) === true){o34 = randomise("", leo, leoo);}   while(search(o34,theCount) === true){o34 = randomise("", leo, leoo);} theCount.push(o34);
  var o35 = randomise("", leo, leoo);   while(search(o35,lepo) === true){o35 = randomise("", leo, leoo);}   while(search(o35,theCount) === true){o35 = randomise("", leo, leoo);} theCount.push(o35);
  var o36 = randomise("", leo, leoo);   while(search(o36,lepo) === true){o36 = randomise("", leo, leoo);}   while(search(o36,theCount) === true){o36 = randomise("", leo, leoo);}
  while (lenp.length != 0) {var cvb=Math.random()*lenp.length; cvb=Math.floor(cvb); leno.push(lenp[cvb]); lenp.splice(cvb,1);}
  var obj = {}; obj.leno = leno; obj.lepo = lepo; obj.Aletter = Aletter; obj.o34 = o34; obj.o35 = o35; obj.o36 = o36; return obj
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function encrypt (key, data, ledger) {try{
var pKeyTEXT = ledger || defaultLedger
if (key === undefined || data === undefined) {return(null)}
if (data.length === 0 || key.length === 0) {return(null)}











function matrix (keyCol1, keyCol2, dataRow1, dataRow2) {
    var matricies = [];
    for (var ty = 0; ty < keyCol1.length; ty++) {
        for (var tx = 0; tx < dataRow1.length; tx++) {
            matricies.push((keyCol1[ty] * dataRow1[tx]) + (keyCol2[ty] * dataRow2[tx]));
        }
        matricies.push(pKeyTEXT.Aletter);
    }
    return(matricies);
}







function alphaEnc (nums, alphabet) {
    var anAnswer = [];
    for (var nev = 0; nev < nums.length; nev++) {
        var o1 = 1; var o0 = 0; var myNum = nums[nev]; var toPut = []; var base = alphabet.length;
        while (myNum > 0) {
          var toNum = myNum % Math.pow(base, o1) / Math.pow(base, o0);
          toPut.unshift(leno[toNum]);
          myNum -= toNum * Math.pow(base, o0);
          o1++; o0++;
        }
        toPut = toPut.join("");
        anAnswer.push(toPut);
    }
    return(anAnswer);
}









function basicDecode (list, num) {return(list[num]);}
key = key.toString();
key = key.split("");
data = data.toString();
data = data.split("");
function basicEncode (list, char) {return(list.indexOf(char));}
let leno = pKeyTEXT.leno;
for (var du = 0; du < key.length; du++) {
    key[du] = basicEncode(leno, key[du]);
}
for (var de = 0; de < data.length; de++) {
    data[de] = basicEncode(leno, data[de]);
}
var key1 = []; var key2 = [];
for (var gg = 1; gg < key.length; gg += 2) {
    var gn = gg - 1;
    key2.push(key[gg]);
    key1.push(key[gn]);
}

    
    
var a = 0;
var b = 0;
var c = 0;
var d = 0;
    
for (var j = 0; j < key.length; j+=4) {
    a += key[j];
}
for (var j = 1; j < key.length; j+=4) {
    b += key[j];
}
for (var j = 2; j < key.length; j+=4) {
    c += key[j];
}
for (var j = 3; j < key.length; j+=4) {
    d += key[j];
}
    var n = key.length / 4;
    var aa = a / n;
    var bb = b / n;
    var cc = c / n;
    var dd = d / n;
    
    var encVector = key;
    var commEncryption = data;
    var stopTo = commEncryption.length;
    commEncryption.push(pKeyTEXT.Aletter);
    
    for (var di = 0; di < stopTo; di++) {
        var theMath = Math.random() * commEncryption[di];
        theMath = Math.floor(theMath);
        var i = commEncryption[di] - theMath;
        var j = theMath;
        commEncryption[di] = i;
        commEncryption.push(j);
    }
    
    var yyy = commEncryption;
    
    
    commEncryption = commEncryption.join(","); 
    
    commEncryption = commEncryption.split(","+pKeyTEXT.Aletter+",");
    
    var row1 = commEncryption[0]; row1 = row1.split(",");
    for (var ppi = 0; ppi < row1.length; ppi++) {
            row1[ppi] = row1[ppi] * 1;    
    }
    
    var row2 = commEncryption[1]; row2 = row2.split(",");
    for (var ppo = 0; ppo < row2.length; ppo++) {
            row2[ppo] = row2[ppo] * 1;    
    }
    
    commEncryption = matrix(key1, key2, row1, row2);
    commEncryption = commEncryption.join(",");
    
    
    var abCryption = commEncryption.split(","+pKeyTEXT.Aletter+",");
    var thePlacer = [];
    for (var nu = 0; nu < abCryption.length; nu++) {
        abCryption[nu] = abCryption[nu].split(",");
        for (var bu = 0; bu < abCryption[nu].length; bu++) {
            abCryption[nu][bu] *= 1;
        }
    }
    var lastly = abCryption.length; lastly -= 1; abCryption[lastly].pop();
    for (var nio = 0; nio < abCryption.length; nio++) {
        thePlacer.push(alphaEnc(abCryption[nio], leno));
    }
    
    let lepo = pKeyTEXT.lepo
    for (var ii = 0; ii < thePlacer.length; ii++) {
        for (var ij = 0; ij < thePlacer[ii].length; ij++) {
            var thePlacing = [];
            for (var jj = 0; jj < thePlacer[ii][ij].length; jj++) {
                thePlacing[jj] = basicEncode(leno, thePlacer[ii][ij][jj]);
                thePlacing[jj] = basicDecode(lepo, thePlacing[jj]);
            }
            thePlacer[ii][ij] = thePlacing.join(pKeyTEXT.o36);
        }
        thePlacer[ii] = thePlacer[ii].join(pKeyTEXT.o35);
    }
    thePlacer = thePlacer.join(pKeyTEXT.o34);
    var thePlaced = thePlacer.split("");
    for (var i = 0; i < thePlaced.length; i++) {
        if (thePlaced[i] === ",") {
            var b = i + 1;
            if (thePlaced[b] === ",") {
                thePlaced.splice(b, 1);
            }
        }
    }
    //thePlacer = thePlaced.join("");
    
    return(thePlacer);
    
    
    
}catch(err){return(null)}}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function decrypt (key, data, ledger) {try{
var pKeyTEXT = ledger || defaultLedger
if (key === undefined || data === undefined) {return(null)}
if (data.length === 0 || key.length === 0) {return(null)}





function alphaDec (data, alphabet) {
    var answWerr = [];
    for (var to = 0; to < data.length; to++) {
        var toAdd = 0;
        var datum = data[to];
        var taa = 0;
        var topp = datum.length; 
        topp -= 1;
        for (var ta = topp; ta > -1; ta -= 1) {
            var toAddto = basicEncode(alphabet, datum[ta]);
            toAdd += (toAddto * Math.pow(alphabet.length, taa));
            taa += 1;
        }
        answWerr.push(toAdd);
    }
    return(answWerr);
}








function simult (x1, y1, ans1, x2, y2, ans2) {
    var v1 = [(x1 * 1), (y1 * 1), (ans1 * 1)];
    var v2 = [(x2 * 1), (y2 * 1), (ans2 * 1)];
    var plac0 = 0;
    var v3 = [];
    
if (x1 < x2) {
    plac0 = x2 / x1;
    for (var ix = 0; ix < v1.length; ix++) {
        v1[ix] *= plac0;
        
        
    }
}   
    
else if (x2 < x1) {
    plac0 = x1 / x2;
    for (var iy = 0; iy < v1.length; iy++) {
        v2[iy] *= plac0;
        
        
    }
}   
    //return(v2[0] / v1[0]);
    
    
    if (y1 < y2) {
    for (var ib = 0; ib < 3; ib++) {
        v3.push(v2[ib] - v1[ib]);
    }
    }
    
    else {
    for (var ic = 0; ic < 3; ic++) {
        v3.push(v1[ic] - v2[ic]);
    }
    }
    
    var y = v3[2] / v3[1];
    var x = ((ans1 - (y1 * y)) / x1);
    var ansWer = [x, y];
    
    return(ansWer); //this is where the slight roughing happens. 'console.log(ansWer);' JUST before 'return(ansWer);' to see what happens. The roughing happens due to when certain fractions are made through division, multiplying them back is NOT EXACT
    
}



















function basicDecode (list, num) {return(list[num]);}
key = key.toString();
key = key.split("");
function basicEncode (list, char) {return(list.indexOf(char));}
let leno = pKeyTEXT.leno;
for (var du = 0; du < key.length; du++) {
    key[du] = basicEncode(leno, key[du]);
}
    
    let lepo = pKeyTEXT.lepo;
    data = data.split(pKeyTEXT.o34);
    for (var i = 0; i < data.length; i++) {
        data[i] = data[i].split(pKeyTEXT.o35);
        for (var j = 0; j < data[i].length; j++) {
            data[i][j] = data[i][j].split(pKeyTEXT.o36);
            for (var k = 0; k < data[i][j].length; k++) {
                data[i][j][k] = basicEncode(lepo, data[i][j][k]);
                data[i][j][k] = basicDecode(leno, data[i][j][k]);
            }
            data[i][j] = data[i][j].join("");
        }
    }
    for (var ii = 0; ii < data.length; ii++) {
        data[ii] = alphaDec(data[ii], leno);
        data[ii] = data[ii].join(",");
    }
    data = data.join(","+pKeyTEXT.Aletter+",");
    
    var commDecryption = data.split(","+pKeyTEXT.Aletter+",");
    var vector1 = commDecryption[0];
    vector1 = vector1.split(",");
    for (var ut = 0; ut < vector1.length; ut++) {
        vector1[ut] *= 1;
    }

    var vector2 = commDecryption[1]; if (vector2 === undefined) {return(null)}
    vector2 = vector2.split(",");
    for (var it = 0; it < vector2.length; it++) {
        vector2[it] *= 1;
    }

    commDecryption = [];
    
    for (var is = 0; is < vector1.length; is++) {
        var vector3 = simult((key[0] * 1), (key[1] * 1), vector1[is], (key[2] * 1), (key[3] * 1), vector2[is]);
        vector1[is] = vector3[0];
        vector2[is] = vector3[1];
    }
    
    for (var cmo = 0; cmo < vector1.length; cmo++) {
        commDecryption[cmo] = Math.round(vector1[cmo] * 1) + Math.round(vector2[cmo] * 1); //the math.round function is used to correct the roughings made with simult. The roughings happen because when some numbers are divided, multiplying them back is NOT EXACT
    } 
    
    
    
    for (var di = 0; di < commDecryption.length; di++) {
        commDecryption[di] = basicDecode(leno, commDecryption[di]);
    }
    commDecryption = commDecryption.join("");
    return(commDecryption);
}catch(err){return(null)}}

//--------------------------------------------------------------------------------------------------------------

module.exports={encrypt,decrypt,makeLedger}
