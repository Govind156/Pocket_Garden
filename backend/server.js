const express =require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv');
const connectDB = require('./config/dbconfig');
const plantroute=require('./routes/plantroute');
const categoriesroute=require('./routes/categoriesroute')

dotenv.config({path:'./config.env' , quiet:true})

const PORT= process.env.PORT || 5000;



connectDB()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/plants',plantroute)
app.use('/api/categories',categoriesroute)


app.listen(PORT,()=>{console.log("server is listening on port 5000")})
