require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/Order');
const FollowUp = require('./models/FollowUp');
const fs = require('fs');
const csv = require('csv-parser');

function parseCSVAndPopulateDB(filePath) {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Transform the object keys from CSV headers to the Mongoose schema keys
        const transformedData = {
            order_id: data['Order ID'],
            customer_id: data['Customer ID'],
            customer_name: data['Customer Name'],
            product_id: data['Product ID'],
            product_name: data['Product Name'],
            quantity: parseInt(data['Quantity'], 10), // Ensure number type
            total_price: parseFloat(data['Total Price']), // Ensure number type
            date: new Date(data['Date']) // Ensure date type
        };
        results.push(transformedData);
      })
      .on('end', () => {
        // Once the entire CSV is read
        Order.collection.drop().then(() => {
            Order.insertMany(results)
            .then(() => {
                console.log('Data has been successfully saved to the database.');
            })
            .catch((error) => {
                console.error('Error saving data to the database:', error);
            });
            });
      });
  }

const app = express();
const cors = require('cors');
// Enable CORS allow from all origins
app.use(cors());

mongoose.connect(process.env.MONGODB_DSN).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

// Endpoint to get orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});
// Endpoint to get follow ups
app.get('/follow-up', async (req, res) => {
    const followups = await FollowUp.find({});
    res.json(followups);
  });

// Endpoint to add to follow-up list
app.post('/follow-up', async (req, res) => {
    try {
        // Assuming the request body will contain the orderId to be followed up
        const { orderId } = req.body;
        
        // check if the order ID exists in the orders collection if needed
        const orderExists = await Order.exists({ "order_id": orderId });
    
        // Check if the order is already in the follow-up list
        const followUpExists = await FollowUp.exists({ "order_id": orderId });

        // If the order doesn't exist, send a 404 response
        if (!orderExists) {
            return res.status(404).json({
                message: 'Order not found.'
            });
        }

        // If the order is already in the follow-up list, send a message
        if (followUpExists) {
            return res.status(409).json({
                message: 'Order is already in the follow-up list.'
            });
        }
        
        // Create a new follow-up order
        const followUpOrder = new FollowUp({
            order_id: orderId
        });
    
        // Save the follow-up order to the database
        await followUpOrder.save();
    
        res.status(201).json({
            message: 'Order added to follow-up list successfully.',
            followUpOrder: followUpOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add order to follow-up list.', error: error });
    }
});

// Endpoint to remove from follow-up list
app.delete('/follow-up/:orderId', async (req, res) => {
    try {
        // Assuming the request body will contain the orderId to be followed up
        const { orderId } = req.params;
        
        // check if the order ID exists in the orders collection if needed
        const orderExists = await Order.exists({ "order_id": orderId });
    
        // Check if the order is already in the follow-up list
        const followUpExists = await FollowUp.exists({ "order_id": orderId });

        // If the order doesn't exist, send a 404 response
        if (!orderExists) {
            return res.status(404).json({
                message: 'Order not found.'
            });
        }

        // If the order is already in the follow-up list, send a message
        if (!followUpExists) {
            return res.status(409).json({
                message: 'Order is not in the follow-up list.'
            });
        }
        
        // Delete the follow-up order
        await FollowUp.deleteOne({ order_id: orderId });
    
        res.status(201).json({
            message: 'Order removed from follow-up list successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove order from follow-up list.', error: error });
    }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Initial Data Load from CSV if INIT_DB is true
if(process.env.INIT_DB === 'true') {
    parseCSVAndPopulateDB('init.csv');
}
