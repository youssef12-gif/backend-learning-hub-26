
//===========================1=============================
function cookRice():void{
     let totalTime:number = 0;
     for(let i = 0 ; i < 1000000000 ; i++){
       totalTime++;
     }
     // console.log("Why");
}

function cookRiceAsync():void{
     let totalTime:number = 0;
     setTimeout(() => {
          console.log("entered the timer");
     }, 1000);
}

// console.log("Rice Starting....");
// cookRice();
// console.log("Rice done!");
// cookRiceAsync();
// console.log("Am Farouk yels at next customer");

//===========================2=============================

function orderRice(callback: (message:string)=>void){
   console.log("Calling the rice supplier...");

   setTimeout(() => {
     callback("Rice deliverd");
   } , 1000)
}

// orderRice((message) => {
//      console.log(message);
// });
// console.log("Am Farouk keeps serving customers while waiting");


//===========================3=============================

// const koshariOrder:Promise<string> = new Promise((resolve , reject) => {
//      setTimeout(() => {
//          resolve("Order ready! 🍝")
//      } , 2000)
// });

// koshariOrder
// .then(data => console.log(data))
// .catch(err => console.error(err));

// const sauceOrder:Promise<string> = new Promise((resolve , reject) => {
//      reject("We're out of da2a!");
// });

// sauceOrder.catch(err => console.error(err));

//===========================4=============================

function getRice():Promise<string>{
    return new Promise((resolve) => {
       resolve("Rice ready");
    })
}

function getChickpeas(rice:string):Promise<string>{
     return new Promise((resolve) => {
       resolve("Chickpeas ready, rice was: " + rice);
    })
}


function getSauce(chickpeas:string):Promise<string>{
     return new Promise((resolve) => {
       resolve("Sauce added, previous: " + chickpeas);
    })
}



// getRice()
// .then((rice:string) => {
//      return getChickpeas(rice);
// })
// .then((chickpeas:string) => {
//      return getSauce(chickpeas);
// })
// .then(data => console.log(data))
// .catch(err => console.error(err));

//===========================5=============================
async function makeKoshari(){
  try{
       const riceMsg = await getRice();

       const chikpeasMsg = await getChickpeas(riceMsg);

       const sauceMsg = await getSauce(chikpeasMsg);

       console.log(sauceMsg);
  }catch(err){
     console.error(err);
  }
}

// makeKoshari();