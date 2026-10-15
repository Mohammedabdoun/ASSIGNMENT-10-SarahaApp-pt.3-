import {Router} from "express";
import { deleteUser, getUsers, login, signUp, updateUsers } from "./user.service.js";
import { loginSchema } from "./user.validation.js";
const router = Router();
1//
router.post("/signup",async (req,res)=>{
const result = await signUp(req.body);
res.status(201).json({message : 'User registered successfully',result});
})

2//
router.post("/login",async (req,res)=>{
const validationResult = loginSchema.safeParse(req.body);    
console.log({validationResult});
if(!validationResult.success){throw new Error("validation error", validationResult.error.issues)}
const result = await login(req.body);
res.status(201).json({message : 'User logged-in successfully',result});
})

//3
router.patch("/update/:userId",async (req,res)=>{
const userId= req.params.userId;
const result = await updateUsers(req.body,userId);
res.status(201).json({message : 'User updated successfully',result});
})

//4
router.delete("/delete/:id",async (req,res)=>{
const result = await deleteUser(req.params.id);
res.status(201).json({message : 'User deleted successfully',result})
})

//5
router.get("/get/:id",async(req,res)=>{
const result = await getUsers(req.params.id);
res.status(201).json({message : 'User retrieved successfully',result})
})






export default router;