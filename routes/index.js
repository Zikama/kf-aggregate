const express = require("express")
const { homeViewRenderer } = require("../controller/homeViewRenderer")
const router = express.Router()

router.get('/', homeViewRenderer)
router.use('dashboard', require('./dashboard/index'))
