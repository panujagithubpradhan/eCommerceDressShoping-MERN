import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const authUser = async(req , res , next) => {
    const {token} = req.headers;

    if (!token) {
        return res.json({success:false , message : "Not Authorized login Again"});
    }

    try {
        const token_decode = jwt.verify(token , process.env.JWT_SECRETE);
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false , message : error.message})
    }
}

export default authUser;