// two TF (true float)
// operations: + - * /
var hello = 12;

function TF(number) {
    // solution 1
    // let numArray = number.toString().split(".");
    // let leftSide = parseInt(numArray[0]);
    // let rightSide = parseInt(numArray[1]);


    // solution 2 - LOL
    let leftSide = Math.floor(number);
    let abs = Math.abs(number);
    let rightSide = abs - Math.floor(abs);
    
    

    console.log('number', number);
    console.log('leftSide', leftSide);
    console.log('rightSide', rightSide);

}

TF(13.3);
