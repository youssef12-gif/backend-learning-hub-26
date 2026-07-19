import { Request , Response } from "express";
import {fleet , Microbus} from '../Data/microbus-data'

 export const getAllMicroBuses = (req:Request , res:Response) => {
     res.status(200).send(fleet);
}

 export const getMicroBusByID = (req:Request , res:Response) => {

    const ID = Number(req.params.id);
    const microbus = fleet.find(mic => {
        if(mic.id === ID){
            return mic
        }
    });
    if(microbus){
       res.status(200).send(microbus);
    }else{
        res.status(404).send("Am Ashraf doesn't run that one");
    }
     
}

export const createNewMicroBus =  (req:Request , res:Response) => {
    const newID = fleet.length+1;
    const newMicrobus:Microbus = {
      id: newID , 
      driveName : `Driver ${newID}` , 
      route: `place -> another place` , 
      farePerSeat: 20 , 
      seatsAvailable: 5 , 
      ratings: [
        {
            'Passenger1' : 4
        } , 
        {
            'Passenger2' : 3
        }
      ]

    }

      fleet.push(newMicrobus);
      res.status(201).send({
        msg: "Created" , 
        data: newMicrobus
      })
}

export const updateMicrobus =(req:Request , res:Response) => {
    const ID:number = Number(req.params.id);
    const body = JSON.parse(req.body);
    let microbus = fleet.find(mic => {
        if(mic.id === ID){
            return mic
        }
    });
    if(microbus){
       microbus = {id: ID , ...body}
       res.status(200).send(microbus);
    }else{
        res.status(404).send("Am Ashraf doesn't run that one");
    }
}

export const deleteMicroBus = (req:Request , res:Response) => {
    const ID = Number(req.params.id);
    const microbus = fleet.find(mic => {
        if(mic.id === ID){
           const deletedMicrobus:Microbus = mic;
            fleet.splice(ID-1 , 1);
            return deletedMicrobus;
        }
    });
    if(microbus){
       res.status(200).send({
        msg: "deleted successfully" , 
        data: microbus
       });
    }else{
        res.status(404).send("not found");
    }
}

export const filterByMaxFare =  (req:Request , res:Response) => {
    console.log("Entered");
    const maxFare:number = Number(req.query.maxFare);

    console.log(maxFare);

    if(!maxFare){
        res.status(400).send("There is no max fare");
    }else{
        const validMicroBuses = fleet.filter(mic => mic.farePerSeat <= maxFare);

        if(validMicroBuses){
            res.status(200).send(validMicroBuses);
        }else{
            res.status(404).send("not found");
        }
    }
}

export const getRates = (req:Request , res:Response) => {
    const ID:number = Number(req.params.id);
    const rater:string = String(req.query.rater);

    const requiredMicrobus = fleet.find(mic => mic.id === ID);

    if(requiredMicrobus){
        const requiredRater = requiredMicrobus.ratings.find(rt => rater in rt);

        if(requiredRater){
            res.status(200).send({
                msg: "Found" , 
                data: {id: ID , requiredRater}
            });
        }else{
            res.status(404).send("Rater is not found");
        }
    }else{
        res.status(404).send("microbus is not found");
    }
}