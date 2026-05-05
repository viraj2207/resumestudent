import { esc } from '../utils/helpers.js';

export function elegantTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location].filter(Boolean);
  return `
  <div class="resume-elegant">
    <div class="r-eleg-header">
      <div class="r-eleg-ornament">✦ ✦ ✦</div>
      <div class="r-eleg-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-eleg-role">${d.experience[0]?.position || 'Professional'}</div>
      <div class="r-eleg-line"></div>
      <div class="r-eleg-contacts">${contacts.join('  ·  ')}${p.linkedin ? `  ·  ${esc(p.linkedin)}` : ''}</div>
    </div>
    <div class="r-eleg-body">
      <div class="r-eleg-main">
        ${p.summary ? `<div class="r-eleg-section"><div class="r-eleg-stitle">Profile</div><p class="r-eleg-text">${esc(p.summary)}</p></div>` : ''}
        ${d.experience.length ? `
        <div class="r-eleg-section">
          <div class="r-eleg-stitle">Career History</div>
          ${d.experience.map(e => `
          <div class="r-eleg-item">
            <div class="r-eleg-item-head">
              <em>${esc(e.company)}</em>
              <span>${esc(e.startDate)}${e.endDate ? ` — ${esc(e.endDate)}` : ''}</span>
            </div>
            <div class="r-eleg-position">${esc(e.position)}</div>
            <p class="r-eleg-text">${esc(e.description)}</p>
          </div>`).join('')}
        </div>` : ''}
        ${d.projects.length ? `
        <div class="r-eleg-section">
          <div class="r-eleg-stitle">Notable Projects</div>
          ${d.projects.map(pr => `
          <div class="r-eleg-item">
            <div class="r-eleg-item-head">
              <em>${esc(pr.name)}</em>
              ${pr.url ? `<span>${esc(pr.url)}</span>` : ''}
            </div>
            <div class="r-eleg-position">${esc(pr.technologies)}</div>
            <p class="r-eleg-text">${esc(pr.description)}</p>
          </div>`).join('')}
        </div>` : ''}
      </div>
      <div class="r-eleg-side">
        ${d.education.length ? `
        <div class="r-eleg-section">
          <div class="r-eleg-stitle">Education</div>
          ${d.education.map(e => `
          <div class="r-eleg-item">
            <div class="r-eleg-position">${esc(e.institution)}</div>
            <div class="r-eleg-item-head">
              <em>${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''}</em>
              <span>${esc(e.endYear) || ''}</span>
            </div>
            ${e.gpa ? `<div style="font-size:0.75rem;color:#92400e">GPA: ${esc(e.gpa)}</div>` : ''}
          </div>`).join('')}
        </div>` : ''}
        ${d.skills.length ? `
        <div class="r-eleg-section">
          <div class="r-eleg-stitle">Expertise</div>
          <div class="r-eleg-skills">${d.skills.map(s => `<span class="r-eleg-skill">${esc(s.name)}</span>`).join('')}</div>
        </div>` : ''}
        ${d.certifications.length ? `
        <div class="r-eleg-section">
          <div class="r-eleg-stitle">Honours</div>
          ${d.certifications.map(c => `
          <div class="r-eleg-item">
            <div class="r-eleg-position">${esc(c.name)}</div>
            <div style="font-size:0.75rem;color:#78716c">${esc(c.issuer)} ${c.year || ''}</div>
          </div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}
