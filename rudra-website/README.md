# Rudra Innovation & Media Tech Ventures - Professional Website

A fully functional, production-ready corporate website for Rudra Innovation & Media Tech Ventures with advanced features including responsive design, three UI modes, dynamic content management, and a secure admin panel.

## 🌟 Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Three UI Modes: Light, Dark, and Glow
- ✅ Smooth animations and transitions
- ✅ Scroll reveal effects
- ✅ Dynamic content from database
- ✅ Professional green-themed branding
- ✅ SEO-optimized HTML structure
- ✅ Form validation and error handling

### Pages
- 🏠 **Home** - Hero section with CTA buttons and feature highlights
- ℹ️ **About Us** - Company mission, vision, values, and history
- 🚀 **Services** - Service catalog with detailed descriptions
- 🎨 **Portfolio** - Project showcase with case studies
- 👥 **Team** - Team members with social links and bios
- 📞 **Contact** - Contact form and business information
- 🔐 **Admin** - Secure admin panel for content management
- ❌ **404** - Custom error page

### Admin Panel Features
- 🔐 Secure authentication with JWT
- 👥 Manage team members (CRUD)
- ⚙️ Manage services (CRUD)
- 🎨 Manage portfolio projects (CRUD)
- 💬 View and manage contact messages
- 📊 Dashboard with statistics
- 🎨 Three UI modes in admin panel
- 📁 Image upload and management

### Backend Features
- Node.js + Express.js server
- MongoDB database
- RESTful API
- JWT authentication
- File upload handling
- CORS support
- Environment configuration

## 📋 Tech Stack

### Frontend
- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6+)
- No external dependencies

### Backend
- Node.js (runtime)
- Express.js (web framework)
- MongoDB (database)
- Mongoose (ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- multer (file upload)
- dotenv (environment variables)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone/Download the project**
   ```bash
   cd rudra-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rudra_website
   JWT_SECRET=your_secret_key_here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=Admin@123456
   ```

4. **Create required directories**
   ```bash
   mkdir -p public/uploads/team
   mkdir -p public/uploads/projects
   ```

5. **Start MongoDB**
   ```bash
   mongod
   ```

6. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

7. **Access the website**
   - Website: `http://localhost:5000`
   - Admin Panel: `http://localhost:5000/admin`

## 🔐 Default Admin Credentials

- **Username:** admin
- **Password:** Admin@123456

**⚠️ IMPORTANT: Change these credentials in production!**

## 📁 Project Structure

```
rudra-website/
├── backend/
│   ├── config/              # Configuration files
│   ├── models/              # MongoDB schemas
│   │   ├── Admin.js
│   │   ├── TeamMember.js
│   │   ├── Project.js
│   │   ├── Service.js
│   │   └── Contact.js
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── teamController.js
│   │   ├── projectController.js
│   │   ├── serviceController.js
│   │   └── contactController.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── teamRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── contactRoutes.js
│   └── middleware/          # Custom middleware
│       └── authMiddleware.js
├── frontend/
│   ├── css/
│   │   ├── styles.css       # Main stylesheet (all 3 modes)
│   │   └── components.css   # Component styles
│   ├── js/
│   │   ├── main.js          # Main JavaScript
│   │   └── admin.js         # Admin panel script
│   ├── pages/               # Page files (optional)
│   ├── index.html           # Home page
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── team.html
│   ├── contact.html
│   ├── admin.html           # Admin login
│   ├── admin-dashboard.html # Admin panel
│   └── 404.html
├── public/
│   ├── images/              # Logo and static images
│   └── uploads/             # Dynamic uploads
│       ├── team/
│       └── projects/
├── server.js                # Main server file
├── package.json
├── .env                     # Environment variables
├── .gitignore
└── README.md
```

## 🎨 UI Modes Explained

### Light Mode (Default)
- Clean, corporate appearance
- White/light green backgrounds
- Dark green text
- Professional and minimal
- Soft shadows

### Dark Mode
- Dark backgrounds (#0d1b0f)
- Light green text (#66BB6A)
- Dark green accents
- Smooth transitions
- Reduced eye strain

### Glow Mode (Premium)
- Deep dark background
- Neon green glowing elements
- Futuristic appearance
- Animated glow effects
- Enhanced hover states
- Tech-inspired aesthetics

Mode preference is saved to localStorage and persists across sessions.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (protected)

### Team Members
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get single team member
- `POST /api/team` - Create team member (admin only)
- `PUT /api/team/:id` - Update team member (admin only)
- `DELETE /api/team/:id` - Delete team member (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Contact Messages
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all messages (admin only)
- `GET /api/contact/:id` - Get single message (admin only)
- `PUT /api/contact/:id/status` - Update message status (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## 🎯 Key Components

### ModeSwitcher Class
Manages UI theme switching with localStorage persistence.

### ScrollReveal Class
Implements scroll-triggered animations using IntersectionObserver.

### FormHandler Class
Handles form submissions with validation and API integration.

### DataLoader Class
Asynchronously loads data from API endpoints.

### PageRenderer Class
Dynamically renders page content from database data.

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- Environment variables for sensitive data
- CORS enabled with proper headers
- Protected admin routes
- Token expiration (24 hours)
- Input validation
- File upload restrictions

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

## 🎨 Color Palette

### Primary Green
- Light: #4CAF50
- Dark: #1B5E20
- Glow: #00ff41

### Grays (Neutral)
- Light BG: #f8f9f7
- Dark BG: #0d1b0f
- Glow BG: #0a0f0b

## 📊 Database Schema Examples

### Admin User
```javascript
{
  username: "admin",
  password: "hashed_password",
  email: "admin@rudra.tech",
  fullName: "Admin User",
  createdAt: timestamp
}
```

### Team Member
```javascript
{
  name: "John Doe",
  designation: "Lead Developer",
  bio: "Senior developer with 10+ years experience",
  email: "john@rudra.tech",
  imageFile: "filename.jpg",
  socialLinks: {
    linkedin: "url",
    twitter: "url",
    github: "url"
  },
  createdAt: timestamp
}
```

### Service
```javascript
{
  title: "Web Development",
  description: "Custom web applications...",
  icon: "🌐",
  features: ["Feature 1", "Feature 2"],
  order: 1,
  createdAt: timestamp
}
```

### Project
```javascript
{
  title: "E-commerce Platform",
  description: "Full-featured online store...",
  category: "Web Development",
  imageFile: "filename.jpg",
  technologies: ["React", "Node.js", "MongoDB"],
  clientName: "ABC Corp",
  featured: true,
  createdAt: timestamp
}
```

## 🚀 Deployment

### Server Requirements
- Node.js runtime environment
- MongoDB (Atlas or self-hosted)
- 512MB+ RAM
- Node package manager (npm)

### Deployment Steps
1. Set production environment variables
2. Install dependencies: `npm install`
3. Build/minify if needed
4. Start with: `npm start`
5. Use process manager (PM2, systemd, etc.)
6. Configure reverse proxy (nginx, Apache)
7. Set up SSL/TLS certificates
8. Configure firewall rules

### Production Checklist
- [ ] Change default admin credentials
- [ ] Update JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Configure monitoring
- [ ] Set up logging
- [ ] Test all API endpoints
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Set up CDN if needed

## 🛠️ Development

### Adding New Features
1. Create backend route in `/backend/routes/`
2. Create controller in `/backend/controllers/`
3. Create MongoDB model in `/backend/models/`
4. Add frontend functionality in `frontend/js/`
5. Create/update HTML pages in `frontend/`
6. Test thoroughly

### Styling Guidelines
- Use CSS variables for colors
- Follow BEM naming convention
- Maintain responsive design
- Test all UI modes
- Check animation performance

## 📝 Code Quality

- Well-commented code
- Consistent formatting
- Modular structure
- DRY principles
- Proper error handling
- Input validation
- SEO-optimized HTML

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify database exists
- Check network connectivity

### Admin Login Issues
- Verify credentials are correct
- Check JWT_SECRET matches
- Ensure database is accessible
- Clear browser localStorage

### Image Upload Failed
- Check upload directory exists
- Verify file permissions
- Check file size limits
- Ensure image format is supported

### API Not Responding
- Verify server is running
- Check port is not in use
- Review server logs
- Verify API Base URL is correct

## 📞 Support & Contact

- Email: info@rudra.tech
- Phone: +91 98765 43210
- Website: http://localhost:5000

## 📄 License

This project is proprietary and confidential. Unauthorized use is prohibited.

## 🎉 Conclusion

This is a comprehensive, production-ready website solution for Rudra Innovation & Media Tech Ventures. It demonstrates modern web development practices with a focus on user experience, security, and maintainability.

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** Production Ready ✅
