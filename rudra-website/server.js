require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✓ MongoDB connected successfully'))
.catch(err => console.error('✗ MongoDB connection error:', err));

// Initialize Admin User (if not exists)
const Admin = require('./backend/models/Admin');

async function initializeAdmin() {
  try {
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (!adminExists) {
      const admin = new Admin({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        email: 'admin@rudra.tech',
        fullName: 'Admin'
      });
      await admin.save();
      console.log('✓ Default admin created (username: admin, password: Admin@123456)');
    }
  } catch (error) {
    console.error('Error initializing admin:', error.message);
  }
}

initializeAdmin();

// Routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/team', require('./backend/routes/teamRoutes'));
app.use('/api/projects', require('./backend/routes/projectRoutes'));
app.use('/api/services', require('./backend/routes/serviceRoutes'));
app.use('/api/contact', require('./backend/routes/contactRoutes'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'admin-dashboard.html'));
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  const allowedPages = ['about', 'services', 'portfolio', 'team', 'contact'];
  
  if (allowedPages.includes(page)) {
    res.sendFile(path.join(__dirname, 'frontend', `${page}.html`));
  } else {
    res.status(404).sendFile(path.join(__dirname, 'frontend', '404.html'));
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    status: err.status || 500
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     RUDRA INNOVATION & MEDIA TECH VENTURES            ║
║              Server Running Successfully              ║
╠════════════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                       ║
║  Admin Panel: http://localhost:${PORT}/admin             ║
║  API Health: http://localhost:${PORT}/api/health         ║
║  MongoDB: ${process.env.MONGODB_URI}      ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
