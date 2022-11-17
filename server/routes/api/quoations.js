
const express = require("express");
const Quotations = require("../../models/Quotations");
const router = express.Router();

router.get('/customization', async (req, res) => {
  Quotations.findOne().sort({ '_id': -1 }).limit(1)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error while retrieving quote",
      });
    });
})

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

  router.get('/quotation-history', async(req,res) => {
  Quotations.find().sort({'_id':-1})
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(404).send({
              message: err.message || "Error while retrieving quote history",
            });
          });
  })


router.post('/customization', async(req,res) => {
  const newQuote = new Quotations(req.body)
  try {
    await newQuote.save()
    res.status(201).json({
      status: 'Success',
      data: { newQuote }
    })
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})


router.post('/addQuotation', (req, res, next) => {
  let quotation = new Quotations(req.body);
  quotation.save().then(()=>{
    res.status(201).json({
      status:"Success",
      data : {quotation}
    }).catch(err=>{
      res.status(500).json({
        status: 'Failed',
        message: err
      })
    })
  })

})

module.exports = router;