import { Request , Response , NextFunction} from "express"

export const validateMicrobus = (request:Request , response:Response , next:NextFunction) => {
   const body = request.body;
   const ID = Number(body.id);
   const farePerSeat = Number(body.farePerSeat);
   const seatsAvailable = Number(body.seatsAvailable);
   const ratings = JSON.parse(body.ratings);//I am not sure about this line but postman does not work so I cannot check this line

   if(!body || !ID || !farePerSeat || !seatsAvailable || !ratings){
      return response.status(400).send("Validation error because there is data misssing");
   }

   
   if(ID < 0 || farePerSeat < 0 || seatsAvailable < 0){
     return response.status(400).send("validation error because there is negative number");
   }

   ratings.array.forEach((reviewer:number) => {
      if(reviewer < 0){
         return response.status(400).send("validation error because there is negative number");
      }
   });

   next();
}