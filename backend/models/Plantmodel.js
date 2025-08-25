const mongoose=require('mongoose')
const plantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Plant name is required'],
        trim:true,
        maxLength:[100,'Plant name cannot exceed 100 characters']
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        min:[0,'Price cannot be negative']
    },
    categories:[{
         type:String,
        required:[true,'At least one category is required'],
        enum: ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Low Maintenance', 'Flowering', 'Foliage', 'Herb', 'Cactus'],
     }],
    availability:{
        type:Boolean,
        default:true
    },
    stock:{
        type:Number,
        default:0,
        min:[0,'Stock cannot be negative']
    },
    description:{
        type:String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    imageURL:{
        type:String,
    },
    careLevel:{
        type:String,
        enum: ['Easy', 'Medium', 'Hard'],
        default:'Medium'
    },
    waterNeeds:{
        type:String,
        enum:['Low', 'Moderate', 'High'],
        default:'Moderate'
    },
    lightNeeds:{
        type:String,
        enum: ['Low Light', 'Indirect Light', 'Bright Light', 'Direct Sunlight'],
        default: 'Indirect Light'
    }
},{timestamps:true})

const plantmodel=mongoose.model('Plants',plantSchema)
module.exports=plantmodel