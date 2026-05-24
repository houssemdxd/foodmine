import {Schema,model} from "mongoose";
export interface User{

id:string;
name:string ;
email:string;
password:string;
isAdmin:boolean;
token:string;
address:string;
}
export const UserSchema = new Schema<User>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    token:{type:String},
    address:{type:String}
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
});          
 export const userModel = model<User>('user',UserSchema);