import { esc } from '../utils/helpers.js';

export function classicTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  return `
  <div class="resume-classic">
    <div class="r-header">
      <div class="r-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-contact">${contacts.map(c => `<span>${esc(c)}</span>`).join('')}</div>
    </div>
    <div class="r-body">
      ${p.summary ? `<div class="r-section"><div class="r-section-title">Summary</div><div class="r-summary">${esc(p.summary)}</div></div>` : ''}
      ${d.experience.length ? `
      <div class="r-section">
        <div class="r-section-title">Experience</div>
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
      <div class="r-section">
        <div class="r-section-title">Education</div>
        ${d.education.map(e => `
        <div class="r-item">
          <div class="r-item-header">
            <span class="r-item-title">${esc(e.institution)}</span>
            <span class="r-item-date">${esc(e.startYear)}${e.endYear ? ` – ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-item-sub">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''} ${e.gpa ? `· GPA: ${esc(e.gpa)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-section">
        <div class="r-section-title">Skills</div>
        <div class="r-skills">${d.skills.map(s => `<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-section">
        <div class="r-section-title">Projects</div>
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
      ${d.certifications.length ? `
      <div class="r-section">
        <div class="r-section-title">Certifications</div>
        <div class="r-skills">${d.certifications.map(c => `<span class="r-skill-tag">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''} ${c.year ? `(${esc(c.year)})` : ''}</span>`).join('')}</div>
      </div>` : ''}
    </div>
  </div>`;
}
