const TeamMember = require('../models/TeamMember');

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single team member
exports.getTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create team member
exports.createTeamMember = async (req, res) => {
  try {
    const { name, designation, bio, email, socialLinks } = req.body;
    
    if (!name || !designation) {
      return res.status(400).json({ message: 'Name and designation required' });
    }
    
    const newMember = new TeamMember({
      name,
      designation,
      bio,
      email,
      socialLinks,
      imageFile: req.file ? req.file.filename : ''
    });
    
    await newMember.save();
    res.status(201).json({ message: 'Team member created', member: newMember });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, designation, bio, email, socialLinks } = req.body;
    
    const updateData = { name, designation, bio, email, socialLinks };
    if (req.file) {
      updateData.imageFile = req.file.filename;
    }
    
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json({ message: 'Team member updated', member });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
