const express = require('express');
const router = express.Router();
const { createStore, getStores, getApprovedStores, getPendingStores, approveStore, suspendStore, deleteStore, hasStore } = require('../controllers/storeController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// @route   POST api/stores
// @desc    Create a store
// @access  Private
router.post('/', auth, createStore);

// @route   GET api/stores
// @desc    Get all stores
// @access  Public
router.get('/', getStores);

// @route   GET api/stores/approved
// @desc    Get all approved stores
// @access  Public
router.get('/approved', getApprovedStores);

// @route   GET api/stores/pending
// @desc    Get all pending stores
// @access  Private/Admin
router.get('/pending', [auth, adminAuth], getPendingStores);

// @route   PUT api/stores/approve/:id
// @desc    Approve a store
// @access  Private/Admin
router.put('/approve/:id', [auth, adminAuth], approveStore);

// @route   PUT api/stores/suspend/:id
// @desc    Suspend a store
// @access  Private/Admin
router.put('/suspend/:id', [auth, adminAuth], suspendStore);

// @route   DELETE api/stores/:id
// @desc    Delete a store
// @access  Private/Admin
router.delete('/:id', [auth, adminAuth], deleteStore);

// @route   GET api/stores/hasStore
// @desc    Check if user has a store
// @access  Private
router.get('/hasStore', auth, hasStore);

module.exports = router;