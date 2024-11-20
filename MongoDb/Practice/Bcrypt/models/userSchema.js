import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const userModel = mongoose.model("users",userSchema);

export default userModel;