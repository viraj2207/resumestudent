import { esc } from '../utils/helpers.js';

export function compactTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  return `
  <div class="resume-compact">
    <div class="r-cmp-header">
      <div class="r-cmp-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-cmp-contacts">${contacts.map(c => `<span>${esc(c)}</span>`).join(' | ')}</div>
    </div>
    ${p.summary ? `<div class="r-cmp-summary">${esc(p.summary)}</div>` : ''}
    ${d.experience.length ? `
    <div class="r-cmp-section">
      <div class="r-cmp-stitle">PROFESSIONAL EXPERIENCE</div>
      ${d.experience.map(e => `
      <div class="r-cmp-item">
        <div class="r-cmp-row"><strong>${esc(e.position)}</strong><span>${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ''}</span></div>
        <div class="r-cmp-sub">${esc(e.company)}</div>
        <div class="r-cmp-desc">${esc(e.description)}</div>
      </div>`).join('')}
    </div>` : ''}
    ${d.education.length ? `
    <div class="r-cmp-section">
      <div class="r-cmp-stitle">EDUCATION</div>
      ${d.education.map(e => `
      <div class="r-cmp-item">
        <div class="r-cmp-row"><strong>${esc(e.institution)}</strong><span>${esc(e.startYear)}${e.endYear ? ` – ${esc(e.endYear)}` : ''}</span></div>
        <div class="r-cmp-sub">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''} ${e.gpa ? `| GPA: ${esc(e.gpa)}` : ''}</div>
      </div>`).join('')}
    </div>` : ''}
    <div class="r-cmp-two-col">
      ${d.skills.length ? `
      <div>
        <div class="r-cmp-stitle">SKILLS</div>
        <div class="r-cmp-skills">${d.skills.map(s => `<span class="r-cmp-skill">${esc(s.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${d.certifications.length ? `
      <div>
        <div class="r-cmp-stitle">CERTIFICATIONS</div>
        ${d.certifications.map(c => `<div class="r-cmp-desc">${esc(c.name)}${c.year ? ` (${esc(c.year)})` : ''}</div>`).join('')}
      </div>` : ''}
    </div>
    ${d.projects.length ? `
    <div class="r-cmp-section">
      <div class="r-cmp-stitle">PROJECTS</div>
      ${d.projects.map(pr => `
      <div class="r-cmp-item">
        <div class="r-cmp-row"><strong>${esc(pr.name)}</strong>${pr.url ? `<span>${esc(pr.url)}</span>` : ''}</div>
        <div class="r-cmp-sub">${esc(pr.technologies)}</div>
        <div class="r-cmp-desc">${esc(pr.description)}</div>
      </div>`).join('')}
    </div>` : ''}
  </div>`;
}
