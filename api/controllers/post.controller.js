import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getPosts = async(req, res) => {
    const query=req.query;
    console.log("Query:", query);
    try {
        const posts = await prisma.post.findMany({
            where:{
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price:{
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 1000000000,
                }
            }
        })
        //setTimeout(() => {
            res.status(200).json(posts);
       // }, 2000)
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Failed to get posts"});
        
    }
}
export const getPost = async(req, res) => {
    const id=req.params.id;
    console.log("Post ID:", id);
    if(!id) {
        console.log("Missing post ID");
        return res.status(400).json({message: "Missing post ID"});
        
    }
    try {
        const post = await prisma.post.findUnique(
            {
                //these are details of the post being published, show in postman 
                where: {id},
                include:{
                    postDetail: true,
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                }
            }
        )
        let userId = null;
        const token = req.cookies?.token;
        //const token = req.headers.authorization?.split(" ")[1];

        if (token) {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
                userId = payload.id;
            } catch (err) {
                console.error("Token verification failed:", err);
                userId = null;
            }
        }

        //console.log("User ID1:", userId);

        const saved = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    postId: id,
                    userId,
                }
            },
        });

        res.status(200).json({ ...post, isSaved: saved ? true : false });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Failed to get post"});
        
    }
}
export const addPost = async(req, res) => {

    const body=req.body;



    if (!body.postData || !body.postDetail) {
        return res.status(400).json({ message: "Missing post data or post detail" });
    }
    console.log("Received body raw:", req.body);

    console.log("Received body:", JSON.stringify(req.body)); // Better debugging
    const tokenUserId = req.userId;
    console.log("Token user ID:", tokenUserId);
    try {

        const newPost= await prisma.post.create({
            data:{
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail,

                },

            }
        })
        console.log("New post:", newPost);
        res.status(200).json(newPost);
        
    } catch (error) {
        console.error("Failed to add post:", error.message); 
        res.status(500).json({message : "Failed to add posts"});
        
    }
}
export const updatePost = async(req, res) => {
    try {
        res.status(200).json({message: "OK"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Failed to update posts"});
        
    }
}
export const deletePost = async(req, res) => {
    const id=req.params.id;
    const tokenUserId=req.userId
    try {

        //find post and check user id

        const post=await prisma.post.findUnique({
            where:{id}
        })

        if(post.userId !== tokenUserId) {
            res.status(403).json({message:"User not found/not authenticated"});
        }

        await prisma.post.delete({
            where:{id}
        })
        res.status(200).json({message: "Post deleted successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Failed to delete posts"});
        
    }
}

//post details are for get post i.e for user not for all posts in postman