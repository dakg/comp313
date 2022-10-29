
const express = require("express");
const Quotations = require("../../models/Quotations");
const router = express.Router();

router.get('/customization', async(req,res) => {
  Quotations.findOne().sort({'_id':-1}).limit(1)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(404).send({
              message: err.message || "Error while retrieving quote",
            });
          });
  })

router.post('/customization', async(req,res) => {
  const newQuote = new Quotations(req.body)
  try{
    await newQuote.save()
    res.status(201).json({
      status: 'Success',
      data : { newQuote}
    })
  }catch(err){
    res.status(500).json({
      status:'Failed',
      message: err
    })
  }
  })

module.exports = router;