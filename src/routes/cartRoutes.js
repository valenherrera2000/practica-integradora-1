const express = require('express');
const router = express.Router();
const Cart = require('../dao/models/cartModel');

// Ruta para obtener todos los carritos
router.get('/carts', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener carritos.' });
    }
});

// Ruta para crear un nuevo carrito
router.post('/carts', async (req, res) => {
    const { products } = req.body;
    try {
        const newCart = new Cart({ products });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear un carrito.' });
    }
});

module.exports = router;
