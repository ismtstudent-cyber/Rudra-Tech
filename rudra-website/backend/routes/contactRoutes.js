const express = require('express');
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public route - create message
router.post('/', contactController.createMessage);

// Protected routes (admin only)
router.get('/', authMiddleware, contactController.getAllMessages);
router.get('/:id', authMiddleware, contactController.getMessage);
router.put('/:id/status', authMiddleware, contactController.updateMessageStatus);
router.delete('/:id', authMiddleware, contactController.deleteMessage);

module.exports = router;
