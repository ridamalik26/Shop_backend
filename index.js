//import the express module
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');
const vendorRouter = require('./routes/vendors');
const orderRouter = require('./routes/order');
const cors = require('cors');

// const PORT = process.env.PORT || 2001;
const PORT = 2001;

const DB = process.env.MONGO_URI;

const app = express();
//middleware - to register routes or to mount routes

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);
app.use(vendorRouter);
app.use('/', orderRouter);

mongoose.connect(DB).then(()=>{
    console.log('Mongodb Connected');
});

//start the server and listen on the specified port
app.listen(PORT,"0.0.0.0", function(){
    //Log the number
    console.log(`Server is running on port ${PORT}`);
});
