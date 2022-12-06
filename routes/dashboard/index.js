const express = require("express");
const { ensureAuthenticated } = require("../../configs");
const { dashboard } = require("../../controller/dashboardController");

const router = express.Router();

// Protected route
router.get('/',ensureAuthenticated, dashboard)
