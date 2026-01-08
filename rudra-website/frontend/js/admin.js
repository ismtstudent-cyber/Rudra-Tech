/* ============================================
   ADMIN PANEL - JAVASCRIPT
   ============================================ */

const API_BASE_URL = 'http://localhost:5000/api';
let token = localStorage.getItem('adminToken');
let currentEditId = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  // For development, allow access without token
  // In production, check token
  
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{"fullName":"Admin","username":"admin"}');
  document.getElementById('adminName').textContent = adminUser.fullName || 'Admin';
  document.getElementById('adminEmail').textContent = adminUser.username || 'admin';
  
  // Initialize mode switcher
  if (typeof ModeSwitcher !== 'undefined') {
    new ModeSwitcher();
  }
  
  // Load all data
  loadDashboardStats();
  loadTeamMembers();
  loadServices();
  loadPortfolio();
  loadMessages();
});

// ============== SECTION MANAGEMENT ==============
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active from all nav links
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Show selected section
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add('active');
  }
  
  // Mark nav link as active
  event.target.classList.add('active');
  
  // Reload data if needed
  if (sectionId === 'team') loadTeamMembers();
  if (sectionId === 'services') loadServices();
  if (sectionId === 'portfolio') loadPortfolio();
  if (sectionId === 'contact') loadMessages();
}

// ============== DASHBOARD STATS ==============
async function loadDashboardStats() {
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    const [team, services, projects, messages] = await Promise.all([
      fetch(`${API_BASE_URL}/team`, { headers }).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE_URL}/services`, { headers }).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE_URL}/projects`, { headers }).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE_URL}/contact`, { headers }).then(r => r.json()).catch(() => [])
    ]);
    
    document.getElementById('statTeam').textContent = (team.length || 0);
    document.getElementById('statServices').textContent = (services.length || 0);
    document.getElementById('statProjects').textContent = (projects.length || 0);
    document.getElementById('statMessages').textContent = (messages.length || 0);
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// ============== TEAM MEMBERS ==============
async function loadTeamMembers() {
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/team`, { headers });
    
    const members = await response.json();
    const tbody = document.getElementById('teamTable');
    
    if (!Array.isArray(members) || members.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No team members yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = members.map(member => `
      <tr>
        <td>${member.name || 'N/A'}</td>
        <td>${member.designation || 'N/A'}</td>
        <td>${member.email || '-'}</td>
        <td>
          <div class="action-buttons">
            <button onclick="editTeamMember('${member._id}')" class="btn btn-sm">Edit</button>
            <button onclick="deleteTeamMember('${member._id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading team:', error);
  }
}

async function editTeamMember(id) {
  alert('Edit team member: ' + id);
}

async function deleteTeamMember(id) {
  if (!confirm('Are you sure you want to delete this team member?')) return;
  alert('Deleted team member: ' + id);
}

// ============== SERVICES ==============
async function loadServices() {
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/services`, { headers });
    
    const services = await response.json();
    const tbody = document.getElementById('servicesTable');
    
    if (!Array.isArray(services) || services.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No services yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = services.map(service => `
      <tr>
        <td>${service.title || 'N/A'}</td>
        <td>${(service.description || '').substring(0, 50)}...</td>
        <td>
          <div class="action-buttons">
            <button onclick="editService('${service._id}')" class="btn btn-sm">Edit</button>
            <button onclick="deleteService('${service._id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

async function editService(id) {
  alert('Edit service: ' + id);
}

async function deleteService(id) {
  if (!confirm('Are you sure?')) return;
  alert('Deleted service: ' + id);
}

// ============== PORTFOLIO ==============
async function loadPortfolio() {
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/projects`, { headers });
    
    const projects = await response.json();
    const tbody = document.getElementById('portfolioTable');
    
    if (!Array.isArray(projects) || projects.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No projects yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = projects.map(project => `
      <tr>
        <td>${project.title || 'N/A'}</td>
        <td>${project.category || 'N/A'}</td>
        <td>${project.clientName || '-'}</td>
        <td>
          <div class="action-buttons">
            <button onclick="editPortfolio('${project._id}')" class="btn btn-sm">Edit</button>
            <button onclick="deletePortfolio('${project._id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading portfolio:', error);
  }
}

async function editPortfolio(id) {
  alert('Edit project: ' + id);
}

async function deletePortfolio(id) {
  if (!confirm('Are you sure?')) return;
  alert('Deleted project: ' + id);
}

// ============== MESSAGES ==============
async function loadMessages() {
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/contact`, { headers });
    
    const messages = await response.json();
    const tbody = document.getElementById('contactTable');
    
    if (!Array.isArray(messages) || messages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No messages yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = messages.map(msg => `
      <tr>
        <td>${msg.name || 'N/A'}</td>
        <td>${msg.email || 'N/A'}</td>
        <td>${msg.subject || 'N/A'}</td>
        <td><span style="background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">${msg.status || 'new'}</span></td>
        <td>
          <div class="action-buttons">
            <button onclick="viewMessage('${msg._id}')" class="btn btn-sm">View</button>
            <button onclick="deleteMessage('${msg._id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

async function viewMessage(id) {
  alert('View message: ' + id);
}

async function deleteMessage(id) {
  if (!confirm('Delete this message?')) return;
  alert('Deleted message: ' + id);
}

// ============== LOGOUT ==============
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/';
  }
}

// End of admin.js
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const project = await response.json();
    
    currentEditId = id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectClient').value = project.clientName || '';
    document.getElementById('projectTechs').value = (project.technologies || []).join(', ');
    document.getElementById('projectFeatured').checked = project.featured || false;
    
    document.getElementById('portfolioModal').classList.add('active');
  } catch (error) {
    alert('Error loading project');
  }
}

async function deletePortfolio(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  
  try {
    await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    loadPortfolio();
  } catch (error) {
    alert('Error deleting project');
  }
}

document.getElementById('portfolioForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('title', document.getElementById('projectTitle').value);
  formData.append('description', document.getElementById('projectDescription').value);
  formData.append('category', document.getElementById('projectCategory').value);
  formData.append('clientName', document.getElementById('projectClient').value);
  formData.append('technologies', document.getElementById('projectTechs').value);
  formData.append('featured', document.getElementById('projectFeatured').checked);
  
  if (document.getElementById('projectImage').files[0]) {
    formData.append('image', document.getElementById('projectImage').files[0]);
  }
  
  try {
    const method = currentEditId ? 'PUT' : 'POST';
    const url = currentEditId ? `${API_BASE_URL}/projects/${currentEditId}` : `${API_BASE_URL}/projects`;
    
    const response = await fetch(url, {
      method,
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    
    if (response.ok) {
      closePortfolioModal();
      loadPortfolio();
    } else {
      alert('Error saving project');
    }
  } catch (error) {
    alert('Error saving project');
  }
});

// ============== MESSAGES ==============
async function loadMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const messages = await response.json();
    const tbody = document.getElementById('contactTable');
    
    if (messages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No messages yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = messages.map(msg => `
      <tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.subject}</td>
        <td><span class="portfolio-category">${msg.status || 'new'}</span></td>
        <td>
          <div class="action-buttons">
            <button onclick="viewMessage('${msg._id}')" class="btn btn-sm">View</button>
            <button onclick="deleteMessage('${msg._id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

async function viewMessage(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const msg = await response.json();
    
    alert(`From: ${msg.name} (${msg.email})\nPhone: ${msg.phone || 'N/A'}\n\nSubject: ${msg.subject}\n\nMessage:\n${msg.message}`);
  } catch (error) {
    alert('Error loading message');
  }
}

async function deleteMessage(id) {
  if (!confirm('Delete this message?')) return;
  
  try {
    await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    loadMessages();
  } catch (error) {
    alert('Error deleting message');
  }
}

// ============== LOGOUT ==============
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin';
  }
}
