import jwt from "jsonwebtoken";
export const shouldBeLoggedIn=async(req,res) => {
    //verify that the user is logged in i.e token 
    //token is inside cookies

    console.log("uesr id:",req.userId);

    const token=req.cookies.token

    if(!token) return res.status(401).json({message:"Not authenticated, please try again !"});

   jwt
    .verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid!" });
      }
      console.log(payload);
      res.status(200).json({message:"You are authenticated"});
    }); 
}
export const shouldBeAdmin=async(req,res) => {
    const token=req.cookies.token

    if(!token) return res.status(401).json({message:"Not authenticated, please try again !"});

   jwt
    .verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid !" });
      }
      if(!payload.isAdmin)
        {
            return res.status(403).json({ message: "Not authenticated, please try again !" });
        }
      console.log(payload);
      res.status(200).json({message:"You are authenticated"});
    }); 
}