const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("MongoDB connected successfully")
    }
    catch(err){
       console.error('MongoDB connection error:', err.message);
    }
}

mongoose.connection.on('error', err => {
  console.error('MongoDB connection lost:', err);
});

module.exports=connectDB