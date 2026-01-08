# Placeholder Images Guide

This file explains how to add images to the website.

## Image Locations

### 1. Company Logo
**Location:** `public/images/logo.png`

Create a logo file with:
- Recommended size: 200x200 pixels
- Format: PNG (with transparency) or SVG
- Square aspect ratio preferred
- Green color scheme

### 2. Team Member Images
**Location:** `public/uploads/team/[filename]`

When you add a team member via admin panel:
1. Upload an image
2. File is automatically saved to this directory
3. Filename is stored in database

Requirements:
- Minimum size: 300x300 pixels
- Format: JPG, PNG
- Aspect ratio: Square (1:1)

### 3. Portfolio Project Images
**Location:** `public/uploads/projects/[filename]`

When you add a project via admin panel:
1. Upload project image
2. File is automatically saved to this directory

Requirements:
- Minimum size: 1200x800 pixels
- Format: JPG, PNG, WebP
- Aspect ratio: 16:10 or 16:9

### 4. Static Images (Optional)
**Location:** `public/images/`

Create subdirectories:
- `public/images/hero/` - Hero section backgrounds
- `public/images/case-study/` - Case study images
- `public/images/icons/` - Icon assets

## How to Add Images

### Method 1: Via Admin Panel
1. Login: http://localhost:5000/admin
2. Go to "Team Members" or "Portfolio"
3. Click "Add" button
4. Fill form and **select image file**
5. Click "Save"
6. Image is automatically uploaded and linked

### Method 2: Manual Upload
1. Create image files on your computer
2. Copy to appropriate directory:
   - Team images → `public/uploads/team/`
   - Project images → `public/uploads/projects/`
3. Note the filename
4. When adding via admin, use the filename

### Method 3: Using Placeholder Images
For quick testing without real images:

**Online Placeholder Services:**
- https://picsum.photos/ (random images)
- https://source.unsplash.com/ (free stock photos)
- https://placehold.co/ (solid color placeholders)

**Example URL:**
```html
<img src="https://picsum.photos/400/300" alt="Team Member">
```

## Image Optimization

### Compress Images Before Upload
Use online tools:
- TinyPNG (https://tinypng.com/)
- ImageOptim (https://imageoptim.com/)
- FileOptimizer

Benefits:
- Faster loading
- Smaller storage
- Better performance

### Recommended Sizes
- Logo: 200x200px, < 50KB
- Team photos: 400x400px, < 200KB
- Portfolio images: 1200x800px, < 500KB

## Placeholder Logo

If you don't have a logo yet, use temporary solutions:

### Text-Based Logo
```html
<div class="navbar-logo" style="font-size: 2rem;">🚀 Rudra</div>
```

### Emoji Logo
```html
<div style="font-size: 2.5rem;">🟢</div>
```

### Online Logo Makers
- Looka (https://looka.com/)
- Canva (https://canva.com/)
- Logo.com (https://logo.com/)

## Image Path References in Code

### In HTML
```html
<!-- Static images -->
<img src="/images/logo.png" alt="Logo">

<!-- Uploaded team member images -->
<img src="/uploads/team/filename.jpg" alt="Team Member">

<!-- Uploaded project images -->
<img src="/uploads/projects/filename.jpg" alt="Project">

<!-- From database with error handling -->
<img src="/uploads/team/${member.imageFile}" 
     alt="${member.name}" 
     onerror="this.src='/images/placeholder.jpg'">
```

### In CSS (backgrounds)
```css
.element {
  background-image: url('/images/bg.jpg');
}
```

## Troubleshooting Image Issues

### Image Not Showing
1. Check file path is correct
2. Verify file exists in directory
3. Check file permissions
4. Ensure filename matches database record
5. Check browser console for errors

### Uploading Fails
1. Verify `public/uploads/` directories exist:
   ```bash
   mkdir -p public/uploads/team
   mkdir -p public/uploads/projects
   ```
2. Check directory permissions
3. Verify file size is reasonable (< 10MB)
4. Check supported formats (JPG, PNG)

### Images Appear Stretched
1. Ensure images have correct aspect ratio
2. Add CSS to maintain aspect ratio:
   ```css
   img {
     width: 100%;
     height: auto;
     object-fit: cover;
   }
   ```

## Database Image Links

When you add a team member or project via admin panel:
1. Admin form captures file
2. Multer saves file to directory
3. Filename is stored in MongoDB
4. Frontend constructs full URL:
   ```javascript
   `<img src="/uploads/team/${member.imageFile}" />`
   ```

## Free Stock Photo Resources

For sample/placeholder images:
- **Unsplash** - https://unsplash.com/
- **Pexels** - https://pexels.com/
- **Pixabay** - https://pixabay.com/
- **Picsum** - https://picsum.photos/
- **Lorem Picsum** - https://loremPicsum.com/

## Production Considerations

### CDN Integration
For production, host images on CDN:
- Amazon S3
- Cloudflare
- ImageKit
- Cloudinary

### Image Formats
- Use WebP for modern browsers
- Fallback to JPG/PNG
- Compress all images
- Use responsive images with srcset

### Lazy Loading
Implement lazy loading for performance:
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

## Next Steps

1. Create/download a logo for your company
2. Place it in `public/images/logo.png`
3. Add team member photos to `public/uploads/team/`
4. Add portfolio project images to `public/uploads/projects/`
5. Test by viewing website

Your website will then display all images correctly!
