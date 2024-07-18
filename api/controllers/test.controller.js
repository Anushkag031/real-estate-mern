export const shouldBeLoggedIn=async(req,res) => {
    //verify that the user is logged in i.e token 
    //token is inside cookies

    const token=req.cookies.token

    if(!token) return res.status(401).json({message:"Not authenticated, please try again !"});
}
export const shouldBeAdmin=async(req,res) => {
    
}