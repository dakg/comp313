const express = require("express");
var ObjectID = require('mongodb').ObjectID; 
const Laptops = require("../../models/Laptops");
const router = express.Router();

router.get("/search", (req, res) => {
  const laptopName = req.query.searchQuery;
  const brandName = req.query.searchQuery;
  const modelNumber = req.query.searchQuery;

  Laptops.find()
    .or([
      { brandName: { $regex: new RegExp(brandName), $options: "i" } },
      {
        laptopName: { $regex: new RegExp(laptopName), $options: "i" },
      },
      {
        modelNumber: { $regex: new RegExp(modelNumber), $options: "i" },
      },
    ])
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Laptop not found ",
      });
      console.log("Laptop not found");
    });
});

router.get("/", async (req, res) => {
  Laptops.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error while retrieving laptops",
      });
    });
});


router.post('/addLaptop', (req,res) => {
const newLaptop = new Laptops(req.body)
Laptops.findOne({laptopName: req.body.laptopName})
.then(async laptop =>{
  if (laptop) {
    return res.status(420).json({
      message: "This Product already exists.",
      data : req.body.laptopName
    });
  } else {
    try{
      await newLaptop.save()
      res.status(201).json({
        status: 'Success',
        data : { newLaptop}
      })
    }catch(err){
      res.status(500).json({
        status:'Failed',
        message: err
      })
    }
  }
});
});

router.post('/editLaptop', async(req,res) => {
  const updateLaptop = req.body;
  console.log(updateLaptop)
  let myquery = { _id : updateLaptop.id}
  console.log(myquery)
  let newInfo = { laptopName:updateLaptop.laptopName, brandName:updateLaptop.brandName,modelNumber:updateLaptop.modelNumber,imageUrl:updateLaptop.imageUrl}
  const options = { "upsert": false };
  Laptops.updateOne(myquery, newInfo, options)
  .then(result => {
    console.log(result);
    console.log("Update Successful")
  })
  .catch(err => console.error(`Failed to upsert document: ${err}`))
})
  

// Delete 
router.post('/deleteProduct', async(req, res) => {
  var id = req.body.id;
  console.log(req.body.id)
  Laptops.findOneAndDelete({ _id : id })
  .then(response =>{
    res.status(201).json({
      status: 'Success',
      response:response
    })
  })
  .catch((response) => {
    res.status(500).json({
      status:'Failed',
      message: response
    })
  }) 
})


module.exports = router;
