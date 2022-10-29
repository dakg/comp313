
const express = require("express");

const specsModel = require("../../models/Specs");
const router = express.Router();

    router.get("/", async (req, res) => {
        specsModel.find()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(404).send({
              message: err.message || "Error while retrieving specs",
            });
          });
      });

      router.post('/addSpecs', async(req,res) => {
        const newSpecs = new specsModel(req.body)
        try{
          await newSpecs.save()
          res.status(201).json({
            status: 'Success',
            data : {newSpecs}
          })
        }catch(err){
          res.status(500).json({
            status:'Failed',
            message: err
          })
        }
        })

        router.post('/editSpec', async(req,res) => {
          const updateSpec = req.body;
          console.log(updateSpec)
          let myquery = { _id : updateSpec.id}
          console.log(myquery)
          let newInfo = { specsDescription:updateSpec.specsDescription, specsName:updateSpec.specsName,specsPrice:updateSpec.specsPrice}
          const options = { "upsert": false };
          specsModel.updateOne(myquery, newInfo, options)
          .then(result => {
            console.log(result);
            console.log("Update Successful")
          })
          .catch(err => console.error(`Failed to upsert document: ${err}`))
        })
    
        router.post('/deleteSpecs', async(req, res) => {
          var id = req.body.id;
          console.log(req.body.id)
          specsModel.findOneAndDelete({ _id: id })
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