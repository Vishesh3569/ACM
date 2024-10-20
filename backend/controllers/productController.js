const Product = require('../models/productModel');

const addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  // Check if all fields are provided
  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'Please provide all product details' });
  }

  try {
    // Create a new product and assign the logged-in user as the seller
    const product = new Product({
      name,
      price,
      description,
      category,
      seller: req.user._id, // Automatically assign seller using req.user
      image: req.file.path, 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Function to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to get a single product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const searchProducts = async (req, res) => {
  const { name } = req.query; // Get the search term from query parameters

  if (!name) {
    return res.status(400).json({ message: 'Please provide a product name to search.' });
  }

  try {
    // Use regex for case-insensitive search
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(products); // Return the found products
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  searchProducts
};
