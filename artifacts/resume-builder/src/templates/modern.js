import { esc, skillPct } from '../utils/helpers.js';

export function modernTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-modern">
    <div class="r-sidebar">
      <div class="r-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-role">${d.experience[0]?.position || 'Professional'}</div>
      ${p.email || p.phone || p.location ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Contact</div>
        ${p.email    ? `<div class="r-contact-item">✉ ${esc(p.email)}</div>` : ''}
        ${p.phone    ? `<div class="r-contact-item">☎ ${esc(p.phone)}</div>` : ''}
        ${p.location ? `<div class="r-contact-item">📍 ${esc(p.location)}</div>` : ''}
        ${p.linkedin ? `<div class="r-contact-item">in ${esc(p.linkedin)}</div>` : ''}
        ${p.github   ? `<div class="r-contact-item">⌥ ${esc(p.github)}</div>` : ''}
        ${p.website  ? `<div class="r-contact-item">🌐 ${esc(p.website)}</div>` : ''}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Skills</div>
        ${d.skills.map(s => `
        <div class="r-skill-row">
          <div class="r-skill-label">
            <span>${esc(s.name)}</span>
            <span style="opacity:0.6;font-size:0.7rem">${s.level || ''}</span>
          </div>
          <div class="r-skill-bar"><div class="r-skill-fill" style="width:${skillPct(s.level)}%"></div></div>
        </div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-sidebar-section">
        <div class="r-sidebar-title">Certifications</div>
        ${d.certifications.map(c => `
        <div class="r-contact-item" style="margin-bottom:0.6rem">
          <strong style="color:#fff">${esc(c.name)}</strong><br>
          ${esc(c.issuer)} ${c.year ? `· ${esc(c.year)}` : ''}
        </div>`).join('')}
      </div>` : ''}
    </div>
    <div class="r-main">
      ${p.summary ? `<div class="r-main-section"><div class="r-main-title">Profile</div><div class="r-summary">${esc(p.summary)}</div></div>` : ''}
      ${d.experience.length ? `
      <div class="r-main-section">
        <div class="r-main-title">Experience</div>
        ${d.experience.map(e => `
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.position)}</span>
            <span class="r-item-date">${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ''}</span>
          </div>
          <div class="r-item-sub">${esc(e.company)}</div>
          <div class="r-item-desc">${esc(e.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-main-section">
        <div class="r-main-title">Education</div>
        ${d.education.map(e => `
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear ? ` – ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
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
    </div>
  </div>`;
}
