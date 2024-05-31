const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../models/property');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Home route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Upload route
router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/upload.html'));
});

router.post('/upload', upload.single('image'), async (req, res) => {
    const newProperty = new Property({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    await newProperty.save();
    res.redirect('/');
});

// Property detail route
router.get('/property/:id', async (req, res) => {
    const property = await Property.findById(req.params.id);
    res.json(property);
});

// Fetch all properties
router.get('/properties', async (req, res) => {
    const properties = await Property.find({});
    res.json(properties);
});

module.exports = router;
