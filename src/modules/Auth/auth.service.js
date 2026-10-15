import mongoose from "mongoose";
import { User } from "../../DB/models/user.model.js";
import { encrypt } from "../../Utils/security/encryption.security.js";
import { hash, compareTwoHashes } from "../../Utils/security/hash.security.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
const userRepo = new UserRepository();

export const signUp = async (inputs) => {
   const {name, email, password,phone,age} = inputs;
   const EmailExist = userRepo.findUserByEmail({email});

   if(EmailExist) throw new Error("Email already exists",{cause:{status:409}});

   let encryptedphone;
   if(phone) encryptedphone = encrypt(phone);
   console.log(encryptedphone);


   const hashedPassword =await hash(password);
    const user = userRepo.createNewDocument({name, email, password: hashedPassword, phone: encryptedphone || undefined,age});
    return user;
}

export const login = async (inputs) => {
   const {email, password} = inputs;
   const user = userRepo.findOneDocument({email});
   if(!user) throw new Error("in-valid login credentials",{cause:{status:409}});

   const isPassworsMatched = await compareTwoHashes(user.password, password);
   if(!isPassworsMatched) throw new Error("in-valid login credentials",{cause:{status:409}});
    return user;
}