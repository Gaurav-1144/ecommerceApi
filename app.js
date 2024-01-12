const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const product = require('./models/product'); // Import your Mongoose model

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://gauravnagarkoti121:OFfBGYALYGoDCc5j@test-pro.y7lejct.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:');
});

// Create a new product
// Create
app.post('/products/create', async (req, res) => {
    try {
        const result = await product.create(req.body);
        const resultData = {
            data: {
                product: {
                name: result.name,
                quantity: result.quantity
                }
                }
           
          };
        res.json(resultData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Todos
app.get('/products/details', async (req, res) => {
    try {
        const result = await product.find();
        res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
});
// Update a Todo by ID
app.put('/products/:id', async (req, res) => {
    console.log(req.body);
    try {
        const output = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const resultData = {
            data: {
                product: {
                id: output._id,
                name: output.name,
                quantity: output.quantity
                },
                message: "updated successfully"
                }
           
          };
        res.json(resultData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete a Todo by ID
app.delete('/products/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        const todo = await product.findOneAndDelete(req.params.id);
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Define your MongoDB schema and model here using Mongoose

// Define your REST API routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
