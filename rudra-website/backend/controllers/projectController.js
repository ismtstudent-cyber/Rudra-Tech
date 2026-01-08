const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get featured projects
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const { title, description, category, technologies, clientName, link, results, featured } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }
    
    const newProject = new Project({
      title,
      description,
      category,
      technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
      clientName,
      link,
      results,
      featured: featured === 'true' || featured === true,
      imageFile: req.file ? req.file.filename : ''
    });
    
    await newProject.save();
    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, category, technologies, clientName, link, results, featured } = req.body;
    
    const updateData = {
      title,
      description,
      category,
      technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
      clientName,
      link,
      results,
      featured: featured === 'true' || featured === true
    };
    
    if (req.file) {
      updateData.imageFile = req.file.filename;
    }
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project updated', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
