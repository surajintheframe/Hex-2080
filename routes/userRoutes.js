const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/register',authController.register)

router.post('/login',authController.login)


//router.use(authController.protect)

// router.get('/d',authController.login,authController.protect)


module.exports = router;