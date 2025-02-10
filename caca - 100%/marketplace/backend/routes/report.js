const express = require('express');
const router = express.Router();
const { createReport, getReports, resolveReport } = require('../controllers/reportController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// @route   POST api/reports
// @desc    Create a report
// @access  Private
router.post('/', auth, createReport);

// @route   GET api/reports
// @desc    Get all reports
// @access  Private/Admin
router.get('/', [auth, adminAuth], getReports);

// @route   PUT api/reports/resolve/:id
// @desc    Resolve a report
// @access  Private/Admin
router.put('/resolve/:id', [auth, adminAuth], resolveReport);

module.exports = router;
