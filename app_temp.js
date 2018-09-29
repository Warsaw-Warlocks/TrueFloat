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
    const power = numArray[1] ? numArray[1].length : 0;
    // const power = Math.pow(10, length);

    return {
        leftSide,
        rightSide,
        power,
    }
}

function addTF(num1, num2) {
    let leftSide = num1.leftSide + num2.leftSide;
    let power = (() => {
        let powerDiff;
        if(num1.power < num2.power) {
            powerDiff = num2.power - num1.power;
            num1.rightSide = num1.rightSide * Math.pow(10, powerDiff)
            return num2.power;
        }
        if(num2.power < num1.power) {
            powerDiff = num1.power - num2.power;
            num2.rightSide = num2.rightSide * Math.pow(10, powerDiff)
            return num1.power;
        }
        return num1.power;
    })();
    let rightSide = num1.rightSide + num2.rightSide;
    
    //QUESTION: any better way to do IF below?
    
    const rss = rightSide.toString();
    const pws = power.toString();
    if (rightSide === 0) {
        power = 1;
    } else if (rss.length > power) {
        let l = rss.length - power;
        leftSide = leftSide + parseInt(rss.slice(0, l));
        rightSide = parseInt(rss.slice(l, rss.length));
    }

    // TODO/DONE?: remove trailing 0 from rightSide and decres power accordingly
    // let temp = parseInt(rightSide.toString().split("").reverse().join("")).toString().split("").reverse().join("");
    // let tempLength = rightSide.toString().length - temp.length;
    // rightSide = parseInt(temp);
    // power = power-tempLength;

    // console.log('object after:', leftSide, rightSide, power);
    return new TF({
        leftSide,
        rightSide,
        power,
    })
}

function deductTF(num1, num2) {
    let leftSide = num1.leftSide - num2.leftSide;
    let power = (() => {
        let powerDiff;
        if(num1.power < num2.power) {
            powerDiff = num2.power - num1.power;
            num1.rightSide = num1.rightSide * Math.pow(10, powerDiff)
            return num2.power;
        }
        if(num2.power < num1.power) {
            powerDiff = num1.power - num2.power;
            num2.rightSide = num2.rightSide * Math.pow(10, powerDiff)
            return num1.power;
        }
        return num1.power;
    })();
    let rightSide = num1.rightSide - num2.rightSide;
    
    if(rightSide < 0 && leftSide > 0) {
        leftSide--;
        rightSide = 10+rightSide;
    } else if (leftSide < 0) {
        leftSide *= -1;
        rightSide *= -1
    }

    return new TF({
        leftSide,
        rightSide,
        power,
    })
}

function addArrayTF(numArray) {
    console.log('numArray :', numArray);
    return numArray.reduce(function(previousValue, currentValue) {
        return addTF(previousValue, currentValue);
    });
}

function multiplyTF(num1, num2) {
    return addArrayTF([
        new TF(num1.leftSide * num2.leftSide),
        new TF(num1.rightSide * num2.leftSide / Math.pow(10, num2.power) ),
        new TF(num1.leftSide * num2.rightSide / Math.pow(10, num1.power)),
        new TF(num1.rightSide / Math.pow(10, num2.power) * num2.rightSide / Math.pow(10, num1.power)),
    ]);
}

let num1 = new TF(1.5);
let num2 = new TF(2.06);

let num3 = new TF(1.0005);
let num4 = new TF(1.05);
// let numAdd = addTF(num1, num2);
// let numAdd = addArrayTF([num1, num2, num3]);
// let numMul = multiplyTF(num3, num4);
let numDeduct = deductTF(num1, num2);
// console.log(num1, num2, numAdd);
// console.log(num3, num4, numMul);
console.log(num1, num2, numDeduct);