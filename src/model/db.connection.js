
import mongoose from 'mongoose';


const dbConnection = () =>{
    try {
        const db_url = process.env.DB_URL;
        const connect = mongoose.connect(db_url);
        console.log("Db connected successfully")
    } catch (error) {
        console.log('Erorr occured');
        
    }
};

export default dbConnection;