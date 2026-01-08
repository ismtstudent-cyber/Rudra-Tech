const express = require('express');
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer configuration for team member images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/team/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Public routes
router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMember);

// Protected routes (admin only)
router.post('/', authMiddleware, upload.single('image'), teamController.createTeamMember);
router.put('/:id', authMiddleware, upload.single('image'), teamController.updateTeamMember);
router.delete('/:id', authMiddleware, teamController.deleteTeamMember);

module.exports = router;
