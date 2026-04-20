const express = require('express');
const Order = require('../models/order');
const orderRouter = express.Router();

orderRouter.post('/api/orders', async (req, res) => {
    try {
        const { fullName, email, state, city, locality, productName, quantity, productPrice, category, image, buyerId, vendorId } = req.body;
        const order = new Order({ fullName, email, state, city, locality, productName, quantity, productPrice, category, image, buyerId, vendorId, createdAt: Date.now() });
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

module.exports = orderRouter;
