const express = require('express');
const router = express.Router();
const Message = require('../dao/models/messageModel');

// Ruta para obtener todos los mensajes
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensajes.' });
    }
});

// Ruta para crear un nuevo mensaje
router.post('/messages', async (req, res) => {
    const { user, message } = req.body;
    try {
        const newMessage = new Message({ user, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear un mensaje.' });
    }
});

module.exports = router;
