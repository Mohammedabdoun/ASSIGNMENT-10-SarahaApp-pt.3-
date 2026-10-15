import mongoose  from "mongoose";



const userSchema = new mongoose.Schema({
firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      // Named unique index configuration
      index: {
        name: "user_email_unique",
        unique: true,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // Setter to manipulate or process password on input
      set: function (val) {
        return val;
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age must be at most 100"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a valid gender",
      },
      default: "male",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property to concatenate full name dynamically
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Schema instance method to retrieve the full name
userSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

export const User = mongoose.model("User",userSchema) 