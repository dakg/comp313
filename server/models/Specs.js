const mongoose = require('mongoose');

const specsSchema = mongoose.Schema({
    specsDescription: String,
    specsName: String,
    specsPrice: String,
       
},
{collection: 'specifications'
});

const Specifications = mongoose.model('Specifications', specsSchema);

module.exports=Specifications;