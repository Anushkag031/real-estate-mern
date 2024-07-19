import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ message: 'Not authenticated, please try again !' });
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
        return res.status(403).json({ message: 'Token is not valid!' });
        }
        req.userId=payload.id;
        //console.log(user);
        next(); // next() is a function that calls the next middleware in the stack. If there is no next middleware, it will call the next route handler.
    });
}