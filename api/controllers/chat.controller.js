import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
    console.log("getchats");

    const tokenUserId = req.userId;
    

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
            hasSome: [tokenUserId],
        }
      },
    });
    res.status(200).json(chats);

    
  } catch (error) {
    res.status(500).json({ message: "Failed to get chats" });
  }
};
export const getChat = async (req, res) => {
    //console.log("getchats");
    const tokenUserId = req.userId;

  try {
    
    const chat= await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
            hasSome: [tokenUserId],
        }
      },
        
      
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chat" });
  }
};
export const addChat = async (req, res) => {

   // console.log("getchats");
   const tokenUserId = req.userId;

  try {
    const newChat= await prisma.chat.create({
      data: {
        userIDs: [tokenUserId,req.body.receiverId],
        //messages: [],
      },
    });
    res.status(200).json(newChat);
    
  } catch (error) {
    res.status(500).json({ message: "Failed to add chat" });
  }
};
export const readChat = async (req, res) => {
    console.log("getchats");

  try {
    
    
  } catch (error) {
    res.status(500).json({ message: "Failed to read chats" });
  }
};