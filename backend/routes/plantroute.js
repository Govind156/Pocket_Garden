const express = require('express');
const router = express.Router();
const Plantmodel=require('../models/Plantmodel')
const cloudinary=require('../cloudinary')

router.post('/', async (req, res) => {
    try {

        if (!req.body.imageURL || req.body.imageURL.trim() === "") {
          req.body.imageURL = "https://placehold.co/300x300?text=plant+Image";
        }
        else{
          try{
            const image=req.body.imageURL
            const uploadedimage=await cloudinary.uploader.upload(image,{folder:'Pocket_Garden'})
            req.body.imageURL=uploadedimage.secure_url
          }
          catch(err){
           return res.status(400).json({ message: err.message });  
          }
        }
        const { name, price, categories, availability, stock, description, imageURL, careLevel, waterNeeds, lightNeeds } = req.body;
        
        // Validation
        if (!name || !price || !categories || categories.length ===0 ) {
            return res.status(400).json({ message: 'Name, price,category are required' });
        }
        
        if (price < 0) {
            return res.status(400).json({ message: 'Price cannot be negative' });
        }
        const Plant=new Plantmodel({name,
            price,
            categories,
            availability: availability !== undefined ? availability : true,
            stock: stock || 0,
            description,
            imageURL,
            careLevel,
            waterNeeds,
            lightNeeds})
        const newPlant=await  Plant.save()
         res.status(201).json(newPlant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/',async (req,res)=>{
    try{
       const allplants=await Plantmodel.find();
       res.status(200).json(allplants);
    }
    catch(error){
       res.status(500).json({ message: 'Error fetching plants', error: error.message });
    }
})


router.get('/:id', async (req, res) => {
  try {
    const plant = await Plantmodel.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plant', error: error.message });
  }
});


module.exports=router