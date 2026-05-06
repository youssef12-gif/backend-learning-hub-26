/*
This is a program helps Khaled to arrive the Pizza to me(Ahmed).
The program includes printing information about the Pizza 
And me. Also includes the calculation of tips and total pills.
Note: I have made comment lines with numbers representing each task.
 */



//=========================1=========================
let studentName = "Ahmed";
const pizaFlavor = "pepperoni";
//=========================1=========================


//=========================2=========================
let hungerLevel = 10;
let isPizzaHot = true;
let deliveryAddress = "Khusus-Qaliobia";

console.log("hungerLevel data type: " , typeof hungerLevel);
console.log("===============================================");
console.log("isPizzaHot data type: " , typeof isPizzaHot);
console.log("===============================================");
console.log("deliveryAddress data type: " , typeof deliveryAddress);
console.log("===============================================");


//=========================2=========================


//=========================3=========================
let orderTotal = "85";
const tip = 15;

console.log("Order total after tips: " + (Number(orderTotal) + tip + Number(true)) + '$');
console.log("===============================================");


//=========================3=========================



//=========================4=========================
const pizzaCost = 90;

const totalBill = pizzaCost + tip;

let minutesWaiting = 45 + 15;

const evenOddMessage = !(minutesWaiting % 2)? "even" : "odd";


console.log(`minutesWaiting value is: ${minutesWaiting} minutes, and it is: ${evenOddMessage}`);
console.log("===============================================");

//=========================4=========================

//=========================5=========================
   let precedence;

   precedence = 2 + 3 * 4 -1;

console.log(`The value of 2 + 3 * 4 -1 is: ${precedence}`);
console.log("===============================================");


   precedence = (2 + 3) * (4 - 1);

console.log(`The value of (2 + 3) * (4 - 1) is: ${precedence}`);
console.log("===============================================");

//=========================5=========================

//=========================6=========================
  let msg;

 if(isPizzaHot){
   if(hungerLevel > 7){
      msg = "OPEN THE DOOR AND SPRINT";
   }else if(hungerLevel > 4){
       msg = "Walk, you have dignity";
   }else{
       msg = "Order sushi next time";
   }

console.log(`Pizza is hot and hunger level is ${hungerLevel}, so ${msg}`);
console.log("===============================================");

 }
//=========================6=========================


//=========================7=========================

//hungerLevel > 5 is an expression which gives a true or false as a value forexample:
console.log("Is hungerLevel value greater than 5? " , hungerLevel > 5);
console.log("===============================================");


/*if (hungerLevel > 5) { ... } is a statement which gives permission to
   execute the code inside. If false , it will skip it, forexample: 
*/


if(hungerLevel > 5){//prints Hurry and skip You have time
   msg = "Hurry";
}else{
   msg = "You have time";
}

console.log(`Hunger level is ${hungerLevel}, so ${msg}`);
console.log("===============================================");


//=========================7=========================

//=========================8=========================

console.log("Pizza flavor is: " , pizaFlavor.toUpperCase());
console.log("Pizza falvor length: " ,pizaFlavor.length);
console.log("Does pizza include substring pepper in the original word: pepperoni? " , pizaFlavor.includes("pepper"));
console.log("===============================================");

//=========================8=========================

//=========================9=========================
console.log(`Customer details: Student name: ${studentName}`);
console.log(`His pizza flavor: ${pizaFlavor}`);
console.log(`Total pill: ${totalBill}$`);
console.log(`Minutes waiting: ${minutesWaiting} minutes`);
            
console.log("===============================================");
//=========================9=========================


//=========================10=========================
const toppings = [ "sausage", "mushrooms", "onions" ];

const delivered = {
   customer: studentName , 
   falvor: pizaFlavor , 
   isDelivered: false
};

console.log("Pizza is arrived");

delivered.isDelivered = true;

console.log("===============================================");

//=========================10=========================

//=========================11=========================
//calculate total function adds the price and tip and return the total amount
function calculateTotal(price , tip){
   return price + tip;
};


const calculate_Total = (price , tip)=> {
   return price + tip;
};

console.log('calculateTotal function result: ' , calculateTotal(pizzaCost , tip));

console.log('calculate_Total function result: ' , calculate_Total(pizzaCost , tip));
console.log("===============================================");

//=========================11=========================

//=========================12=========================
 const stops = ["Ahmed", "Sara", "Mona", "Tarek"];

 for(let i = 0 ; i < stops.length ; i++){

   if(stops[i] === "Ahmed"){
      console.log("Hit Ahmed");
      console.log("===============================================");
      break;
   }
 }
//=========================12=========================