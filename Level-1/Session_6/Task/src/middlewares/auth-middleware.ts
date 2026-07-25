import type  { NextFunction, Request , Response } from 'express';
import   Jwt  from 'jsonwebtoken';


export const validateToken = (req:Request , res:Response , next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        res.status(401).send('There is no token');
    }

    next();
}

export const validateAdminOnly = async(req:Request , res:Response , next:NextFunction)=>{
    
     const token = req.cookies.token;

    const requiredToken =await Jwt.verify(token , process.env.JWT_SECRET)as {id:number , role:string};

    console.log(requiredToken);

    const role = requiredToken.role;

    console.log(role);

    if(role !== 'admin'){
        res.status(403).send("You are not allowed to access this page");
    }

    next();
}