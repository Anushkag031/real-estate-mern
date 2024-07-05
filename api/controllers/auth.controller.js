import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const register = async(req,res) =>{

    const {username,email,password}=req.body;
//console.log(req.body);


    //hash the password
    //create a new user
    //save the user in the database
    //return the user

    

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    //create the user in the database
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword
        }
    
    })
    res.json(newUser);
    console.log(newUser);
     
}
export const login = (req,res) =>{
     
}
export const logout = (req,res) =>{
     
}