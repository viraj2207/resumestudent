// ============================================
//  RESUME BUILDER — Vanilla JS SPA
// ============================================

// -------- CONFIG --------
const TEMPLATES = [
  { id: 'classic',   name: 'Classic Professional', desc: 'Timeless single-column design, perfect for law, finance & traditional industries.' },
  { id: 'modern',    name: 'Modern Split',          desc: 'Contemporary two-column with navy sidebar — ideal for corporate roles.' },
  { id: 'creative',  name: 'Creative Edge',         desc: 'Vibrant gradient sidebar with skill indicators — made for designers & marketers.' },
  { id: 'minimal',   name: 'Minimal Clean',         desc: 'Ultra-clean layout with elegant typography — timeless and versatile.' },
  { id: 'executive', name: 'Executive Elite',       desc: 'Premium dark-header with gold accents — suited for C-level & senior roles.' },
  { id: 'techpro',   name: 'Tech Pro',              desc: 'Dark theme with monospace accents — built for engineers & developers.' }
];

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SAMPLE_RESUME = {
  personal: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Passionate software engineer with 3+ years of experience building scalable web applications. Strong background in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.'
  },
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Software Engineer',
      startDate: 'Jun 2022',
      endDate: 'Present',
      current: true,
      description: 'Led development of customer-facing React applications serving 500K+ monthly users. Improved page load performance by 40% through code splitting and lazy loading. Collaborated with cross-functional teams to deliver 3 major product releases.'
    },
    {
      company: 'StartupXYZ',
      position: 'Junior Developer',
      startDate: 'Jan 2021',
      endDate: 'May 2022',
      current: false,
      description: 'Built RESTful APIs with Node.js and Express. Implemented real-time features using WebSockets. Contributed to agile development process with bi-weekly sprints.'
    }
  ],
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2017',
      endYear: '2021',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'React / Next.js', level: 'Expert' },
    { name: 'JavaScript / TypeScript', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'AWS / Cloud', level: 'Intermediate' },
    { name: 'PostgreSQL', level: 'Advanced' }
  ],
  projects: [
    {
      name: 'CloudDash',
      technologies: 'React, Node.js, AWS, PostgreSQL',
      description: 'Open-source cloud cost monitoring dashboard with real-time alerts and budget tracking for AWS resources.',
      url: 'github.com/alexj/clouddash'
    }
  ],
  certifications: [
    { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2023' }
  ]
};

// -------- STATE --------
let state = {
  page: 'home',
  template: 'modern',
  resume: loadResume(),
  activeSection: 'personal'
};

// -------- STORAGE --------
function loadResume() {
  try {
    const saved = localStorage.getItem('rb_resume_v2');
    return saved ? JSON.parse(saved) : structuredClone(SAMPLE_RESUME);
  } catch {
    return structuredClone(SAMPLE_RESUME);
  }
}
function saveResume() {
  localStorage.setItem('rb_resume_v2', JSON.stringify(state.resume));
  localStorage.setItem('rb_template', state.template);
}
function loadTemplate() {
  return localStorage.getItem('rb_template') || 'modern';
}

// -------- NAVIGATION --------
function navigate(page, opts = {}) {
  state.page = page;
  if (opts.template) state.template = opts.template;
  if (opts.section)  state.activeSection = opts.section;
  render();
  window.scrollTo(0, 0);
}

// -------- MAIN RENDER --------
function render() {
  const app = document.getElementById('app');
  switch (state.page) {
    case 'home':      app.innerHTML = renderHome();      bindHomeEvents();   break;
    case 'templates': app.innerHTML = renderTemplates(); bindTplEvents();    break;
    case 'editor':    app.innerHTML = renderEditor();    bindEditorEvents(); break;
    case 'preview':   app.innerHTML = renderPreview();   bindPreviewEvents();break;
    case 'ats':       app.innerHTML = renderATS();       bindATSEvents();    break;
  }
}

// ============================================
//  PAGE: HOME
// ============================================
function renderHome() {
  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
  <div class="page home-page">
    <div class="home-hero">
      <div class="home-badge">✦ Student Resume Builder</div>
      <h1 class="home-title">Build Your Dream<br>Resume Today</h1>
      <p class="home-subtitle">Professional, ATS-friendly resumes crafted with beautiful templates — ready in minutes, not hours.</p>
    </div>

    <div class="options-grid">
      <div class="option-card tpl" data-nav="templates">
        <div class="card-icon">🎨</div>
        <div class="card-title">Browse Templates</div>
        <div class="card-desc">Explore 6 modern, trending resume templates used by top professionals worldwide.</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="option-card edt" data-nav="editor">
        <div class="card-icon">✏️</div>
        <div class="card-title">Resume Editor</div>
        <div class="card-desc">Fill in your details with our guided editor. Add experience, skills, projects, and more.</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="option-card prv" data-nav="preview">
        <div class="card-icon">👁️</div>
        <div class="card-title">Live Preview</div>
        <div class="card-desc">See exactly how your resume will look with real-time preview across all templates.</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="option-card ats" data-nav="ats">
        <div class="card-icon">🎯</div>
        <div class="card-title">ATS Score Tester</div>
        <div class="card-desc">Instantly analyze your resume's ATS compatibility score with real-time feedback and tips.</div>
        <div class="card-arrow">→</div>
      </div>
    </div>

    <div style="margin-top:3rem; text-align:center; animation: fadeIn 1s ease 0.9s both; opacity:0; animation-fill-mode:both;">
      <p style="font-size:0.82rem; color:#334155;">
        ✓ ATS Score Tester &nbsp;&nbsp;✓ PDF Download &nbsp;&nbsp;✓ 6 Templates &nbsp;&nbsp;✓ Auto-Save &nbsp;&nbsp;✓ Free Forever
      </p>
    </div>

    <footer class="home-footer">
      <div class="footer-brand">RESUMEBUILDER <span class="footer-version">v1.7.3</span></div>
      <div class="footer-tagline">Get job ready resumes.</div>
      <div class="footer-copy">© ${new Date().getFullYear()} ResumeBuilder. All rights reserved.</div>
      <div class="footer-designer">Designed by <strong style="color:#6366f1;">Viraj Khandare</strong></div>
    </footer>
  </div>`;
}
function bindHomeEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
}

// ============================================
//  PAGE: TEMPLATES
// ============================================
function renderTemplates() {
  const cards = TEMPLATES.map((t, i) => {
    const isSelected = state.template === t.id;
    return `
    <div class="template-card ${isSelected ? 'selected' : ''}" data-tpl="${t.id}" style="animation-delay:${i * 0.07}s">
      <div class="template-preview">
        <div class="template-preview-inner">
          ${getResumeHTML(t.id, state.resume)}
        </div>
      </div>
      <div class="template-info">
        <div class="template-name">${t.name} ${isSelected ? '<span class="selected-badge">✓ Selected</span>' : ''}</div>
        <div class="template-desc">${t.desc}</div>
        <button class="btn-use-tpl" data-tpl="${t.id}">${isSelected ? '✓ Currently Selected' : 'Use This Template'}</button>
      </div>
    </div>`;
  }).join('');

  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page" style="min-height:100vh;">
    <nav class="top-nav">
      <button class="btn-back" data-nav="home">← Back</button>
      <span class="logo">RESUMEBUILDER</span>
      <button class="btn-primary" data-nav="editor">Open Editor →</button>
    </nav>
    <div class="page-inner">
      <div class="page-header">
        <h1>Choose Your Template</h1>
        <p>6 modern, professionally designed resume templates. Click to select and use.</p>
      </div>
      <div class="templates-grid animate-in">${cards}</div>
    </div>
  </div>`;
}
function bindTplEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
  document.querySelectorAll('.btn-use-tpl').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.template = btn.dataset.tpl;
      saveResume();
      showToast(`Template "${TEMPLATES.find(t=>t.id===state.template)?.name}" selected!`, 'success');
      navigate('editor');
    });
  });
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      state.template = card.dataset.tpl;
      saveResume();
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

// ============================================
//  PAGE: EDITOR
// ============================================
function renderEditor() {
  const r = state.resume;
  const sectionContent = renderEditorSection(state.activeSection);

  const tabs = ['personal','experience','education','skills','projects','certifications'];
  const tabLabels = { personal:'Personal', experience:'Experience', education:'Education', skills:'Skills', projects:'Projects', certifications:'Certs' };

  const tabsHTML = tabs.map(t => `
    <button class="section-tab ${state.activeSection===t?'active':''}" data-section="${t}">${tabLabels[t]}</button>
  `).join('');

  const chipHTML = TEMPLATES.map(t => `
    <button class="tpl-chip ${state.template===t.id?'active':''}" data-tpl="${t.id}">${t.name}</button>
  `).join('');

  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page" style="min-height:100vh;">
    <nav class="top-nav">
      <button class="btn-back" data-nav="home">← Home</button>
      <span class="logo">Resume Editor</span>
      <div class="editor-actions">
        <button class="btn-secondary" id="btn-clear">Clear</button>
        <button class="btn-secondary" data-nav="templates">Templates</button>
        <button class="btn-primary" data-nav="preview">Preview →</button>
      </div>
    </nav>
    <div class="editor-layout">
      <div class="editor-panel animate-in">
        <div class="editor-header">
          <h2>Edit Resume</h2>
          <span class="auto-preview-badge"><span class="live-dot"></span> Auto-save on</span>
        </div>
        <div class="section-tabs">${tabsHTML}</div>
        <div class="form-section" id="form-section">${sectionContent}</div>
      </div>
      <div class="preview-panel animate-in" style="animation-delay:0.1s">
        <div class="preview-panel-header">
          <h2>Live Preview</h2>
          <div style="display:flex;gap:0.5rem;align-items:center;">
            <span style="font-size:0.75rem;color:#475569">Template:</span>
          </div>
        </div>
        <div class="template-selector-strip">${chipHTML}</div>
        <div class="preview-scroll">
          <div class="resume-wrapper" id="live-preview">
            ${getResumeHTML(state.template, state.resume)}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderEditorSection(section) {
  switch(section) {
    case 'personal':      return renderPersonalForm();
    case 'experience':    return renderExperienceForm();
    case 'education':     return renderEducationForm();
    case 'skills':        return renderSkillsForm();
    case 'projects':      return renderProjectsForm();
    case 'certifications':return renderCertificationsForm();
    default: return '';
  }
}

function renderPersonalForm() {
  const p = state.resume.personal;
  return `
  <div class="form-row">
    <div class="form-group">
      <label>Full Name</label>
      <input type="text" data-field="personal.name" value="${esc(p.name)}" placeholder="Alex Johnson">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" data-field="personal.email" value="${esc(p.email)}" placeholder="alex@email.com">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>Phone</label>
      <input type="tel" data-field="personal.phone" value="${esc(p.phone)}" placeholder="+1 (555) 000-0000">
    </div>
    <div class="form-group">
      <label>Location</label>
      <input type="text" data-field="personal.location" value="${esc(p.location)}" placeholder="San Francisco, CA">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>LinkedIn</label>
      <input type="text" data-field="personal.linkedin" value="${esc(p.linkedin)}" placeholder="linkedin.com/in/yourname">
    </div>
    <div class="form-group">
      <label>GitHub</label>
      <input type="text" data-field="personal.github" value="${esc(p.github)}" placeholder="github.com/yourname">
    </div>
  </div>
  <div class="form-group">
    <label>Portfolio / Website</label>
    <input type="text" data-field="personal.website" value="${esc(p.website)}" placeholder="yourportfolio.dev">
  </div>
  <div class="form-group">
    <label>Professional Summary</label>
    <textarea data-field="personal.summary" rows="4" placeholder="Write a compelling 2-3 sentence summary of your background, skills, and goals...">${esc(p.summary)}</textarea>
  </div>`;
}

function renderExperienceForm() {
  const exps = state.resume.experience;
  const items = exps.map((e, i) => `
  <div class="item-card" data-exp-idx="${i}">
    <div class="item-card-header">
      <span class="item-card-title">${e.position || 'Position'} @ ${e.company || 'Company'}</span>
      <button class="btn-remove" data-remove-exp="${i}">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Job Title</label>
        <input type="text" data-exp="${i}.position" value="${esc(e.position)}" placeholder="Software Engineer">
      </div>
      <div class="form-group">
        <label>Company</label>
        <input type="text" data-exp="${i}.company" value="${esc(e.company)}" placeholder="Google Inc.">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="text" data-exp="${i}.startDate" value="${esc(e.startDate)}" placeholder="Jan 2022">
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="text" data-exp="${i}.endDate" value="${esc(e.current?'Present':e.endDate)}" placeholder="Present">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea data-exp="${i}.description" rows="3" placeholder="Describe your key achievements, responsibilities, and impact...">${esc(e.description)}</textarea>
    </div>
  </div>`).join('');

  return `${items}<button class="btn-add" id="btn-add-exp">+ Add Experience</button>`;
}

function renderEducationForm() {
  const edus = state.resume.education;
  const items = edus.map((e, i) => `
  <div class="item-card" data-edu-idx="${i}">
    <div class="item-card-header">
      <span class="item-card-title">${e.institution || 'Institution'}</span>
      <button class="btn-remove" data-remove-edu="${i}">Remove</button>
    </div>
    <div class="form-group">
      <label>Institution</label>
      <input type="text" data-edu="${i}.institution" value="${esc(e.institution)}" placeholder="MIT">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Degree</label>
        <input type="text" data-edu="${i}.degree" value="${esc(e.degree)}" placeholder="Bachelor of Science">
      </div>
      <div class="form-group">
        <label>Field of Study</label>
        <input type="text" data-edu="${i}.field" value="${esc(e.field)}" placeholder="Computer Science">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Year</label>
        <input type="text" data-edu="${i}.startYear" value="${esc(e.startYear)}" placeholder="2019">
      </div>
      <div class="form-group">
        <label>End Year</label>
        <input type="text" data-edu="${i}.endYear" value="${esc(e.endYear)}" placeholder="2023">
      </div>
    </div>
    <div class="form-group">
      <label>GPA (optional)</label>
      <input type="text" data-edu="${i}.gpa" value="${esc(e.gpa)}" placeholder="3.8 / 4.0">
    </div>
  </div>`).join('');

  return `${items}<button class="btn-add" id="btn-add-edu">+ Add Education</button>`;
}

function renderSkillsForm() {
  const skills = state.resume.skills;
  const items = skills.map((s, i) => `
  <div class="skill-item" data-skill-idx="${i}">
    <input type="text" data-skill="${i}.name" value="${esc(s.name)}" placeholder="Skill (e.g., React.js)">
    <select data-skill="${i}.level">
      ${SKILL_LEVELS.map(l => `<option value="${l}" ${s.level===l?'selected':''}>${l}</option>`).join('')}
    </select>
    <button class="btn-remove" data-remove-skill="${i}">✕</button>
  </div>`).join('');

  return `
  <p style="font-size:0.82rem;color:#64748b;margin-bottom:1rem;">Add your skills and rate your proficiency level.</p>
  <div id="skills-list">${items}</div>
  <button class="btn-add" id="btn-add-skill">+ Add Skill</button>`;
}

function renderProjectsForm() {
  const projs = state.resume.projects;
  const items = projs.map((p, i) => `
  <div class="item-card" data-proj-idx="${i}">
    <div class="item-card-header">
      <span class="item-card-title">${p.name || 'Project'}</span>
      <button class="btn-remove" data-remove-proj="${i}">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Project Name</label>
        <input type="text" data-proj="${i}.name" value="${esc(p.name)}" placeholder="My Awesome Project">
      </div>
      <div class="form-group">
        <label>Technologies Used</label>
        <input type="text" data-proj="${i}.technologies" value="${esc(p.technologies)}" placeholder="React, Node.js, PostgreSQL">
      </div>
    </div>
    <div class="form-group">
      <label>Project URL (optional)</label>
      <input type="text" data-proj="${i}.url" value="${esc(p.url)}" placeholder="github.com/username/project">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea data-proj="${i}.description" rows="3" placeholder="Describe what you built, its impact, and key features...">${esc(p.description)}</textarea>
    </div>
  </div>`).join('');

  return `${items}<button class="btn-add" id="btn-add-proj">+ Add Project</button>`;
}

function renderCertificationsForm() {
  const certs = state.resume.certifications;
  const items = certs.map((c, i) => `
  <div class="item-card" data-cert-idx="${i}">
    <div class="item-card-header">
      <span class="item-card-title">${c.name || 'Certification'}</span>
      <button class="btn-remove" data-remove-cert="${i}">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Certification Name</label>
        <input type="text" data-cert="${i}.name" value="${esc(c.name)}" placeholder="AWS Certified Developer">
      </div>
      <div class="form-group">
        <label>Issuing Organization</label>
        <input type="text" data-cert="${i}.issuer" value="${esc(c.issuer)}" placeholder="Amazon Web Services">
      </div>
    </div>
    <div class="form-group">
      <label>Year Obtained</label>
      <input type="text" data-cert="${i}.year" value="${esc(c.year)}" placeholder="2024">
    </div>
  </div>`).join('');

  return `${items}<button class="btn-add" id="btn-add-cert">+ Add Certification</button>`;
}

// -------- Editor Events --------
function bindEditorEvents() {
  const app = document.getElementById('app');

  // Navigation
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Template chips
  document.querySelectorAll('.tpl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.template = chip.dataset.tpl;
      document.querySelectorAll('.tpl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      refreshPreview();
    });
  });

  // Section tabs
  document.querySelectorAll('.section-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      collectFormData();
      state.activeSection = tab.dataset.section;
      document.getElementById('form-section').innerHTML = renderEditorSection(state.activeSection);
      document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  // Clear button
  document.getElementById('btn-clear')?.addEventListener('click', () => {
    if (confirm('Clear all resume data and start fresh?')) {
      state.resume = { personal:{name:'',email:'',phone:'',location:'',linkedin:'',github:'',website:'',summary:''}, experience:[], education:[], skills:[], projects:[], certifications:[] };
      saveResume();
      navigate('editor');
    }
  });

  // Bind dynamic events (add/remove)
  bindDynamicEvents();

  // Live input listener
  document.getElementById('form-section')?.addEventListener('input', debounce(() => {
    collectFormData();
    refreshPreview();
    saveResume();
  }, 300));
}

function bindDynamicEvents() {
  const fs = document.getElementById('form-section');
  if (!fs) return;

  // Add experience
  fs.querySelector('#btn-add-exp')?.addEventListener('click', () => {
    collectFormData();
    state.resume.experience.push({ company:'', position:'', startDate:'', endDate:'', current:false, description:'' });
    document.getElementById('form-section').innerHTML = renderEditorSection('experience');
    bindDynamicEvents();
  });
  // Remove experience
  fs.querySelectorAll('[data-remove-exp]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.experience.splice(parseInt(btn.dataset.removeExp), 1);
      document.getElementById('form-section').innerHTML = renderEditorSection('experience');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  // Add education
  fs.querySelector('#btn-add-edu')?.addEventListener('click', () => {
    collectFormData();
    state.resume.education.push({ institution:'', degree:'', field:'', startYear:'', endYear:'', gpa:'' });
    document.getElementById('form-section').innerHTML = renderEditorSection('education');
    bindDynamicEvents();
  });
  // Remove education
  fs.querySelectorAll('[data-remove-edu]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.education.splice(parseInt(btn.dataset.removeEdu), 1);
      document.getElementById('form-section').innerHTML = renderEditorSection('education');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  // Add skill
  fs.querySelector('#btn-add-skill')?.addEventListener('click', () => {
    collectFormData();
    state.resume.skills.push({ name:'', level:'Intermediate' });
    document.getElementById('form-section').innerHTML = renderEditorSection('skills');
    bindDynamicEvents();
  });
  // Remove skill
  fs.querySelectorAll('[data-remove-skill]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.skills.splice(parseInt(btn.dataset.removeSkill), 1);
      document.getElementById('form-section').innerHTML = renderEditorSection('skills');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  // Add project
  fs.querySelector('#btn-add-proj')?.addEventListener('click', () => {
    collectFormData();
    state.resume.projects.push({ name:'', technologies:'', description:'', url:'' });
    document.getElementById('form-section').innerHTML = renderEditorSection('projects');
    bindDynamicEvents();
  });
  // Remove project
  fs.querySelectorAll('[data-remove-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.projects.splice(parseInt(btn.dataset.removeProj), 1);
      document.getElementById('form-section').innerHTML = renderEditorSection('projects');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  // Add certification
  fs.querySelector('#btn-add-cert')?.addEventListener('click', () => {
    collectFormData();
    state.resume.certifications.push({ name:'', issuer:'', year:'' });
    document.getElementById('form-section').innerHTML = renderEditorSection('certifications');
    bindDynamicEvents();
  });
  // Remove certification
  fs.querySelectorAll('[data-remove-cert]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.certifications.splice(parseInt(btn.dataset.removeCert), 1);
      document.getElementById('form-section').innerHTML = renderEditorSection('certifications');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  // Re-bind live input after DOM update
  document.getElementById('form-section')?.addEventListener('input', debounce(() => {
    collectFormData();
    refreshPreview();
    saveResume();
  }, 350));
}

function collectFormData() {
  const fs = document.getElementById('form-section');
  if (!fs) return;

  // Personal
  fs.querySelectorAll('[data-field]').forEach(el => {
    const path = el.dataset.field.split('.');
    let obj = state.resume;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = el.value;
  });

  // Experience
  fs.querySelectorAll('[data-exp]').forEach(el => {
    const parts = el.dataset.exp.split('.');
    const idx = parseInt(parts[0]);
    const key = parts[1];
    if (state.resume.experience[idx]) {
      state.resume.experience[idx][key] = el.value;
      if (key === 'endDate') state.resume.experience[idx].current = el.value.toLowerCase() === 'present';
    }
  });

  // Education
  fs.querySelectorAll('[data-edu]').forEach(el => {
    const parts = el.dataset.edu.split('.');
    const idx = parseInt(parts[0]);
    const key = parts[1];
    if (state.resume.education[idx]) state.resume.education[idx][key] = el.value;
  });

  // Skills
  fs.querySelectorAll('[data-skill]').forEach(el => {
    const parts = el.dataset.skill.split('.');
    const idx = parseInt(parts[0]);
    const key = parts[1];
    if (state.resume.skills[idx]) state.resume.skills[idx][key] = el.value;
  });

  // Projects
  fs.querySelectorAll('[data-proj]').forEach(el => {
    const parts = el.dataset.proj.split('.');
    const idx = parseInt(parts[0]);
    const key = parts[1];
    if (state.resume.projects[idx]) state.resume.projects[idx][key] = el.value;
  });

  // Certifications
  fs.querySelectorAll('[data-cert]').forEach(el => {
    const parts = el.dataset.cert.split('.');
    const idx = parseInt(parts[0]);
    const key = parts[1];
    if (state.resume.certifications[idx]) state.resume.certifications[idx][key] = el.value;
  });
}

function refreshPreview() {
  const lp = document.getElementById('live-preview');
  if (lp) lp.innerHTML = getResumeHTML(state.template, state.resume);
}

// ============================================
//  PAGE: PREVIEW
// ============================================
function renderPreview() {
  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page preview-page">
    <nav class="top-nav">
      <button class="btn-back" data-nav="editor">← Edit</button>
      <span class="logo">Resume Preview</span>
      <div class="editor-actions">
        <div style="display:flex;gap:0.4rem;align-items:center;">
          ${TEMPLATES.map(t => `<button class="tpl-chip ${state.template===t.id?'active':''}" data-tpl="${t.id}" title="${t.name}">${t.name.split(' ')[0]}</button>`).join('')}
        </div>
        <button class="btn-download" id="btn-download">⬇ Download PDF</button>
      </div>
    </nav>
    <div class="full-preview">
      <div class="full-resume" id="full-resume-view">
        ${getResumeHTML(state.template, state.resume)}
      </div>
    </div>
  </div>`;
}
function bindPreviewEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
  document.querySelectorAll('.tpl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.template = chip.dataset.tpl;
      document.querySelectorAll('.tpl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const view = document.getElementById('full-resume-view');
      if (view) view.innerHTML = getResumeHTML(state.template, state.resume);
    });
  });
  document.getElementById('btn-download')?.addEventListener('click', triggerDownload);
}

// ============================================
//  DOWNLOAD (PDF via Print)
// ============================================
function triggerDownload() {
  const resumeHTML = getResumeHTML(state.template, state.resume);
  const printArea = document.getElementById('print-area');
  printArea.innerHTML = resumeHTML;
  printArea.style.display = 'block';

  showToast('Opening print dialog... Choose "Save as PDF"', 'info');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      printArea.style.display = 'none';
      printArea.innerHTML = '';
    }, 1000);
  }, 200);
}

// ============================================
//  TEMPLATE RENDERERS
// ============================================
function getResumeHTML(templateId, data) {
  switch(templateId) {
    case 'classic':   return classicTemplate(data);
    case 'modern':    return modernTemplate(data);
    case 'creative':  return creativeTemplate(data);
    case 'minimal':   return minimalTemplate(data);
    case 'executive': return executiveTemplate(data);
    case 'techpro':   return techproTemplate(data);
    default:          return modernTemplate(data);
  }
}

function skillPct(level) {
  return { 'Beginner':25, 'Intermediate':55, 'Advanced':80, 'Expert':100 }[level] || 60;
}
function skillDots(level, filled='filled', empty='') {
  const n = { 'Beginner':1,'Intermediate':2,'Advanced':3,'Expert':4 }[level]||2;
  return Array.from({length:4}, (_,i) => `<span class="r-level-dot ${i<n?filled:empty}"></span>`).join('');
}
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escRaw(str) {
  if (!str) return '';
  return String(str);
}

// --- CLASSIC ---
function classicTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  return `
  <div class="resume-classic">
    <div class="r-header">
      <div class="r-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-contact">${contacts.map(c=>`<span>${esc(c)}</span>`).join('')}</div>
    </div>
    <div class="r-body">
      ${p.summary ? `<div class="r-section"><div class="r-section-title">Summary</div><div class="r-summary">${esc(p.summary)}</div></div>` : ''}
      ${d.experience.length ? `
      <div class="r-section">
        <div class="r-section-title">Experience</div>
        ${d.experience.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.position)}</span>
            <span class="r-item-date">${esc(e.startDate)}${e.endDate?` – ${esc(e.endDate)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-section">
        <div class="r-section-title">Education</div>
        ${d.education.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear?` – ${esc(e.endYear)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field?`, ${esc(e.field)}`:''} ${e.gpa?`· GPA: ${esc(e.gpa)}`:''}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-section">
        <div class="r-section-title">Skills</div>
        <div class="r-skills">${d.skills.map(s=>`<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-section">
        <div class="r-section-title">Projects</div>
        ${d.projects.map(p=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(p.name)}</span>
            ${p.url?`<span class="r-item-date">${esc(p.url)}</span>`:''}
          </div>
          <div class="r-item-sub">${esc(p.technologies)}</div>
          <div class="r-item-desc">${esc(p.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-section">
        <div class="r-section-title">Certifications</div>
        <div class="r-skills">${d.certifications.map(c=>`<span class="r-skill-tag">${esc(c.name)}${c.issuer?` · ${esc(c.issuer)}`:''} ${c.year?`(${esc(c.year)})`:''}</span>`).join('')}</div>
      </div>` : ''}
    </div>
  </div>`;
}

// --- MODERN ---
function modernTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-modern">
    <div class="r-sidebar">
      <div class="r-name">${esc(p.name)||'Your Name'}</div>
      <div class="r-role">${d.experience[0]?.position||'Professional'}</div>
      ${p.email||p.phone||p.location ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Contact</div>
        ${p.email?`<div class="r-contact-item">✉ ${esc(p.email)}</div>`:''}
        ${p.phone?`<div class="r-contact-item">☎ ${esc(p.phone)}</div>`:''}
        ${p.location?`<div class="r-contact-item">📍 ${esc(p.location)}</div>`:''}
        ${p.linkedin?`<div class="r-contact-item">in ${esc(p.linkedin)}</div>`:''}
        ${p.github?`<div class="r-contact-item">⌥ ${esc(p.github)}</div>`:''}
        ${p.website?`<div class="r-contact-item">🌐 ${esc(p.website)}</div>`:''}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Skills</div>
        ${d.skills.map(s=>`
        <div class="r-skill-row">
          <div class="r-skill-label"><span>${esc(s.name)}</span><span style="opacity:0.6;font-size:0.7rem">${s.level||''}</span></div>
          <div class="r-skill-bar"><div class="r-skill-fill" style="width:${skillPct(s.level)}%"></div></div>
        </div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Certifications</div>
        ${d.certifications.map(c=>`<div class="r-contact-item" style="margin-bottom:0.6rem"><strong style="color:#fff">${esc(c.name)}</strong><br>${esc(c.issuer)} ${c.year?`· ${esc(c.year)}`:''}</div>`).join('')}
      </div>` : ''}
    </div>
    <div class="r-main">
      ${p.summary?`<div class="r-main-section"><div class="r-main-title">Profile</div><div class="r-summary">${esc(p.summary)}</div></div>`:''}
      ${d.experience.length?`
      <div class="r-main-section">
        <div class="r-main-title">Experience</div>
        ${d.experience.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.position)}</span>
            <span class="r-item-date">${esc(e.startDate)}${e.endDate?` – ${esc(e.endDate)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.education.length?`
      <div class="r-main-section">
        <div class="r-main-title">Education</div>
        ${d.education.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear?` – ${esc(e.endYear)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field?`, ${esc(e.field)}`:''} ${e.gpa?`· GPA ${esc(e.gpa)}`:''}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.projects.length?`
      <div class="r-main-section">
        <div class="r-main-title">Projects</div>
        ${d.projects.map(pr=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(pr.name)}</span>
            ${pr.url?`<span class="r-item-date">${esc(pr.url)}</span>`:''}
          </div>
          <div class="r-item-sub">${esc(pr.technologies)}</div>
          <div class="r-item-desc">${esc(pr.description)}</div>
        </div>`).join('')}
      </div>`:''}
    </div>
  </div>`;
}

// --- CREATIVE ---
function creativeTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-creative">
    <div class="r-sidebar">
      <div class="r-name">${esc(p.name)||'Your Name'}</div>
      ${p.email||p.phone||p.location?`
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Contact</div>
        ${p.email?`<div class="r-contact-item">${esc(p.email)}</div>`:''}
        ${p.phone?`<div class="r-contact-item">${esc(p.phone)}</div>`:''}
        ${p.location?`<div class="r-contact-item">${esc(p.location)}</div>`:''}
        ${p.linkedin?`<div class="r-contact-item">${esc(p.linkedin)}</div>`:''}
        ${p.github?`<div class="r-contact-item">${esc(p.github)}</div>`:''}
        ${p.website?`<div class="r-contact-item">${esc(p.website)}</div>`:''}
      </div>`:''}
      ${d.skills.length?`
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Skills</div>
        ${d.skills.map(s=>`
        <div style="margin-bottom:0.5rem">
          <div style="font-size:0.78rem;color:#fff;margin-bottom:0.3rem">${esc(s.name)}</div>
          <div>${skillDots(s.level)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.certifications.length?`
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Certifications</div>
        ${d.certifications.map(c=>`<div style="font-size:0.75rem;color:rgba(255,255,255,0.85);margin-bottom:0.5rem">${esc(c.name)}<br><span style="opacity:0.65">${esc(c.issuer)}</span></div>`).join('')}
      </div>`:''}
    </div>
    <div class="r-main">
      ${p.summary?`<div class="r-main-section"><div class="r-main-title">About</div><div class="r-summary">${esc(p.summary)}</div></div>`:''}
      ${d.experience.length?`
      <div class="r-main-section">
        <div class="r-main-title">Experience</div>
        ${d.experience.map(e=>`
        <div class="r-item">
          <div class="r-item-title">${esc(e.position)}</div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-date">${esc(e.startDate)}${e.endDate?` – ${esc(e.endDate)}`:''}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.education.length?`
      <div class="r-main-section">
        <div class="r-main-title">Education</div>
        ${d.education.map(e=>`
        <div class="r-item">
          <div class="r-item-title">${esc(e.institution)}</div>
          <div class="r-item-sub">${esc(e.degree)}${e.field?`, ${esc(e.field)}`:''}</div>
          <div class="r-item-date">${esc(e.startYear)}${e.endYear?` – ${esc(e.endYear)}`:''} ${e.gpa?`· GPA ${esc(e.gpa)}`:''}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.projects.length?`
      <div class="r-main-section">
        <div class="r-main-title">Projects</div>
        ${d.projects.map(pr=>`
        <div class="r-item">
          <div class="r-item-title">${esc(pr.name)}</div>
          <div class="r-item-sub">${esc(pr.technologies)}</div>
          <div class="r-item-desc">${esc(pr.description)}</div>
          ${pr.url?`<div class="r-item-date">${esc(pr.url)}</div>`:''}
        </div>`).join('')}
      </div>`:''}
    </div>
  </div>`;
}

// --- MINIMAL ---
function minimalTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.website].filter(Boolean);
  const nameParts = (p.name||'Your Name').split(' ');
  const lastName = nameParts.pop();
  const firstName = nameParts.join(' ');
  return `
  <div class="resume-minimal">
    <div class="r-header">
      <div class="r-name"><strong>${esc(lastName)}</strong>${firstName?`, ${esc(firstName)}`:''}</div>
      <div class="r-contact">${contacts.map(c=>`<span>${esc(c)}</span>`).join('')}${p.linkedin?`<span>${esc(p.linkedin)}</span>`:''}${p.github?`<span>${esc(p.github)}</span>`:''}</div>
    </div>
    <div class="r-divider"></div>
    ${p.summary?`<div class="r-section" style="margin-bottom:1.5rem"><div class="r-section-title">Profile</div><div class="r-summary">${esc(p.summary)}</div></div>`:''}
    <div class="r-body">
      <div class="r-left">
        ${d.experience.length?`
        <div class="r-section">
          <div class="r-section-title">Experience</div>
          ${d.experience.map(e=>`
          <div class="r-item">
            <div class="r-item-header">
              <span class="r-item-title">${esc(e.position)}</span>
              <span class="r-item-date">${esc(e.startDate)}${e.endDate?`–${esc(e.endDate)}`:''}</span>
            </div>
            <div class="r-item-sub">${esc(e.company)}</div>
            <div class="r-item-desc">${esc(e.description)}</div>
          </div>`).join('')}
        </div>`:''}
        ${d.projects.length?`
        <div class="r-section">
          <div class="r-section-title">Projects</div>
          ${d.projects.map(pr=>`
          <div class="r-item">
            <div class="r-item-header">
              <span class="r-item-title">${esc(pr.name)}</span>
              ${pr.url?`<span class="r-item-date">${esc(pr.url)}</span>`:''}
            </div>
            <div class="r-item-sub">${esc(pr.technologies)}</div>
            <div class="r-item-desc">${esc(pr.description)}</div>
          </div>`).join('')}
        </div>`:''}
      </div>
      <div class="r-right">
        ${d.education.length?`
        <div class="r-section">
          <div class="r-section-title">Education</div>
          ${d.education.map(e=>`
          <div class="r-item">
            <div class="r-item-title">${esc(e.institution)}</div>
            <div class="r-item-sub">${esc(e.degree)}${e.field?` · ${esc(e.field)}`:''}</div>
            <div class="r-item-date">${esc(e.startYear)}${e.endYear?`–${esc(e.endYear)}`:''} ${e.gpa?`· ${esc(e.gpa)}`:''}</div>
          </div>`).join('')}
        </div>`:''}
        ${d.skills.length?`
        <div class="r-section">
          <div class="r-section-title">Skills</div>
          ${d.skills.map(s=>`<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}
        </div>`:''}
        ${d.certifications.length?`
        <div class="r-section">
          <div class="r-section-title">Certifications</div>
          ${d.certifications.map(c=>`<div class="r-item"><div class="r-item-title" style="font-size:0.83rem">${esc(c.name)}</div><div class="r-item-sub">${esc(c.issuer)} ${c.year?`· ${esc(c.year)}`:''}</div></div>`).join('')}
        </div>`:''}
      </div>
    </div>
  </div>`;
}

// --- EXECUTIVE ---
function executiveTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin].filter(Boolean);
  return `
  <div class="resume-executive">
    <div class="r-header">
      <div class="r-name">${esc(p.name)||'Your Name'}</div>
      <div class="r-role">${d.experience[0]?.position||'Senior Professional'}</div>
      <div class="r-contact">${contacts.map(c=>`<span>${esc(c)}</span>`).join('')}</div>
    </div>
    <div class="r-body">
      ${p.summary?`<div class="r-summary">${esc(p.summary)}</div>`:''}
      ${d.experience.length?`
      <div class="r-section">
        <div class="r-section-title">Professional Experience</div>
        ${d.experience.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.position)}</span>
            <span class="r-item-date">${esc(e.startDate)}${e.endDate?` – ${esc(e.endDate)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.education.length?`
      <div class="r-section">
        <div class="r-section-title">Education</div>
        ${d.education.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear?` – ${esc(e.endYear)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field?`, ${esc(e.field)}`:''} ${e.gpa?`| GPA: ${esc(e.gpa)}`:''}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.skills.length?`
      <div class="r-section">
        <div class="r-section-title">Core Competencies</div>
        <div>${d.skills.map(s=>`<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}</div>
      </div>`:''}
      ${d.projects.length?`
      <div class="r-section">
        <div class="r-section-title">Key Projects</div>
        ${d.projects.map(pr=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(pr.name)}</span>
            ${pr.url?`<span class="r-item-date">${esc(pr.url)}</span>`:''}
          </div>
          <div class="r-item-sub">${esc(pr.technologies)}</div>
          <div class="r-item-desc">${esc(pr.description)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.certifications.length?`
      <div class="r-section">
        <div class="r-section-title">Certifications & Awards</div>
        <div>${d.certifications.map(c=>`<span class="r-skill-tag">${esc(c.name)}${c.year?` (${esc(c.year)})`:''}</span>`).join('')}</div>
      </div>`:''}
    </div>
  </div>`;
}

// --- TECH PRO ---
function techproTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-techpro">
    <div class="r-sidebar">
      <div class="r-name">${esc(p.name)||'Your Name'}</div>
      <div class="r-role">${d.experience[0]?.position||'$ developer'}</div>
      ${p.email||p.phone||p.location?`
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Contact</div>
        ${p.email?`<div class="r-contact-item">${esc(p.email)}</div>`:''}
        ${p.phone?`<div class="r-contact-item">${esc(p.phone)}</div>`:''}
        ${p.location?`<div class="r-contact-item">${esc(p.location)}</div>`:''}
        ${p.linkedin?`<div class="r-contact-item">${esc(p.linkedin)}</div>`:''}
        ${p.github?`<div class="r-contact-item">${esc(p.github)}</div>`:''}
        ${p.website?`<div class="r-contact-item">${esc(p.website)}</div>`:''}
      </div>`:''}
      ${d.skills.length?`
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Tech Stack</div>
        <div>${d.skills.map(s=>`<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}</div>
      </div>`:''}
      ${d.certifications.length?`
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Certifications</div>
        ${d.certifications.map(c=>`<div style="margin-bottom:0.5rem"><div style="font-size:0.75rem;color:#e2e8f0">${esc(c.name)}</div><div style="font-size:0.7rem;color:#64748b">${esc(c.issuer)} ${c.year?`· ${esc(c.year)}`:''}</div></div>`).join('')}
      </div>`:''}
    </div>
    <div class="r-main">
      ${p.summary?`<div class="r-main-section"><div class="r-main-title">About</div><div class="r-summary">${esc(p.summary)}</div></div>`:''}
      ${d.experience.length?`
      <div class="r-main-section">
        <div class="r-main-title">Experience</div>
        ${d.experience.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.position)}</span>
            <span class="r-item-date">${esc(e.startDate)}${e.endDate?` → ${esc(e.endDate)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.projects.length?`
      <div class="r-main-section">
        <div class="r-main-title">Projects</div>
        ${d.projects.map(pr=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(pr.name)}</span>
            ${pr.url?`<span class="r-item-date">${esc(pr.url)}</span>`:''}
          </div>
          <div class="r-item-sub">${esc(pr.technologies)}</div>
          <div class="r-item-desc">${esc(pr.description)}</div>
        </div>`).join('')}
      </div>`:''}
      ${d.education.length?`
      <div class="r-main-section">
        <div class="r-main-title">Education</div>
        ${d.education.map(e=>`
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear?` → ${esc(e.endYear)}`:''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field?` · ${esc(e.field)}`:''} ${e.gpa?`· GPA ${esc(e.gpa)}`:''}</div>
        </div>`).join('')}
      </div>`:''}
    </div>
  </div>`;
}

// ============================================
//  PAGE: ATS SCORE TESTER
// ============================================
function renderATS() {
  const score = computeATSScore(state.resume, '');
  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page ats-page">
    <nav class="top-nav">
      <button class="btn-back" data-nav="home">← Home</button>
      <span class="logo">ATS Score Tester</span>
      <button class="btn-primary" data-nav="editor">Fix Issues →</button>
    </nav>
    <div class="ats-layout">

      <!-- LEFT: Score + Job Desc -->
      <div class="ats-left animate-in">
        <!-- Big Score Ring -->
        <div class="ats-score-card">
          <div class="ats-ring-wrap">
            <svg class="ats-ring" viewBox="0 0 140 140" width="140" height="140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
              <circle cx="70" cy="70" r="58" fill="none"
                stroke="${scoreColor(score.total)}"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${2*Math.PI*58}"
                stroke-dashoffset="${2*Math.PI*58 * (1 - score.total/100)}"
                transform="rotate(-90 70 70)"
                id="ats-ring-circle"
                style="transition: stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1); filter: drop-shadow(0 0 8px ${scoreColor(score.total)})"/>
            </svg>
            <div class="ats-ring-label">
              <div class="ats-score-num" id="ats-score-num">0</div>
              <div class="ats-score-sub">/ 100</div>
            </div>
          </div>
          <div class="ats-grade-badge" style="background:${scoreGradient(score.total)}">
            ${scoreGrade(score.total)}
          </div>
          <div class="ats-score-msg">${scoreMessage(score.total)}</div>
        </div>

        <!-- Job Description Matcher -->
        <div class="ats-jd-card">
          <div class="ats-jd-header">
            <span class="ats-section-icon">📋</span>
            <div>
              <div class="ats-card-title">Job Description Matcher</div>
              <div class="ats-card-sub">Paste a job posting to check keyword alignment</div>
            </div>
          </div>
          <textarea id="ats-jd-input" class="ats-jd-textarea" placeholder="Paste job description here to match keywords...&#10;&#10;Example: 'We are looking for a software engineer with experience in React, Node.js, Python, and AWS...'"></textarea>
          <div class="ats-jd-stats" id="ats-jd-stats" style="display:none">
            <div class="ats-jd-stat matched" id="ats-matched-count">0 Matched</div>
            <div class="ats-jd-stat missing" id="ats-missing-count">0 Missing</div>
          </div>
          <div id="ats-keyword-chips" class="ats-keyword-chips"></div>
        </div>
      </div>

      <!-- RIGHT: Category Breakdown + Tips -->
      <div class="ats-right animate-in" style="animation-delay:0.12s">
        <!-- Category Bars -->
        <div class="ats-categories-card">
          <div class="ats-card-title" style="margin-bottom:1.25rem">Score Breakdown</div>
          ${score.categories.map((cat, i) => `
          <div class="ats-cat-row" style="animation-delay:${0.1 + i*0.07}s">
            <div class="ats-cat-header">
              <span class="ats-cat-icon">${cat.icon}</span>
              <span class="ats-cat-name">${cat.name}</span>
              <span class="ats-cat-pts" style="color:${scoreColor(cat.pct)}">${cat.earned}/${cat.max}</span>
            </div>
            <div class="ats-cat-bar-bg">
              <div class="ats-cat-bar-fill" style="width:0%;background:${scoreColor(cat.pct)}" data-target="${cat.pct}"></div>
            </div>
            ${cat.tip ? `<div class="ats-cat-tip">${cat.tip}</div>` : ''}
          </div>`).join('')}
        </div>

        <!-- Action Tips -->
        <div class="ats-tips-card">
          <div class="ats-card-title" style="margin-bottom:1rem">💡 Improvement Tips</div>
          <div class="ats-tips-list" id="ats-tips-list">
            ${score.tips.map((tip, i) => `
            <div class="ats-tip-item ${tip.type}" style="animation-delay:${i*0.06}s">
              <span class="ats-tip-icon">${tipIcon(tip.type)}</span>
              <span class="ats-tip-text">${tip.text}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="ats-actions-row">
          <button class="btn-primary" data-nav="editor" style="flex:1">✏️ Edit Resume</button>
          <button class="btn-download" id="ats-download-btn" style="flex:1;justify-content:center">⬇ Download PDF</button>
        </div>
      </div>
    </div>
  </div>`;
}

function bindATSEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Animate score counter
  animateScore(computeATSScore(state.resume, '').total);
  // Animate bar fills
  setTimeout(() => {
    document.querySelectorAll('.ats-cat-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 200);

  // JD Matcher - live update
  const jdInput = document.getElementById('ats-jd-input');
  jdInput?.addEventListener('input', debounce(() => {
    const jd = jdInput.value.trim();
    const score = computeATSScore(state.resume, jd);
    // Update total score
    updateScoreDisplay(score);
    // Update keyword chips
    if (jd) {
      renderKeywordChips(score.jdMatch);
      document.getElementById('ats-jd-stats').style.display = 'flex';
      document.getElementById('ats-matched-count').textContent = score.jdMatch.matched.length + ' Matched';
      document.getElementById('ats-missing-count').textContent = score.jdMatch.missing.length + ' Missing';
    } else {
      document.getElementById('ats-keyword-chips').innerHTML = '';
      document.getElementById('ats-jd-stats').style.display = 'none';
    }
    // Update tips
    document.getElementById('ats-tips-list').innerHTML = score.tips.map((tip, i) =>
      `<div class="ats-tip-item ${tip.type}" style="animation-delay:${i*0.05}s">
        <span class="ats-tip-icon">${tipIcon(tip.type)}</span>
        <span class="ats-tip-text">${tip.text}</span>
      </div>`).join('');
    // Update category bars
    document.querySelectorAll('.ats-cat-bar-fill').forEach((bar, idx) => {
      bar.style.width = score.categories[idx]?.pct + '%';
    });
  }, 400));

  // Download button
  document.getElementById('ats-download-btn')?.addEventListener('click', triggerDownload);
}

function animateScore(target) {
  const el = document.getElementById('ats-score-num');
  if (!el) return;
  const start = performance.now();
  const duration = 1200;
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

function updateScoreDisplay(score) {
  const el = document.getElementById('ats-score-num');
  if (el) el.textContent = score.total;
  const circle = document.getElementById('ats-ring-circle');
  if (circle) {
    const circ = 2 * Math.PI * 58;
    circle.style.strokeDashoffset = circ * (1 - score.total / 100);
    circle.setAttribute('stroke', scoreColor(score.total));
  }
}

function renderKeywordChips(jdMatch) {
  const container = document.getElementById('ats-keyword-chips');
  if (!container) return;
  const matchedHTML = jdMatch.matched.map(k =>
    `<span class="kw-chip matched">✓ ${k}</span>`).join('');
  const missingHTML = jdMatch.missing.slice(0, 12).map(k =>
    `<span class="kw-chip missing">✕ ${k}</span>`).join('');
  container.innerHTML = matchedHTML + missingHTML;
}

// -------- ATS SCORING ENGINE --------
function computeATSScore(resume, jobDesc) {
  const p = resume.personal;
  const tips = [];
  const categories = [];

  // 1. CONTACT INFO (15 pts)
  let contact = 0;
  if (p.name?.trim())     contact += 3;
  if (p.email?.trim())    contact += 3;
  if (p.phone?.trim())    contact += 3;
  if (p.location?.trim()) contact += 2;
  if (p.linkedin?.trim()) contact += 2;
  if (p.github?.trim() || p.website?.trim()) contact += 2;
  const contactTip = contact < 15 ? '→ Add ' + [!p.name&&'name',!p.email&&'email',!p.phone&&'phone',!p.location&&'location',!p.linkedin&&'LinkedIn'].filter(Boolean).join(', ') : '';
  categories.push({ name:'Contact Info', icon:'👤', earned:contact, max:15, pct:Math.round(contact/15*100), tip:contactTip||'' });
  if (contact < 10) tips.push({ type:'error', text:'Contact info is incomplete. Add email, phone, and LinkedIn profile.' });
  else if (contact < 15) tips.push({ type:'warn', text:'Add LinkedIn or GitHub/portfolio URL to boost recruiter trust.' });

  // 2. PROFESSIONAL SUMMARY (15 pts)
  let summary = 0;
  const sumText = p.summary || '';
  const sumWords = sumText.split(/\s+/).filter(Boolean).length;
  if (sumText.trim()) summary += 4;
  if (sumWords >= 30)  summary += 4;
  if (sumWords >= 60)  summary += 3;
  const sumActionVerbs = countActionVerbs(sumText);
  if (sumActionVerbs >= 1) summary += 2;
  if (sumActionVerbs >= 2) summary += 2;
  categories.push({ name:'Professional Summary', icon:'📝', earned:summary, max:15, pct:Math.round(summary/15*100), tip: !sumText.trim() ? '→ Add a professional summary — it\'s the first thing ATS and recruiters read.' : sumWords < 30 ? `→ Expand your summary (${sumWords} words). Aim for 40–80 words with action verbs.` : '' });
  if (!sumText.trim()) tips.push({ type:'error', text:'No professional summary found. Add a 40–80 word summary with keywords.' });
  else if (sumWords < 30) tips.push({ type:'warn', text:`Your summary is short (${sumWords} words). Aim for 40–80 words.` });
  else tips.push({ type:'success', text:'Great summary! Well-written intro increases recruiter engagement by 40%.' });

  // 3. WORK EXPERIENCE (25 pts)
  let exp = 0;
  const exps = resume.experience;
  if (exps.length >= 1) exp += 5;
  if (exps.length >= 2) exp += 4;
  if (exps.length >= 3) exp += 3;
  let totalExpWords = 0;
  let totalActionVerbs = 0;
  let hasQuantified = false;
  exps.forEach(e => {
    const desc = e.description || '';
    const words = desc.split(/\s+/).filter(Boolean).length;
    totalExpWords += words;
    totalActionVerbs += countActionVerbs(desc);
    if (/\d+%|\d+x|\$\d+|\d+\s*(million|thousand|users|clients|projects|teams|members)/i.test(desc)) hasQuantified = true;
  });
  if (totalExpWords >= 60)  exp += 5;
  if (totalActionVerbs >= 3) exp += 4;
  if (hasQuantified)         exp += 4;
  categories.push({ name:'Work Experience', icon:'💼', earned:Math.min(exp,25), max:25, pct:Math.round(Math.min(exp,25)/25*100),
    tip: exps.length === 0 ? '→ Add at least one work experience entry.' :
         !hasQuantified ? '→ Add quantified achievements (e.g. "increased revenue by 25%")' : '' });
  if (exps.length === 0) tips.push({ type:'error', text:'No work experience found. Add internships, jobs, or volunteer work.' });
  else if (!hasQuantified) tips.push({ type:'warn', text:'Use numbers in experience descriptions — e.g. "improved speed by 30%".' });
  else tips.push({ type:'success', text:'Quantified achievements detected! This significantly boosts your ATS score.' });
  if (totalActionVerbs < 3 && exps.length > 0) tips.push({ type:'warn', text:'Use strong action verbs: Led, Built, Improved, Achieved, Delivered, Managed.' });

  // 4. EDUCATION (10 pts)
  let edu = 0;
  const edus = resume.education;
  if (edus.length >= 1) { edu += 5; }
  if (edus[0]?.degree?.trim())  edu += 2;
  if (edus[0]?.field?.trim())   edu += 2;
  if (edus[0]?.endYear?.trim()) edu += 1;
  categories.push({ name:'Education', icon:'🎓', earned:edu, max:10, pct:Math.round(edu/10*100),
    tip: edus.length === 0 ? '→ Add your education details (degree, institution, year).' : '' });
  if (edus.length === 0) tips.push({ type:'error', text:'No education section found. Add your school and degree details.' });

  // 5. SKILLS (15 pts)
  let skills = 0;
  const skillCount = resume.skills.length;
  if (skillCount >= 1)  skills += 3;
  if (skillCount >= 4)  skills += 4;
  if (skillCount >= 7)  skills += 4;
  if (skillCount >= 10) skills += 4;
  categories.push({ name:'Skills', icon:'⚡', earned:Math.min(skills,15), max:15, pct:Math.round(Math.min(skills,15)/15*100),
    tip: skillCount === 0 ? '→ Add at least 6–10 relevant skills.' :
         skillCount < 6  ? `→ You have ${skillCount} skills. Aim for 8–12 for best ATS matching.` : '' });
  if (skillCount === 0) tips.push({ type:'error', text:'No skills listed. Add 8–12 relevant technical and soft skills.' });
  else if (skillCount < 6) tips.push({ type:'warn', text:`Only ${skillCount} skills listed. Add more (target 8–12) to match job requirements.` });
  else tips.push({ type:'success', text:`${skillCount} skills listed — good coverage for ATS keyword matching.` });

  // 6. PROJECTS (10 pts)
  let proj = 0;
  const projs = resume.projects;
  if (projs.length >= 1) proj += 5;
  if (projs.length >= 2) proj += 3;
  if (projs[0]?.technologies?.trim()) proj += 2;
  categories.push({ name:'Projects', icon:'🚀', earned:Math.min(proj,10), max:10, pct:Math.round(Math.min(proj,10)/10*100),
    tip: projs.length === 0 ? '→ Add 1–2 projects with technologies used and measurable outcomes.' : '' });
  if (projs.length === 0) tips.push({ type:'warn', text:'Add personal projects — they show initiative and real-world skills.' });

  // 7. CERTIFICATIONS (5 pts bonus)
  let certs = 0;
  if (resume.certifications.length >= 1) certs += 3;
  if (resume.certifications.length >= 2) certs += 2;
  categories.push({ name:'Certifications', icon:'🏆', earned:Math.min(certs,5), max:5, pct:Math.round(Math.min(certs,5)/5*100),
    tip: resume.certifications.length === 0 ? '→ Add relevant certifications to stand out.' : '' });
  if (resume.certifications.length === 0) tips.push({ type:'info', text:'Certifications (AWS, Google, etc.) add credibility and ATS keyword matches.' });

  // 8. JD KEYWORD MATCH
  let jdMatch = { matched: [], missing: [], score: 0 };
  if (jobDesc.trim()) {
    jdMatch = matchJobKeywords(resume, jobDesc);
    const jdBonus = Math.round(jdMatch.matchPct * 5);
    tips.push({ type: jdMatch.matchPct > 0.5 ? 'success' : 'warn',
      text: `Job match: ${jdMatch.matched.length} of ${jdMatch.matched.length + jdMatch.missing.length} keywords found (${Math.round(jdMatch.matchPct*100)}%). ${jdMatch.missing.length > 0 ? 'Missing: ' + jdMatch.missing.slice(0,3).join(', ') + (jdMatch.missing.length>3?'…':'') + '.' : ''}` });
  }

  const rawTotal = Math.min(contact + summary + Math.min(exp,25) + edu + Math.min(skills,15) + Math.min(proj,10) + Math.min(certs,5), 95);
  const jdBonus = jobDesc.trim() ? Math.round(jdMatch.matchPct * 5) : 0;
  const total = Math.min(rawTotal + jdBonus, 100);

  return { total, categories, tips, jdMatch };
}

function countActionVerbs(text) {
  const verbs = ['led','built','developed','created','designed','managed','improved','increased','decreased','delivered','launched','implemented','architected','scaled','optimized','reduced','achieved','collaborated','mentored','analyzed','generated','automated','deployed','maintained','contributed','spearheaded','streamlined','enhanced','accelerated','transformed'];
  const lower = text.toLowerCase();
  return verbs.filter(v => new RegExp(`\\b${v}`, 'i').test(lower)).length;
}

function matchJobKeywords(resume, jd) {
  const jdLower = jd.toLowerCase();
  const allResumeText = [
    resume.personal.summary,
    ...resume.experience.map(e => `${e.position} ${e.company} ${e.description}`),
    ...resume.skills.map(s => s.name),
    ...resume.projects.map(p => `${p.name} ${p.technologies} ${p.description}`),
    ...resume.certifications.map(c => `${c.name} ${c.issuer}`)
  ].join(' ').toLowerCase();

  // Extract meaningful keywords from JD
  const stopWords = new Set(['the','and','or','of','in','to','a','an','for','with','is','are','be','by','we','our','you','your','as','on','at','from','that','this','will','can','have','has','must','we\'re','you\'ll','including','experience','required','preferred','ability','strong','excellent','good','well','role','team','work','years','year','minimum','plus']);
  const jdWords = jdLower.match(/\b[a-z][a-z.+#\-]{2,}\b/g) || [];
  const freq = {};
  jdWords.forEach(w => { if (!stopWords.has(w)) freq[w] = (freq[w]||0)+1; });
  const keywords = Object.entries(freq).filter(([,c])=>c>=1).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([k])=>k);

  const matched = keywords.filter(k => allResumeText.includes(k));
  const missing = keywords.filter(k => !allResumeText.includes(k));
  const matchPct = keywords.length > 0 ? matched.length / keywords.length : 0;
  return { matched, missing, matchPct };
}

function scoreColor(pct) {
  if (pct >= 80) return '#10b981';
  if (pct >= 60) return '#f59e0b';
  if (pct >= 40) return '#f97316';
  return '#ef4444';
}
function scoreGradient(pct) {
  if (pct >= 80) return 'linear-gradient(135deg,#10b981,#059669)';
  if (pct >= 60) return 'linear-gradient(135deg,#f59e0b,#d97706)';
  if (pct >= 40) return 'linear-gradient(135deg,#f97316,#ea580c)';
  return 'linear-gradient(135deg,#ef4444,#dc2626)';
}
function scoreGrade(pct) {
  if (pct >= 90) return '🏆 Excellent';
  if (pct >= 80) return '✅ Strong';
  if (pct >= 70) return '👍 Good';
  if (pct >= 60) return '⚠️ Fair';
  if (pct >= 40) return '📉 Weak';
  return '🚨 Poor';
}
function scoreMessage(pct) {
  if (pct >= 90) return 'Outstanding! Your resume is highly optimized for ATS systems.';
  if (pct >= 80) return 'Strong resume! Minor improvements can push it to excellent.';
  if (pct >= 70) return 'Good foundation. Address the tips below to boost your score.';
  if (pct >= 60) return 'Fair score. Several key sections need attention.';
  if (pct >= 40) return 'Needs work. Follow the tips below to significantly improve.';
  return 'Critical issues found. Your resume needs major improvements to pass ATS.';
}
function tipIcon(type) {
  return { success:'✅', warn:'⚠️', error:'🚨', info:'💡' }[type] || '•';
}

// ============================================
//  UTILITIES
// ============================================
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const icons = { success: '✓', info: 'ℹ', error: '✕' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]||''}</span> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================
//  INIT
// ============================================
state.template = loadTemplate();
render();
