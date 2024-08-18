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
    const {password:userPassword,...rest}=updatedUser // exclude pass

    res.status(200).json(rest);
   // res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Users" });
  }
};
export const getUser = async (req, res) => {
  const id = req.userId;
  console.log("getUser",id);
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

export const savePost = async (req, res) => {


  const postId=req.body.postId;
  const tokenUserId=req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
     where: {
        
        userId_postId:{
          postId,
          userId:tokenUserId,
          
        }
        
      },
    });

    if(savedPost)
    {
      await prisma.savedPost.delete({
        where: {
          id:savedPost.id
        },
      });
      return res.status(200).json({ message: "Post removed from saved list " });
    }
    else{
      await prisma.savedPost.create({
        data: {
          userId:tokenUserId,
          postId,
        },
      });
      return res.status(200).json({ message: "Post saved successfully" });
    }
   
    //res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save posts" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  console.log("Token user ID1:", tokenUserId);
  try {
    const userPosts= await prisma.post.findMany({
      where: {
        userId:tokenUserId
      },
    });
    if (!userPosts) {
      return res.status(404).json({ error: "No posts found" });
  }
    //res.status(200).json(userPosts);

    const saved= await prisma.savedPost.findMany({
      where: {
        userId:tokenUserId
      },
      include:{
        post:true
      }
    });

    const savedPosts=saved.map((item) => item.post);
    
    console.log("userPosts",userPosts || 0);
    
    console.log("savedPosts",savedPosts || 0);
    res.status(200).json({userPosts,savedPosts});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get ProfilePosts" });
  }
};