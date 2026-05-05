import { esc } from '../utils/helpers.js';

export function startupTemplate(d) {
  const p = d.personal;
  const levelColor = { Beginner: '#f59e0b', Intermediate: '#06b6d4', Advanced: '#8b5cf6', Expert: '#10b981' };
  return `
  <div class="resume-startup">
    <div class="r-startup-header">
      <div class="r-startup-avatar">${(p.name || '?').charAt(0).toUpperCase()}</div>
      <div>
        <div class="r-startup-name">${esc(p.name) || 'Your Name'}</div>
        <div class="r-startup-role">${d.experience[0]?.position || 'Professional'}</div>
        <div class="r-startup-contacts">
          ${[p.email, p.phone, p.location].filter(Boolean).map(c => `<span class="r-startup-contact">${esc(c)}</span>`).join('')}
        </div>
      </div>
      <div class="r-startup-links">
        ${p.linkedin ? `<div class="r-startup-link">🔗 ${esc(p.linkedin)}</div>` : ''}
        ${p.github   ? `<div class="r-startup-link">⌥ ${esc(p.github)}</div>` : ''}
        ${p.website  ? `<div class="r-startup-link">🌐 ${esc(p.website)}</div>` : ''}
      </div>
    </div>
    <div class="r-startup-body">
      ${p.summary ? `<div class="r-startup-card"><div class="r-startup-section-title">👋 About Me</div><p class="r-startup-text">${esc(p.summary)}</p></div>` : ''}
      <div class="r-startup-grid">
        <div>
          ${d.experience.length ? `
          <div class="r-startup-card">
            <div class="r-startup-section-title">💼 Experience</div>
            ${d.experience.map(e => `
            <div class="r-startup-item">
              <div class="r-startup-item-title">${esc(e.position)}</div>
              <div class="r-startup-item-sub">${esc(e.company)} · <span style="color:#9ca3af">${esc(e.startDate)}${e.endDate ? `–${esc(e.endDate)}` : ''}</span></div>
              <div class="r-startup-text">${esc(e.description)}</div>
            </div>`).join('')}
          </div>` : ''}
          ${d.projects.length ? `
          <div class="r-startup-card">
            <div class="r-startup-section-title">🚀 Projects</div>
            ${d.projects.map(pr => `
            <div class="r-startup-item">
              <div class="r-startup-item-title">${esc(pr.name)} ${pr.url ? `<span style="font-size:0.72rem;color:#6366f1">${esc(pr.url)}</span>` : ''}</div>
              <div class="r-startup-text">${esc(pr.description)}</div>
              <div style="margin-top:0.3rem">${pr.technologies.split(',').map(t => `<span class="r-startup-badge" style="background:rgba(99,102,241,0.1);color:#6366f1;border-color:rgba(99,102,241,0.3)">${t.trim()}</span>`).join('')}</div>
            </div>`).join('')}
          </div>` : ''}
        </div>
        <div>
          ${d.skills.length ? `
          <div class="r-startup-card">
            <div class="r-startup-section-title">⚡ Skills</div>
            <div class="r-startup-skills">${d.skills.map(s => `<span class="r-startup-badge" style="background:${levelColor[s.level] || '#6366f1'}18;color:${levelColor[s.level] || '#6366f1'};border-color:${levelColor[s.level] || '#6366f1'}44">${esc(s.name)}</span>`).join('')}</div>
          </div>` : ''}
          ${d.education.length ? `
          <div class="r-startup-card">
            <div class="r-startup-section-title">🎓 Education</div>
            ${d.education.map(e => `
            <div class="r-startup-item">
              <div class="r-startup-item-title">${esc(e.institution)}</div>
              <div class="r-startup-item-sub">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''}</div>
              <div style="font-size:0.75rem;color:#9ca3af">${esc(e.startYear)}${e.endYear ? `–${esc(e.endYear)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
            </div>`).join('')}
          </div>` : ''}
          ${d.certifications.length ? `
          <div class="r-startup-card">
            <div class="r-startup-section-title">🏆 Certs</div>
            ${d.certifications.map(c => `
            <div class="r-startup-item">
              <div class="r-startup-item-title">${esc(c.name)}</div>
              <div class="r-startup-item-sub">${esc(c.issuer)} ${c.year ? `· ${esc(c.year)}` : ''}</div>
            </div>`).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}
