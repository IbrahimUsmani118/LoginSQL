const express = require('express');

const router = express.Router();

// Use a separate controller function for each route
const indexController = (req, res) => {
    res.render('index');
};

const registerController = (req, res) => {
    res.render('register');
};

// Define the routes using the controller functions
router.get('/', indexController);

router.get('/register', registerController);

module.exports = router;