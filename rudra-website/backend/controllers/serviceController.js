const Service = require('../models/Service');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single service
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create service
exports.createService = async (req, res) => {
  try {
    const { title, description, icon, features, order } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }
    
    const newService = new Service({
      title,
      description,
      icon,
      features: features ? features.split('\n').filter(f => f.trim()) : [],
      order: order || 0
    });
    
    await newService.save();
    res.status(201).json({ message: 'Service created', service: newService });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const { title, description, icon, features, order } = req.body;
    
    const updateData = {
      title,
      description,
      icon,
      features: features ? features.split('\n').filter(f => f.trim()) : [],
      order: order || 0
    };
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service updated', service });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
