// two TF (true float)
// operations: + - * /
var hello = 12;

function TF(number) {
    // solution 1
    let numArray = number.toString().split(".");
    let leftSide = parseInt(numArray[0]);
    let rightSide = parseInt(numArray[1]);
    const temp={};
    temp.leftSide=leftSide;
    temp.rightSide=rightSide;
    temp.power=numArray[1].length;
    return temp
}
function addTwo(num1,num2){
const temp={};
temp.leftSide=num1.leftSide+num2.leftSide;
const powerdiff=Math.abs(num1.power-num2.power)
    if(num1.power>num2.power){
        temp.power=num1.power;
        num2.rightSide=num2.rightSide*Math.pow(10,powerdiff);
    }else{
        num1.rightSide=num1.rightSide*Math.pow(10,powerdiff);
        temp.power=num2.power;
    }
    temp.rightSide=num1.rightSide+num2.rightSide;
if(temp.rightSide.toString().length>temp.power){
    console.log(temp)
    temp.rightSide=temp.rightSide.toString().split('');
    temp.leftSide=temp.leftSide+parseInt(temp.rightSide.shift())
    temp.rightSide=parseInt(temp.rightSide);
}
return temp;
}

function addTF(numbers){
    var temp={right:0,left:0,power:0};
    for(let i=0;i<numbers.length;i++){
        temp=addTwo(temp,numbers[i])
    }
}
console.log (addTwo(TF(1.9),TF(1.1)));
