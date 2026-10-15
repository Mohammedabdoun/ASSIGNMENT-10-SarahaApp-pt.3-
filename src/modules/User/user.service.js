import mongoose from "mongoose";
import { User } from "../../DB/models/user.model.js";
import UserRepository from "../../DB/Repositories/user.repository.js";

const userRepo = new UserRepository();

export const signUp = async (inputs) => {
   const {name, email, password,phone,age} = inputs;
   const EmailExist = await userRepo.findUserByEmail(email);

   if(EmailExist) throw new Error("Email already exists",{cause:{status:409}});

    const user = userRepo.createNewDocument({name, email, password, phone,age});
    return user;
}

export const login = async (inputs) => {
   const {email, password} = inputs;
   const user = userRepo.findOneDocument({email, password}).select("-password");

   if(!user) throw new Error("in-valid login credentials",{cause:{status:409}});
    return user;
}

//3
export const updateUsers = async (inputs, userId) => {
const {name, email,phone,age}=inputs;
if (inputs.email){
    const EmailExist = userRepo.findOneDocument({
        email: 
        inputs.email,
        _id:{$ne: userId}
    });
   if(EmailExist) throw new Error("Email already exists",{cause:{status:409}});
}

const user = userRepo.findOneAndUpdateDocument({_id: userId}, inputs, {new: true}).select("-password");
if(!user) throw new Error("user not found",{cause:{status:409}});

    return user;
}


// 4
export const deleteUser = async (id) => {

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const getUsers = async (id) => {
   const user = userRepo.findDocumentById(id).select("-password");

   if(!user) throw new Error("user not found",{cause:{status:409}});
    return user;
}



