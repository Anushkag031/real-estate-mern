import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const addMessage = async (req, res) => {
   // console.log("getUsers");
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text=req.body.text;

  try {
   //if this chat belongs to us or not
    const chat = await prisma.chat.findUnique({
     where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
     }, 
    });
    if(!chat){
      return res.status(404).json({ message: "chat not found || Unauthorized" });
    }

    //then create message
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId:tokenUserId,
      },
    });
    //seenby array
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy:  [tokenUserId],
        lastMessage:text,
        
      },
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to add messages" });
  }
};