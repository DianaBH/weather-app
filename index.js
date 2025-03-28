require('dotenv').config({ path: './.env' });
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.WEATHERSTACK_API_KEY;

app.get('/weather', async (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.status(400).json({ error: "Por favor ingresa una ciudad" });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error en la API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Error al obtener el clima" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
