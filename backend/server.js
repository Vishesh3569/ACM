const express = require('express');
const dotenv = require('dotenv');
// Load environment variables from .env
dotenv.config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middleware/error');
const cors=require('cors');



// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());


// API Routes
app.use('/uploads', express.static('uploads')); // Serve uploaded files

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error middleware
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
