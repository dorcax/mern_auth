import mongoose from "mongoose"

const connectDb =async()=>{
    try {
        const connect =await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("mongoDb connected")
    } catch (error) {
        console.log(`Error data connection failed:${error.message}`)
        process.exit(1)
    }
}

export default connectDb