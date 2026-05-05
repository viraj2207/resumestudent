import { esc, skillPct } from '../utils/helpers.js';

export function gradientTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location].filter(Boolean);
  return `
  <div class="resume-gradient">
    <div class="r-grad-header">
      <div class="r-grad-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-grad-role">${d.experience[0]?.position || 'Professional'}</div>
      <div class="r-grad-contacts">
        ${contacts.map(c => `<span>${esc(c)}</span>`).join('  ·  ')}
        ${p.linkedin ? `  ·  ${esc(p.linkedin)}` : ''}
        ${p.github   ? `  ·  ${esc(p.github)}`   : ''}
      </div>
    </div>
    <div class="r-grad-body">
      <div class="r-grad-left">
        ${p.summary ? `<div class="r-grad-section"><div class="r-grad-stitle">About</div><p class="r-grad-text">${esc(p.summary)}</p></div>` : ''}
        ${d.experience.length ? `
        <div class="r-grad-section">
          <div class="r-grad-stitle">Experience</div>
          ${d.experience.map(e => `
          <div class="r-grad-item">
            <div class="r-grad-item-title">${esc(e.position)}</div>
            <div class="r-grad-item-sub">${esc(e.company)} <span>· ${esc(e.startDate)}${e.endDate ? `–${esc(e.endDate)}` : ''}</span></div>
            <p class="r-grad-text">${esc(e.description)}</p>
          </div>`).join('')}
        </div>` : ''}
        ${d.projects.length ? `
        <div class="r-grad-section">
          <div class="r-grad-stitle">Projects</div>
          ${d.projects.map(pr => `
          <div class="r-grad-item">
            <div class="r-grad-item-title">${esc(pr.name)}</div>
            <div class="r-grad-item-sub">${esc(pr.technologies)}</div>
            <p class="r-grad-text">${esc(pr.description)}</p>
          </div>`).join('')}
        </div>` : ''}
      </div>
      <div class="r-grad-right">
        ${d.skills.length ? `
        <div class="r-grad-section">
          <div class="r-grad-stitle">Skills</div>
          ${d.skills.map(s => `
          <div class="r-grad-skill-row">
            <span style="font-size:0.82rem;color:#374151;font-weight:500">${esc(s.name)}</span>
            <div class="r-grad-bar"><div class="r-grad-bar-fill" style="width:${skillPct(s.level)}%"></div></div>
          </div>`).join('')}
        </div>` : ''}
        ${d.education.length ? `
        <div class="r-grad-section">
          <div class="r-grad-stitle">Education</div>
          ${d.education.map(e => `
          <div class="r-grad-item">
            <div class="r-grad-item-title">${esc(e.institution)}</div>
            <div class="r-grad-item-sub">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.75rem;color:#9ca3af">${esc(e.startYear)}${e.endYear ? `–${esc(e.endYear)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
          </div>`).join('')}
        </div>` : ''}
        ${d.certifications.length ? `
        <div class="r-grad-section">
          <div class="r-grad-stitle">Certifications</div>
          ${d.certifications.map(c => `
          <div class="r-grad-item">
            <div class="r-grad-item-title" style="font-size:0.82rem">${esc(c.name)}</div>
            <div class="r-grad-item-sub">${esc(c.issuer)} ${c.year || ''}</div>
          </div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}
