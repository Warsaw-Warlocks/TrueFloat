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
    const length = numArray[1] ? numArray[1].length : 0;
    const power = Math.pow(10, length);

    return {
        leftSide,
        rightSide,
        power,
    }
}

function addTF(num1, num2) {
    let leftSide = num1.leftSide + num2.leftSide;
    let power = num1.power * num2.power;
    let rightSide = num1.rightSide * num2.power + num2.rightSide * num1.power;

    //QUESTION: any better way to do IF below?

    const rss = rightSide.toString();
    const pws = power.toString();
    if (rss.length >= pws.length) {
        let l = rss.length - pws.length + 1;
        leftSide = leftSide + parseInt(rss.slice(0, l));
        rightSide = parseInt(rss.slice(l, rss.length));
    }

    //TODO: remove trailing 0 from rightSide and decres power accordingly

    if (rightSide === 0) power = 10;

    return new TF({
        leftSide,
        rightSide,
        power,
    })
}

function addArrayTF(numArray) {
    return numArray.reduce(function(previousValue, currentValue) {
        return addTF(previousValue, currentValue);
    });
}

function multiplyTF(num1, num2) {
    return addArrayTF([
        new TF(num1.leftSide * num2.leftSide),
        new TF(num1.rightSide / num2.power * num2.leftSide),
        new TF(num1.leftSide * num2.rightSide / num1.power),
        new TF(num1.rightSide / num2.power * num2.rightSide / num1.power),
    ]);
}

let num1 = new TF(1.5);
let num2 = new TF(0.5);

let num3 = new TF(1.5);
let num4 = new TF(1.5);
// let numAdd = addTF(num1, num2);
let numAdd = addArrayTF([num1, num2, num3]);
// let numMul = multiplyTF(num3, num4);
console.log(num1, num2, num3, numAdd);
// console.log(num3, num4, numMul);