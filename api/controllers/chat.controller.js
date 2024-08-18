
import prisma from "../lib/prisma";

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
    console.log("getchats");

  try {
    
    
  } catch (error) {
    res.status(500).json({ message: "Failed to get chat" });
  }
};
export const addChat = async (req, res) => {
    console.log("getchats");

  try {
    
    
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