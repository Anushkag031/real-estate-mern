import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const addMessage = async (req, res) => {
    console.log("getUsers");

  try {
   
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to add messages" });
  }
};