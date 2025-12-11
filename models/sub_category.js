const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    categoryId:{
        type: String,
        require: true,
    },
    categoryName:{
        type:String,
        required:true,
    },

    image:{
        type: String,
        required: true,
    },

    subCategoryName:{
        type:String,
        required: true,
    }
});

const subCategory =  mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;