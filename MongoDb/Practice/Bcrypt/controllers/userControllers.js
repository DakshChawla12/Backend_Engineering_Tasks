import User from '../models/userSchema.js';

const getProfile = async(req,res) => {
    try {
        const {username} = req.user;
        const user = User.findOne({username});
        if(!user) {
            return res.json({success:false , message:"invalid username"});
        }
        res.json({success:true,userName:user.username});
    } catch (error) {
        return res.json({success:false , message:"internal server error"});
    }
}

export {getProfile};