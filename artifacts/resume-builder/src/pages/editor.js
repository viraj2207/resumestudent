import { navigate } from '../router.js';
import { state } from '../state.js';
import { TEMPLATES, SKILL_LEVELS } from '../data/config.js';
import { getResumeHTML } from '../templates/index.js';
import { saveResume } from '../utils/storage.js';
import { esc, debounce, showToast } from '../utils/helpers.js';

export function renderEditor() {
  const sectionContent = renderEditorSection(state.activeSection);
  const tabs = ['personal', 'experience', 'education', 'skills', 'projects', 'certifications'];
  const tabLabels = { personal: 'Personal', experience: 'Experience', education: 'Education', skills: 'Skills', projects: 'Projects', certifications: 'Certs' };

  const tabsHTML = tabs.map(t =>
    `<button class="section-tab ${state.activeSection === t ? 'active' : ''}" data-section="${t}">${tabLabels[t]}</button>`
  ).join('');

  const chipHTML = TEMPLATES.map(t =>
    `<button class="tpl-chip ${state.template === t.id ? 'active' : ''}" data-tpl="${t.id}">${t.name}</button>`
  ).join('');

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
  switch (section) {
    case 'personal':       return renderPersonalForm();
    case 'experience':     return renderExperienceForm();
    case 'education':      return renderEducationForm();
    case 'skills':         return renderSkillsForm();
    case 'projects':       return renderProjectsForm();
    case 'certifications': return renderCertificationsForm();
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
    <textarea data-field="personal.summary" rows="4" placeholder="Write a compelling 2-3 sentence summary...">${esc(p.summary)}</textarea>
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
        <input type="text" data-exp="${i}.endDate" value="${esc(e.current ? 'Present' : e.endDate)}" placeholder="Present">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea data-exp="${i}.description" rows="3" placeholder="Key achievements and responsibilities...">${esc(e.description)}</textarea>
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
      ${SKILL_LEVELS.map(l => `<option value="${l}" ${s.level === l ? 'selected' : ''}>${l}</option>`).join('')}
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
      <textarea data-proj="${i}.description" rows="3" placeholder="Describe what you built and its impact...">${esc(p.description)}</textarea>
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

export function bindEditorEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  document.querySelectorAll('.tpl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.template = chip.dataset.tpl;
      document.querySelectorAll('.tpl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      refreshPreview();
    });
  });

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

  document.getElementById('btn-clear')?.addEventListener('click', () => {
    if (confirm('Clear all resume data and start fresh?')) {
      state.resume = {
        personal: { name: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '', summary: '' },
        experience: [], education: [], skills: [], projects: [], certifications: []
      };
      saveResume(state);
      navigate('editor');
    }
  });

  bindDynamicEvents();

  document.getElementById('form-section')?.addEventListener('input', debounce(() => {
    collectFormData();
    refreshPreview();
    saveResume(state);
  }, 300));
}

function bindDynamicEvents() {
  const fs = document.getElementById('form-section');
  if (!fs) return;

  fs.querySelector('#btn-add-exp')?.addEventListener('click', () => {
    collectFormData();
    state.resume.experience.push({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });
    fs.innerHTML = renderEditorSection('experience');
    bindDynamicEvents();
  });
  fs.querySelectorAll('[data-remove-exp]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.experience.splice(parseInt(btn.dataset.removeExp), 1);
      fs.innerHTML = renderEditorSection('experience');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  fs.querySelector('#btn-add-edu')?.addEventListener('click', () => {
    collectFormData();
    state.resume.education.push({ institution: '', degree: '', field: '', startYear: '', endYear: '', gpa: '' });
    fs.innerHTML = renderEditorSection('education');
    bindDynamicEvents();
  });
  fs.querySelectorAll('[data-remove-edu]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.education.splice(parseInt(btn.dataset.removeEdu), 1);
      fs.innerHTML = renderEditorSection('education');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  fs.querySelector('#btn-add-skill')?.addEventListener('click', () => {
    collectFormData();
    state.resume.skills.push({ name: '', level: 'Intermediate' });
    fs.innerHTML = renderEditorSection('skills');
    bindDynamicEvents();
  });
  fs.querySelectorAll('[data-remove-skill]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.skills.splice(parseInt(btn.dataset.removeSkill), 1);
      fs.innerHTML = renderEditorSection('skills');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  fs.querySelector('#btn-add-proj')?.addEventListener('click', () => {
    collectFormData();
    state.resume.projects.push({ name: '', technologies: '', description: '', url: '' });
    fs.innerHTML = renderEditorSection('projects');
    bindDynamicEvents();
  });
  fs.querySelectorAll('[data-remove-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.projects.splice(parseInt(btn.dataset.removeProj), 1);
      fs.innerHTML = renderEditorSection('projects');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  fs.querySelector('#btn-add-cert')?.addEventListener('click', () => {
    collectFormData();
    state.resume.certifications.push({ name: '', issuer: '', year: '' });
    fs.innerHTML = renderEditorSection('certifications');
    bindDynamicEvents();
  });
  fs.querySelectorAll('[data-remove-cert]').forEach(btn => {
    btn.addEventListener('click', () => {
      collectFormData();
      state.resume.certifications.splice(parseInt(btn.dataset.removeCert), 1);
      fs.innerHTML = renderEditorSection('certifications');
      bindDynamicEvents();
      refreshPreview();
    });
  });

  fs.addEventListener('input', debounce(() => {
    collectFormData();
    refreshPreview();
    saveResume(state);
  }, 350));
}

function collectFormData() {
  const fs = document.getElementById('form-section');
  if (!fs) return;

  fs.querySelectorAll('[data-field]').forEach(el => {
    const path = el.dataset.field.split('.');
    let obj = state.resume;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = el.value;
  });

  fs.querySelectorAll('[data-exp]').forEach(el => {
    const [idx, key] = el.dataset.exp.split('.');
    if (state.resume.experience[idx]) {
      state.resume.experience[idx][key] = el.value;
      if (key === 'endDate') state.resume.experience[idx].current = el.value.toLowerCase() === 'present';
    }
  });

  fs.querySelectorAll('[data-edu]').forEach(el => {
    const [idx, key] = el.dataset.edu.split('.');
    if (state.resume.education[idx]) state.resume.education[idx][key] = el.value;
  });

  fs.querySelectorAll('[data-skill]').forEach(el => {
    const [idx, key] = el.dataset.skill.split('.');
    if (state.resume.skills[idx]) state.resume.skills[idx][key] = el.value;
  });

  fs.querySelectorAll('[data-proj]').forEach(el => {
    const [idx, key] = el.dataset.proj.split('.');
    if (state.resume.projects[idx]) state.resume.projects[idx][key] = el.value;
  });

  fs.querySelectorAll('[data-cert]').forEach(el => {
    const [idx, key] = el.dataset.cert.split('.');
    if (state.resume.certifications[idx]) state.resume.certifications[idx][key] = el.value;
  });
}

function refreshPreview() {
  const lp = document.getElementById('live-preview');
  if (lp) lp.innerHTML = getResumeHTML(state.template, state.resume);
}
