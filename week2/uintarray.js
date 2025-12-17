function convertintostring(bytes){
    return new TextDecoder().decode(bytes)
}

const bytes = new Uint8Array([125, 97, 118, 110, 101, 101, 116]);
const ans = convertintostring(bytes);
console.log("110, 97, 118, 110, 101, 101, 116 converted into :: ",ans);
