import { esc } from '../utils/helpers.js';

export function techproTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-techpro">
    <div class="r-sidebar">
      <div class="r-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-role">${d.experience[0]?.position || '$ developer'}</div>
      ${p.email || p.phone || p.location ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Contact</div>
        ${p.email    ? `<div class="r-contact-item">${esc(p.email)}</div>` : ''}
        ${p.phone    ? `<div class="r-contact-item">${esc(p.phone)}</div>` : ''}
        ${p.location ? `<div class="r-contact-item">${esc(p.location)}</div>` : ''}
        ${p.linkedin ? `<div class="r-contact-item">${esc(p.linkedin)}</div>` : ''}
        ${p.github   ? `<div class="r-contact-item">${esc(p.github)}</div>` : ''}
        ${p.website  ? `<div class="r-contact-item">${esc(p.website)}</div>` : ''}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Tech Stack</div>
        <div>${d.skills.map(s => `<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Certifications</div>
        ${d.certifications.map(c => `
        <div style="margin-bottom:0.5rem">
          <div style="font-size:0.75rem;color:#e2e8f0">${esc(c.name)}</div>
          <div style="font-size:0.7rem;color:#64748b">${esc(c.issuer)} ${c.year ? `· ${esc(c.year)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
    </div>
    <div class="r-main">
      ${p.summary ? `<div class="r-main-section"><div class="r-main-title">About</div><div class="r-summary">${esc(p.summary)}</div></div>` : ''}
      ${d.experience.length ? `
      <div class="r-main-section">
        <div class="r-main-title">Experience</div>
        ${d.experience.map(e => `
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.position)}</span>
            <span class="r-item-date">${esc(e.startDate)}${e.endDate ? ` → ${esc(e.endDate)}` : ''}</span>
          </div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-main-section">
        <div class="r-main-title">Projects</div>
        ${d.projects.map(pr => `
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(pr.name)}</span>
            ${pr.url ? `<span class="r-item-date">${esc(pr.url)}</span>` : ''}
          </div>
          <div class="r-item-sub">${esc(pr.technologies)}</div>
          <div class="r-item-desc">${esc(pr.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-main-section">
        <div class="r-main-title">Education</div>
        ${d.education.map(e => `
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear ? ` → ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field ? ` · ${esc(e.field)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </div>`;
}
