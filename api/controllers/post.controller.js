import prisma from "../lib/prisma.js";

export const getPosts = async(req, res) => {
    try {
        const posts = await prisma.post.findMany()
        res.status(200).json(posts);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Failed to get posts"});
        
    }
}
export const getPost = async(req, res) => {
    const id=req.params.id;
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
        res.status(200).json(post);
        
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

    console.log("Received body:", JSON.stringify(req.body)); // Better debugging
    const tokenUserId = req.userId;
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