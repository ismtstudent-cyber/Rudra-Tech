# Quick Setup Guide

## Step-by-Step Installation

### 1. Prerequisites
Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - Download from https://nodejs.org/
- **MongoDB** (local or MongoDB Atlas cloud) - Download from https://www.mongodb.com/
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### 2. Verify Installations
Open Command Prompt/Terminal and run:
```bash
node --version
npm --version
mongo --version  # if MongoDB is locally installed
```

### 3. Project Setup

#### Option A: From VS Code Terminal
1. Open the project folder in VS Code
2. Open integrated terminal (Ctrl + `)
3. Navigate to project directory:
   ```bash
   cd c:\Users\dpokh\OneDrive\Desktop\New folder (3)\rudra-website
   ```

#### Option B: From Command Prompt
1. Open Command Prompt
2. Navigate to project directory:
   ```bash
   cd "c:\Users\dpokh\OneDrive\Desktop\New folder (3)\rudra-website"
   ```

### 4. Install Dependencies
```bash
npm install
```
This will install all required packages listed in package.json

### 5. Configure Environment

Edit `.env` file with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rudra_website
JWT_SECRET=your_very_secret_key_12345_change_this_in_production
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123456
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rudra_website?retryWrites=true&w=majority
```

### 6. Start MongoDB

#### If using Local MongoDB:
```bash
mongod
```
Keep this terminal window open.

#### If using MongoDB Atlas:
No action needed - cloud database is already running.

### 7. Start the Server

In a new terminal, run:
```bash
npm start
```

You should see:
```
✓ MongoDB connected successfully
✓ Default admin created (username: admin, password: Admin@123456)
╔════════════════════════════════════════════════════════╗
║     RUDRA INNOVATION & MEDIA TECH VENTURES            ║
║              Server Running Successfully              ║
╠════════════════════════════════════════════════════════╣
║  Server: http://localhost:5000                         ║
║  Admin Panel: http://localhost:5000/admin              ║
║  API Health: http://localhost:5000/api/health          ║
╚════════════════════════════════════════════════════════╝
```

### 8. Access the Website

Open your browser and navigate to:
- **Website:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin

### 9. Login to Admin Panel

Use these credentials:
- **Username:** admin
- **Password:** Admin@123456

## Database Initialization

The system automatically creates a default admin user on first run. If you want to reset:

### Via MongoDB Compass:
1. Open MongoDB Compass
2. Connect to your MongoDB
3. Delete the `rudra_website` database
4. Restart the server

### Via MongoDB Shell:
```bash
mongo
use admin
db.dropDatabase()
exit
```

## Troubleshooting

### Port Already in Use
If port 5000 is in use, change in `.env`:
```env
PORT=5001
```

### MongoDB Connection Failed
1. Ensure MongoDB is running:
   ```bash
   mongod
   ```
2. Check connection string in `.env`
3. Verify database permissions

### Module Not Found Error
```bash
npm install
npm audit fix
```

### CORS Issues
Clear browser cache and cookies, then restart server.

## Adding Sample Data

### Via Admin Panel:
1. Login at http://localhost:5000/admin
2. Click "Add Team Member", "Add Service", etc.
3. Fill in the form and submit

### Via API (using Postman or curl):

**Add Team Member:**
```bash
curl -X POST http://localhost:5000/api/team \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "designation": "Lead Developer",
    "bio": "Expert developer",
    "email": "john@example.com"
  }'
```

**Add Service:**
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development",
    "description": "Custom web applications",
    "icon": "🌐",
    "features": ["Feature 1", "Feature 2"]
  }'
```

## Development Workflow

### For Auto-Reload on Changes:
```bash
npm run dev
```
This uses nodemon to automatically restart the server on file changes.

### VS Code Extensions Recommended:
- REST Client (for API testing)
- Thunder Client
- MongoDB for VS Code
- Prettier (code formatter)
- ESLint

## File Structure Quick Reference

```
rudra-website/
├── server.js              ← Main server entry point
├── package.json           ← Dependencies
├── .env                   ← Configuration
├── frontend/              ← All HTML, CSS, JS
│   ├── index.html         ← Homepage
│   ├── admin.html         ← Admin login
│   ├── admin-dashboard.html ← Admin panel
│   ├── css/
│   └── js/
├── backend/
│   ├── models/            ← Database schemas
│   ├── controllers/       ← Business logic
│   ├── routes/            ← API endpoints
│   └── middleware/        ← Custom middleware
└── public/                ← Static files & uploads
    ├── images/            ← Logo, etc.
    └── uploads/           ← User uploads
```

## Common Tasks

### Change Admin Password
Currently: Edit `.env` and restart server. For production, implement a "change password" feature in admin panel.

### Backup Database
```bash
# With MongoDB Compass: Export entire database
# With command line:
mongodump --uri mongodb://localhost:27017 --db rudra_website --out ./backup/
```

### Update Styles
Edit files in `frontend/css/`:
- `styles.css` - Main stylesheet and all 3 modes
- `components.css` - Component-specific styles

### Add New Page
1. Create `frontend/newpage.html`
2. Add route in `server.js`
3. Add navigation link in navbar

## Performance Tips

1. **Enable Caching:** Use browser caching headers
2. **Minify Assets:** Compress CSS/JS for production
3. **Image Optimization:** Compress images before upload
4. **Database Indexing:** Create indexes on frequently queried fields
5. **CDN Usage:** Serve static files from CDN in production

## Security Reminders

⚠️ **BEFORE DEPLOYING TO PRODUCTION:**

1. Change JWT_SECRET to a strong random string
2. Change ADMIN_USERNAME and ADMIN_PASSWORD
3. Set NODE_ENV=production
4. Enable HTTPS/SSL
5. Configure proper CORS settings
6. Use environment-specific configurations
7. Enable database authentication
8. Set up firewall rules
9. Regular backups
10. Monitor error logs

## Getting Help

1. Check the **README.md** for detailed documentation
2. Review error messages in server console
3. Check browser console (F12) for frontend errors
4. Use MongoDB Compass to inspect database
5. Test API endpoints with Postman

## Next Steps

1. ✅ Run the server: `npm start`
2. ✅ Access website: http://localhost:5000
3. ✅ Login to admin: http://localhost:5000/admin
4. ✅ Add some sample data
5. ✅ Explore all features
6. ✅ Customize with your data
7. ✅ Deploy when ready!

---

**Questions or issues?**
Contact: info@rudra.tech
