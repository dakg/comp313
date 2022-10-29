const mongoose = require('mongoose');

const quotationSchema = mongoose.Schema({
    quotationNum: String,
    laptopName: String,
    brandName: String,
    modelNumber: String,
    createBy: String,
    specification: Array,
    totalPrice:String,
    createdAt: {
        type: Date,
        default: new Date ()
    }
 }
);
const Quotations = mongoose.model('Quotations', quotationSchema);

module.exports=Quotations;