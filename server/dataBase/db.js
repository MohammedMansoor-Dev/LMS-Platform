import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected`)
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to connect to DB.'
        })
    }
}

export default connectDB