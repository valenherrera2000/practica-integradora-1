// DELETE api/carts/:cid/products/:pid: Eliminar un producto del carrito
router.delete('/carts/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const cart = await Cart.findByIdAndUpdate(
            cartId,
            { $pull: { products: { product: productId } } },
            { new: true }
        );
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }
});

// PUT api/carts/:cid: Actualizar el carrito con un arreglo de productos
router.put('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const { products } = req.body;
    try {
        const cart = await Cart.findByIdAndUpdate(cartId, { products }, { new: true });
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito.' });
    }
});

// PUT api/carts/:cid/products/:pid: Actualizar la cantidad de ejemplares de un producto en el carrito
router.put('/carts/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        );
        if (!cart) {
            res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito.' });
    }
});

// DELETE api/carts/:cid: Eliminar todos los productos del carrito
router.delete('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await Cart.findByIdAndDelete(cartId);
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito.' });
    }
});
