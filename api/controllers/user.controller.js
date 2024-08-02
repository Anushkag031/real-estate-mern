import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    console.log("getUsers");

  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get Users" });
  }
};
export const updatedUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId=req.userId;
  const {password,avatar,...inputs}=req.body;


  if(id!==tokenUserId)
  {
    return res.status(403).json({ message: "Unauthorized" });
  }
  let updatedPassword=null;
  try {

    if(password){
      updatedPassword=await bcrypt.hash(password, 10);

    }
    const updatedUser= await prisma.user.update({
      where: {
        id
      },
      data: {
        ...inputs,
        ...(updatedPassword && {password:updatedPassword}),
        ...(avatar && {avatar}),
        
      },
    });

    res.status(200).json(updatedUser);
   // res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Users" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
   const user = await prisma.user.findUnique({
      where: {
        id
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get User" });
  }
};
export const deleteUser = async (req, res) => {


  const id = req.params.id;
  const tokenUserId=req.userId;

  if(id!==tokenUserId)
  {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    await prisma.user.delete({
      where: {
        id
      },
    });
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Users" });
  }
};
