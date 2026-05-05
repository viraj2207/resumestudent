import { esc } from '../utils/helpers.js';

export function boldTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean);
  return `
  <div class="resume-bold">
    <div class="r-bold-header">
      <div class="r-bold-name">${esc(p.name) || 'YOUR NAME'}</div>
      <div class="r-bold-role">${d.experience[0]?.position || 'Professional'}</div>
      <div class="r-bold-contacts">${contacts.map(c => `<span>${esc(c)}</span>`).join('<span class="r-bold-sep">|</span>')}</div>
    </div>
    <div class="r-bold-body">
      ${p.summary ? `
      <div class="r-bold-section">
        <div class="r-bold-title">PROFILE</div>
        <p class="r-bold-text">${esc(p.summary)}</p>
      </div>` : ''}
      ${d.experience.length ? `
      <div class="r-bold-section">
        <div class="r-bold-title">EXPERIENCE</div>
        ${d.experience.map(e => `
        <div class="r-bold-item">
          <div class="r-bold-item-head">
            <strong>${esc(e.position)}</strong>
            <span>${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ''}</span>
          </div>
          <div class="r-bold-company">${esc(e.company)}</div>
          <div class="r-bold-text">${esc(e.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-bold-section">
        <div class="r-bold-title">EDUCATION</div>
        ${d.education.map(e => `
        <div class="r-bold-item">
          <div class="r-bold-item-head">
            <strong>${esc(e.institution)}</strong>
            <span>${esc(e.startYear)}${e.endYear ? ` – ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-bold-company">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-bold-section">
        <div class="r-bold-title">SKILLS</div>
        <div class="r-bold-skills">${d.skills.map(s => `<span class="r-bold-skill">${esc(s.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-bold-section">
        <div class="r-bold-title">PROJECTS</div>
        ${d.projects.map(pr => `
        <div class="r-bold-item">
          <div class="r-bold-item-head">
            <strong>${esc(pr.name)}</strong>
            ${pr.url ? `<span>${esc(pr.url)}</span>` : ''}
          </div>
          <div class="r-bold-company">${esc(pr.technologies)}</div>
          <div class="r-bold-text">${esc(pr.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-bold-section">
        <div class="r-bold-title">CERTIFICATIONS</div>
        <div class="r-bold-skills">${d.certifications.map(c => `<span class="r-bold-skill">${esc(c.name)} ${c.year ? `(${esc(c.year)})` : ''}</span>`).join('')}</div>
      </div>` : ''}
    </div>
  </div>`;
}
