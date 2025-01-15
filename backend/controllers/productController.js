import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory = '', sizes, bestseller = false } = req.body;

        // Check if required fields are provided
        if (!name || !description || !price || !category || !sizes) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Process images if available
        const images = ['image1', 'image2', 'image3', 'image4']
            .map((key) => req.files[key]?.[0])  // Handle each file if provided
            .filter((item) => item);  // Filter out undefined or null items

        // Upload images if any
        const imagesUrl = images.length > 0 ? await Promise.all(
            images.map(async (item) => {
                try {
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                } catch (err) {
                    console.error('Failed to upload image:', err);
                    return null;
                }
            })
        ).then((urls) => urls.filter((url) => url !== null)) : []; // No images, keep empty array

        // If no images are uploaded, use a default placeholder or leave empty
        const productImages = imagesUrl.length > 0 ? imagesUrl : [];

        // Parse sizes
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
        } catch {
            return res.status(400).json({ success: false, message: 'Invalid sizes format' });
        }

        // Prepare product data
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true', // Ensure it's converted to a boolean
            sizes: parsedSizes,
            image: productImages, // Use images if any were uploaded
            date: Date.now(),
        };

        // Save the product to the database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }
        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'Product Removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to fetch a single product's details
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct };
