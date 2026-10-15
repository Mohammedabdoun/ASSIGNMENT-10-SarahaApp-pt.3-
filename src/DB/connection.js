import mongoose from "mongoose";


const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/saraha-app')
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Database failed to connect')
    }
}

export default dbConnection;