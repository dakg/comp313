const mongoose = require('mongoose');

const laptopSchema = mongoose.Schema({
    laptopName: String,
    brandName: String,
    modelNumber: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: new Date ()
    }
},
    {collection: 'laptops'
});
const Laptops = mongoose.model('Laptops', laptopSchema);

module.exports=Laptops;