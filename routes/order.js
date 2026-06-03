const express = require('express');
const Order = require('../models/order');
const orderRouter = express.Router();

orderRouter.post('/api/orders', async (req, res) => {
    try {
        const { 
            fullName,
            email,
            state,
            city,
            locality,
            productName,
            quantity,
            productPrice,
            category, 
            image, 
            buyerId, 
            vendorId 
        } = req.body;

        const createdAt = Date.now()

        const order = new Order({ fullName, email, state, city, locality, productName, quantity, productPrice, category, image, buyerId, vendorId, createdAt});
        await order.save();
        return res.status(201).send(order);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

orderRouter.get('/api/orders/:buyerId', async (req, res) => {
    try {
        const { buyerId } = req.params;
        const orders = await Order.find({ buyerId });
        if (!orders || orders.length == 0) {
            return res.status(404).json({ msg: "No orders found" });
        }
        return res.status(200).json(orders);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

orderRouter.get('/api/vendor-orders/:vendorId', async (req, res) => {
    try {
        const { vendorId } = req.params;
        const orders = await Order.find({ vendorId });
        if (!orders || orders.length == 0) {
            return res.status(404).json({ msg: "No orders found" });
        }
        return res.status(200).json(orders);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

orderRouter.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { delivered } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { delivered, processing: !delivered },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

orderRouter.delete('/api/delete-order/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        return res.status(200).json({ msg: "Order deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//get route for fetching orders by buyers ID
orderRouter.get('/api/orders/:buyerId',async(req,res)=>{
    try{
        //Extract the buyerid from the request parameters
        const {buyerId} = req.params;
        //Find all orders in the database that match the buyerId
        const orders = await Order.find({buyerId});
        //if no orders are found, return a 404 status with a message
        if(orders.length ==0){
            return res.status(404).json({msg: "No Orders found for this buyer"});
        }
        //if orders are found return then with a 200 status code
        return res.status(200).json(orders);
    } catch (error) {
        //handle any errors that occure during the order retrieval proccess
        res.status(500).json({error:error.message});
    }
});

//delete route 
orderRouter.delete("/api/orders/:id", async(req,res)=>{
    try {
        //extract the id from the req parameter
        const{id} = req.params;
        //find and delete the order from teh databse using the extract _id
        const deletedOrder = await Order.findByIdAndDelete(id);
        if(!deletedOrder){
            return res.status(404).json({msg:"Order not Found"});
        }else{
            return res.status(200).json({msg:"Order was deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

module.exports = orderRouter;
