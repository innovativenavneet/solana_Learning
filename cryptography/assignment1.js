// i have to return a number which when converted to SHA string 
// generate an output string which starts with '00000'
const crypto = require('crypto');

function findfunctionstartswithzero(str){
let input = 0;
while(true){
    // let inputstr = input.toString();
    // let inputstr = "navneet" + input.toString();
       let inputstr = "navneet => suhani" + input.toString();

    let hashedval = crypto.createHash('sha-256').update(inputstr).digest('hex');

    if(hashedval.startsWith(str)){
        return {input : inputstr, hash: hashedval}
    }
    input++;
}}
const result = findfunctionstartswithzero('00000');
console.log("input val",result.input);
console.log("hashed val",result.hash);