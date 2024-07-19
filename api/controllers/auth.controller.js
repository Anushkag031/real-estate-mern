import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();




export const register = async (req, res) => {
  const { username, email, password } = req.body;
  //console.log(req.body);

  //hash the password
  //create a new user
  //save the user in the database
  //return the user

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "User created successfully" });
    console.log(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  //check if the user exists
  //compare the password
  //if the user exists and the password is correct
  //generate a token
  //return the token
  try {
    const user = await prisma.user.findFirst({
      where: {
        username
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const age=1000*60*60*24*7; // seconds in a week(hour,days,months,years)

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const token= jwt.sign({

        id: user.id,
    },process.env.JWT_SECRET_KEY,
    {
        expiresIn: age
    })
    console.log(token);

    const {password:userPassword,...userInfo}=user


    

    //res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    res.cookie("token", token,{
        httpOnly:true,
        //secure:true,
       // sameSite:"none"
       maxAge:age,
        }).status(200).json(userInfo);
   

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to login" });
  }
};
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
};
