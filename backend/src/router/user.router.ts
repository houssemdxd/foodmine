import { sample_users } from "../data";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { User, userModel, UserSchema } from "../models/User.model";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
const router = Router();   


router.get("/seed", async (req, res) => {
  console.log("🔥 SEED HIT");

  const userCount = await userModel.countDocuments();
  console.log("COUNT =", userCount);

  if (userCount > 0) {
    return res.send("Seed already done");
  }

  await userModel.create(sample_users);

  console.log("DONE");
  res.send("Seed done");
});




router.post("/login",(req,res)=>{
const {email,password} = req.body;
const user = userModel.findOne({email});
if(user){res.send(generateTokenRespone(user))}
else{
    res.status(400).send("User name or password is not valid")
}
;
} );
router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await userModel.findOne({email});
    if(user){
      res.status(400)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false,
        token: ""
    }

    const dbUser = await userModel.create(newUser);
    res.send(generateTokenRespone(dbUser));
  }
))


const generateTokenRespone= (user:any)=>{
const token = jwt.sign({email:user.email ,isAdmin:user.isAdmin},"Spotcha",{expiresIn:"30d"});
    user.token = token;
    return user;
    
};

export const userRouter = router;