// two TF (true float)
// operations: + - * /

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

function multiplyTF(num1, num2) {
    // const leftSide = num1.leftSide * num2.leftSide;
    const power = num1.power * num2.power;
    // // const rightSide = num1.rightSide * num2.power * num2.rightSide * num1.power;
    // const rightSide = num1.rightSide * num2.rightSide;

    const temp1 = num1.leftSide * num2.leftSide;
    const temp2 = num1.rightSide / num2.power * num2.leftSide;
    const temp3 = num1.leftSide * num2.rightSide / num1.power;
    const temp4 = num1.rightSide / num2.power * num2.rightSide / num1.power;

    const temp1A = temp1.toString().split(".");
    const temp2A = temp2.toString().split(".");
    const temp3A = temp3.toString().split(".");
    const temp4A = temp4.toString().split(".");

    const leftSide = (parseInt(temp1A[0]) + parseInt(temp2A[0]) + parseInt(temp3A[0]) + parseInt(temp4A[0]));
    const rightSide = (parseInt((temp1A[1] || "0") + parseInt(temp2A[1]) + parseInt(temp3A[1]) + parseInt(temp4A[1])));

    console.log(temp1, temp2, temp3, temp4);
    console.log(temp1A, temp2A, temp3A, temp4A);
    console.log(leftSide, rightSide);

    return new TF({
        leftSide,
        rightSide,
        power,
    })
}

let num1 = new TF(1.5);
let num2 = new TF(1.5);
let num3 = addTF(num1, num2);
let num4 = multiplyTF(num1, num2);
// console.log(num1, num2, num3);
console.log(num1, num2, num4);