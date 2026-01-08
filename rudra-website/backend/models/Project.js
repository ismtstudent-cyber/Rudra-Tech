const mongoose = require('mongoose');

// Portfolio Project Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Web Development', 'Mobile App', 'Digital Marketing', 'AI & ML', 'Cloud Solutions'],
    default: 'Web Development'
  },
  imageFile: {
    type: String,
    default: ''
  },
  technologies: [String],
  clientName: String,
  link: String,
  results: String,
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
