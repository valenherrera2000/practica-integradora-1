const express = require('express');
const router = express.Router();
const Product = require('../dao/models/productModel');

// Ruta para obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

// Ruta para crear un nuevo producto
router.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const newProduct = new Product({ title, description, price, thumbnail, code, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear un producto.' });
    }
});

// Ruta para obtener un producto por su ID
router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado.' });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { title, description, price, thumbnail, code, stock });
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado.' });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado.' });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
});

module.exports = router;
