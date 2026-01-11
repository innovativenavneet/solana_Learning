// lets generate a code that will takes input from the user and generate bits from them
/* charCodeAt means = to retrieve the Unicode value (specifically, 
  the UTF-16 code unit) of the character at a specified index in a string*/
// function convert(str){
//     return new Uint8Array(str.map(str => str.charCodeAt(0)));
// } 
/* =>the problem with the current function is that .map doesn't work with string it only works with array  */
function convert(str){
    let code = []
    for(let i =0 ; i< str.length ; i++){
        /* charCodeAt means = to retrieve the Unicode value (specifically, 
           the UTF-16 code unit) of the character at a specified index in a string*/
        code.push(str.charCodeAt(i));
    }
    //the Uint8Array will return bits of array 
    return new Uint8Array(code)
}
let str = "Navneet";
const ans = convert(str);
console.log("ans ",ans);


