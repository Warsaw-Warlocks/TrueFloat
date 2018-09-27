// two TF (true float)
// operations: + - * /
var hello = 12;

class TF {
    constructor(number){
        if(typeof number === 'number'){
            let numArray = number.toString().split(".");
            numArray[0]=numArray[0].split('');
            if(numArray[0][0]==="-"){
                this.sign=-1;
                numArray[0].shift();
            }else{
                this.sign=1;
            }
            this.leftSide = parseInt(numArray[0].join(''));
            if(numArray[1]){
                this.rightSide = parseInt(numArray[1]);
                this.power=numArray[1].length;
            }else{
                this.rightSide=0;
                this.power=0;
            }
        }else if(typeof number === 'object'){
            this.leftSide = number.leftSide;
            this.rightSide= number.rightSide;
            this.power=number.power;
            this.sign=number.sign;
        }else if(typeof number === 'array'){
            this.leftSide = number[0];
            this.rightSide= number[1];
            this.power=number[2];
            this.sign=number[3]
        }
    }

    get countPower(){
        return this.power;
    } 
    get countInt(){
        return this.leftSide.toString().length;
    } 
    get countFloat(){
        return this.rightSide.toString().length;
    } 
    // Do zrobienia
    get getString(){
        return this.leftSide.toString()+'.'+this.rightSide.toString()
    }
    get toFloat(){
        return parseFloat(this.toString)
    }
}


//Wyciągnąc odejmowanie osobno i jesli znaki są rózne to odwracamy operację
function addTwo(num1,num2){
const temp={};
temp.leftSide=num1.leftSide*num1.sign+num2.leftSide*num2.sign;
const powerdiff=Math.abs(num1.power-num2.power)
    if(num1.power>num2.power){
        temp.power=num1.power;
        num2.rightSide=num2.rightSide*Math.pow(10,powerdiff);
    }else{
        num1.rightSide=num1.rightSide*Math.pow(10,powerdiff);
        temp.power=num2.power;
    }
    temp.rightSide=num1.rightSide*num1.sign+num2.rightSide*num2.sign;
if(temp.rightSide.toString().length>temp.power&&temp.rightSide>0){
    temp.rightSide=temp.rightSide.toString().split('');
    temp.leftSide=temp.leftSide+parseInt(temp.rightSide.shift())
    temp.rightSide=parseInt(temp.rightSide);
}

if(temp.rightSide<0&&temp.leftSide>0){
    temp.leftSide=temp.leftSide-1;
    temp.rightSide=1*Math.pow(10,temp.power)+temp.rightSide;
}

temp.sign=1;
if(temp.leftSide<0||temp.rightSide<0){
    temp.sign=-1;
}
return new TF({leftSide: Math.abs(temp.leftSide), rightSide: Math.abs(temp.rightSide), power: temp.power, sign: temp.sign});
}
function multiplyTwoTF(num1,power1, num2, power2){
    let tempValue = num1*num2;
    const tempPower = power1+power2;
    const tempLength = tempValue.toString().length;
    tempValue= tempValue.toString().split('');
    const diff= Math.max(0,tempLength-tempPower);
    const leftSide = diff>0 ? parseInt(tempValue.splice(0,diff).join('')) : 0;
    const rightSide = tempValue.length>0 ? parseInt(tempValue.join('')) : 0;
    return new TF({leftSide,rightSide, power: tempPower})
}

function multiplyTF(num1, num2){
    const temp=[
        multiplyTwoTF(num1.leftSide,0, num2.leftSide, 0),
        multiplyTwoTF(num1.leftSide,0, num2.rightSide, num2.power),
        multiplyTwoTF(num1.rightSide,num1.power, num2.leftSide, 0),
        multiplyTwoTF(num1.rightSide,num1.power, num2.rightSide, num2.power),
    ]
    return  addTF(temp)

}
function addTF(numbers){
    var temp= new TF(0);
    for(let i=0;i<numbers.length;i++){
        temp=addTwo(temp,numbers[i])
    }
    return temp
}
function substractTF(numbers){
    var temp= new TF(0);
    
    for(let i=0;i<numbers.length;i++){
        var temp2=numbers[i];

        if(i!=0){
            temp2.sign=temp2.sign*-1;
        }
        temp=addTwo(temp,temp2)
    }
    return temp
}
const a1 = new TF(-2.3)
const a2 = new TF(-3.2);
console.log(substractTF([a1,a2]))
// const multiply = multiplyTF(a1 , a2);
// console.log(multiply)

