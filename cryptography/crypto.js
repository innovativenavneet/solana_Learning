// this is a crypto graphy libraries
const {createHash} = require('crypto')

function hash (input){
    return createHash('sha-256').update(input).digest('base64');
}
// we can't reverse the hashed function to a plain text 

// function hashReversed (input){
//     return  
// }

let password = "navneet";
const hash2 = hash(password);
console.log("haseed password",hash2)
const ans = !!(hash2 == password)
console.log("password is same ",ans);