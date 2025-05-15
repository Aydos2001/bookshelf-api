import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    userName  : {type  :String, required : true},
    password : {type : String, required : true},
}, {timestamps : true})

export const userModel = model("User", UserSchema)