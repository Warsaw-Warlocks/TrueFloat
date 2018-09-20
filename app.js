// two TF (true float)
// operations: + - * /
var hello = 12;

function TF(number) {

    if (typeof number !== 'number') {
        return {
            ...number,
        }
    }
    const numArray = number.toString().split(".");
    const leftSide = parseInt(numArray[0], 10);
    const rightSide = parseInt(numArray[1], 10) || 0;
    const power = Math.pow(10, numArray[1] ? numArray[1].length : 0)

    return {
        leftSide,
        rightSide,
        power,
    }
}

function addTF(num1, num2) {
    const leftSide = num1.leftSide + num2.leftSide;
    const power = num1.power * num2.power;
    const rightSide = num1.rightSide * num2.power + num2.rightSide * num1.power;

    return new TF({
        leftSide,
        rightSide,
        power,
    })
}

let num1 = new TF(13);
let num2 = new TF(9.0003005);
let num3 = addTF(num1, num2);
console.log(num1, num2, num3);