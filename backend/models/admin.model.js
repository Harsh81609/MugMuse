import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    permission:{
        type:[String],
        enum:["manage-users","manage-restaurants"],
        required:true
    }
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;