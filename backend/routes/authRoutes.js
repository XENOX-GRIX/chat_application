const express = require('express'); 
const router = express.Router(); 
const authControllers = require('../controllers/auth/authControllers'); 
const Joi = require('joi'); 
const validator  = require('express-joi-validation').createValidator({}); 
const auth = require("../middleware/auth");
const registerSchema = Joi.object({
    username: Joi.string().min(2).max(10).required(),
    mail: Joi.string().email().required(), 
    password: Joi.string().min(8).max(12).required(), 
}); 

const loginSchema = Joi.object({
    mail: Joi.string().email().required(), 
    password: Joi.string().min(8).max(12).required(), 
}); 


router.post('/register',validator.body(registerSchema),  authControllers.controllers.postRegister);

router.post('/login', validator.body(loginSchema),  authControllers.controllers.postLogin);

// Test route
router.get("/test", auth, (req, res) => {
    res.send("request passed");
});

module.exports = router; 
