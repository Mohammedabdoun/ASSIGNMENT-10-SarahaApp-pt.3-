import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Receiver ID is required"],
      ref: "User", // References the User model
    },
    // Optional: Include senderId if your app tracks who sent the message
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


export const Message = mongoose.model("Message",messageSchema) 