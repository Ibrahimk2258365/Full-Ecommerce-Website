import mongoose  from "mongoose";

import  colors  from 'colors';
const connectDB = async ()=>{
    try {
       
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`successfully connect with mongodb and host ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`error in monogdb database connection ${error}`.bgRed.white);
    }
}
export default connectDB