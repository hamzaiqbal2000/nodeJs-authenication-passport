const express = require('express')
const { registerView, loginView, registerUser, loginUser } = require('../controllers/loginControllers')
const router = express.Router()
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");


router.get('/register', registerView)
router.get('/login', loginView)
//dashboard
router.get("/dashboard", protectRoute, dashboardView);

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
