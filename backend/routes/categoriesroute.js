const express=require('express')
const router=express.Router()
const Plantmodel=require('../models/Plantmodel')

router.get('/', async (req, res) => {
    try {
        const categories=await Plantmodel.distinct('categories')
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get category count (how many plants in each category)
router.get('/count', async (req, res) => { 
  try {
    const categories = await Plantmodel.aggregate([
      { $unwind: "$categories" },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } } 
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
});

module.exports=router
