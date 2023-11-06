const express = require('express');
const router = express.Router();
const Product = require('../dao/models/productModel');

// Ruta para obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query, category, available } = req.query;

        // Construye una consulta para filtrar y ordenar los productos según los parámetros
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (available) {
            filter.stock = { $gt: 0 };
        }
        const sortOrder = sort === 'desc' ? -1 : 1;

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);
        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .sort({ price: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}` : null,
            nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}` : null,
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});
