/* ============================================
   RUDRA WEBSITE - MAIN JAVASCRIPT
   ============================================ */

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// ============== MODE SWITCHER ==============
class ModeSwitcher {
  constructor() {
    this.currentMode = localStorage.getItem('uiMode') || 'light-mode';
    this.initMode();
    this.setupEventListeners();
  }
  
  initMode() {
    document.body.className = this.currentMode;
    this.updateModeButtons();
  }
  
  setMode(mode) {
    this.currentMode = mode;
    document.body.className = mode;
    localStorage.setItem('uiMode', mode);
    this.updateModeButtons();
  }
  
  setupEventListeners() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        this.setMode(mode);
      });
    });
  }
  
  updateModeButtons() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.mode === this.currentMode) {
        btn.classList.add('active');
      }
    });
  }
}

// ============== SCROLL REVEAL ==============
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.scroll-reveal');
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, this.options);
    
    this.elements.forEach(el => observer.observe(el));
  }
}

// ============== SMOOTH NAVIGATION ==============
class Navigation {
  constructor() {
    this.setupNavigation();
  }
  
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
      });
    });
  }
}

// ============== FORM HANDLER ==============
class FormHandler {
  constructor() {
    this.setupForms();
  }
  
  setupForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }
  }
  
  async handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message')
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        this.showMessage('Message sent successfully!', 'success');
        form.reset();
      } else {
        this.showMessage(data.message || 'Error sending message', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('Error sending message. Please try again.', 'error');
    }
  }
  
  showMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    if (form) {
      form.parentElement.insertBefore(alertDiv, form);
      
      setTimeout(() => {
        alertDiv.remove();
      }, 5000);
    }
  }
}

// ============== API DATA LOADER ==============
class DataLoader {
  async fetchTeamMembers() {
    try {
      const response = await fetch(`${API_BASE_URL}/team`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }
  
  async fetchProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }
  
  async fetchServices() {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }
}

// ============== RENDERER ==============
class PageRenderer {
  constructor() {
    this.dataLoader = new DataLoader();
  }
  
  async renderTeamSection() {
    const container = document.getElementById('teamContainer');
    if (!container) return;
    
    const members = await this.dataLoader.fetchTeamMembers();
    
    container.innerHTML = members.map(member => `
      <div class="card team-card scroll-reveal">
        <div class="team-image">
          <img src="/uploads/team/${member.imageFile}" alt="${member.name}" onerror="this.src='/images/placeholder.jpg'">
        </div>
        <div class="team-info">
          <h3>${member.name}</h3>
          <div class="team-designation">${member.designation}</div>
          <p class="team-bio">${member.bio || 'Dedicated professional at Rudra Innovation'}</p>
          <div class="team-socials">
            ${member.socialLinks?.linkedin ? `<a href="${member.socialLinks.linkedin}" class="team-social-link" title="LinkedIn">in</a>` : ''}
            ${member.socialLinks?.twitter ? `<a href="${member.socialLinks.twitter}" class="team-social-link" title="Twitter">𝕏</a>` : ''}
            ${member.socialLinks?.github ? `<a href="${member.socialLinks.github}" class="team-social-link" title="GitHub">⚙</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
    
    // Re-init scroll reveal for newly added elements
    new ScrollReveal();
  }
  
  async renderServicesSection() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;
    
    const services = await this.dataLoader.fetchServices();
    
    if (services.length === 0) {
      container.innerHTML = '<p class="text-center">Services loading...</p>';
      return;
    }
    
    container.innerHTML = services.map(service => `
      <div class="card service-card scroll-reveal">
        <div class="service-icon">${service.icon || '🚀'}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        ${service.features && service.features.length > 0 ? `
          <ul class="service-features">
            ${service.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
    
    new ScrollReveal();
  }
  
  async renderPortfolioSection() {
    const container = document.getElementById('portfolioContainer');
    if (!container) return;
    
    const projects = await this.dataLoader.fetchProjects();
    
    container.innerHTML = projects.map(project => `
      <div class="card portfolio-card scroll-reveal">
        <div class="portfolio-image">
          <img src="/uploads/projects/${project.imageFile}" alt="${project.title}" onerror="this.src='/images/placeholder.jpg'">
          <div class="portfolio-overlay">
            <div class="portfolio-overlay-text">
              <h4>${project.title}</h4>
              <p>${project.description.substring(0, 60)}...</p>
            </div>
          </div>
        </div>
        <div class="portfolio-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${project.category ? `<div class="portfolio-categories"><span class="portfolio-category">${project.category}</span></div>` : ''}
          ${project.technologies && project.technologies.length > 0 ? `
            <div class="portfolio-tech">
              ${project.technologies.map(t => `<span class="portfolio-tech-item">${t}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
    
    new ScrollReveal();
  }
}

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mode switcher
  new ModeSwitcher();
  
  // Initialize scroll reveal
  new ScrollReveal();
  
  // Initialize navigation
  new Navigation();
  
  // Initialize form handler
  new FormHandler();
  
  // Initialize page renderer
  const renderer = new PageRenderer();
  renderer.renderTeamSection();
  renderer.renderServicesSection();
  renderer.renderPortfolioSection();
  
  console.log('✓ Rudra website initialized successfully');
});

// ============== UTILITY FUNCTIONS ==============
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Export for admin panel
window.DataLoader = DataLoader;
window.PageRenderer = PageRenderer;
window.scrollToSection = scrollToSection;
