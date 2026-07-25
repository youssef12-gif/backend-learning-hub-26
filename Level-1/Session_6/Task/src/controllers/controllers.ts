import type  { Request , Response } from 'express';
import bcrypt from 'bcryptjs';
import {users} from '../data/data.js'
import type {User} from '../data/data.js'
import   Jwt  from 'jsonwebtoken';

const createToken = (id:Number , role:String) =>{
  const token = Jwt.sign({id , role} , process.env.JWT_SECRET as string , {expiresIn: '1h'});

  return token;
}

export const signup = async (req:Request , res:Response) =>{
    try{
      const {username , email , password , role} = req.body; 

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser:User = {
       id: users.length + 1 , 
       username:username , 
       email:email,
       password: hashedPassword,
       role:role
    }

    users.push(newUser);

    res.status(201).send({
        msg:"UserCreated" ,
        data: newUser
    });
}catch(err){
    console.error(err);
}
}

export const signin = async (req:Request , res:Response) =>{
      const {email , password} = req.body;

      const requiredUser = users.find(usr => usr.email === email);

      if(!requiredUser){
        res.status(404).send("User not found");
      }

      const checkPassword = await bcrypt.compare( password,requiredUser.password);

      if(!checkPassword){
        res.status(401).send("Password is not correct");
      }

     const token = createToken(requiredUser.id , requiredUser.role);

      res.cookie('token' , token , {
        httpOnly:true
      });
    
      res.status(200).send({
        msg:"user logged in successfully" , 
        data: requiredUser , 
        tok: token
      });
}

export const signout = async (req:Request , res:Response) =>{
  console.log("I am in");

    const token = req.cookies.token;

    const requiredToken =await Jwt.verify(token , process.env.JWT_SECRET);

   if(!requiredToken){
     res.status(404).send("user not found");
   }else{
   res.status(200).clearCookie('token').send("User signed out");
   }

}

export const userWelcomePage = (req:Request , res:Response) =>{
    res.status(200).send("Welcome, user , you are authenticated");
}

export const adminWelcomePage = (req:Request , res:Response) =>{
    res.status(200).send("Welcome, admin, you are authenticated");
}


