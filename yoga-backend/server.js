// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

const uri = "mongodb+srv://sampath_vinay:Sampath2003@sandbox.zkoail9.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  batch: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Mock function for simulating payment
const completePayment = async () => {
  // Simulate a payment process (mock function)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Assume payment is successful for the sake of the example
      resolve({ success: true, message: 'Payment successful' });
    }, 1000);
  });
};

app.post('/admission', async (req, res) => {
  try {
    const { name, age, selectedBatch } = req.body;

    if (!name || !age || !selectedBatch) {
      return res.status(400).json({ success: false, message: 'Incomplete data' });
    }

    const newUser = new User({ name, age, batch: selectedBatch });
    await newUser.save();

    // Simulate the payment process
    const paymentResponse = await completePayment();

    // Return the payment response to the front-end
    return res.status(200).json(paymentResponse);
  } catch (error) {
    console.error('Error saving user or processing payment:', error);
    return res.status(500).json({ success: false, message: 'Enrollment failed' });
  }
});

app.get('/api/applicants', async (req, res) => {
  try {
    const applicants = await User.find();
    return res.status(200).json({ success: true, applicants });
  } catch (error) {
    console.error('Error retrieving applicants:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving applicants' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
