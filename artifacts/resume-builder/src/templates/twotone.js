import { esc, skillPct } from '../utils/helpers.js';

export function twotoneTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-twotone">
    <div class="r-tt-header">
      <div class="r-tt-left-head">
        <div class="r-tt-name">${esc(p.name) || 'Your Name'}</div>
        <div class="r-tt-role">${d.experience[0]?.position || 'Professional'}</div>
      </div>
      <div class="r-tt-right-head">
        ${p.email    ? `<div class="r-tt-contact">${esc(p.email)}</div>`    : ''}
        ${p.phone    ? `<div class="r-tt-contact">${esc(p.phone)}</div>`    : ''}
        ${p.location ? `<div class="r-tt-contact">${esc(p.location)}</div>` : ''}
        ${p.linkedin ? `<div class="r-tt-contact">${esc(p.linkedin)}</div>` : ''}
        ${p.github   ? `<div class="r-tt-contact">${esc(p.github)}</div>`   : ''}
      </div>
    </div>
    <div class="r-tt-body">
      <div class="r-tt-main">
        ${p.summary ? `
        <div class="r-tt-section">
          <div class="r-tt-stitle">Professional Summary</div>
          <p class="r-tt-text">${esc(p.summary)}</p>
        </div>` : ''}
        ${d.experience.length ? `
        <div class="r-tt-section">
          <div class="r-tt-stitle">Work Experience</div>
          ${d.experience.map(e => `
          <div class="r-tt-item">
            <div class="r-tt-item-head">
              <strong>${esc(e.position)}</strong>
              <span class="r-tt-date">${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ''}</span>
            </div>
            <div class="r-tt-company">${esc(e.company)}</div>
            <p class="r-tt-text">${esc(e.description)}</p>
          </div>`).join('')}
        </div>` : ''}
        ${d.projects.length ? `
        <div class="r-tt-section">
          <div class="r-tt-stitle">Projects</div>
          ${d.projects.map(pr => `
          <div class="r-tt-item">
            <div class="r-tt-item-head">
              <strong>${esc(pr.name)}</strong>
              ${pr.url ? `<span class="r-tt-date">${esc(pr.url)}</span>` : ''}
            </div>
            <div class="r-tt-company">${esc(pr.technologies)}</div>
            <p class="r-tt-text">${esc(pr.description)}</p>
          </div>`).join('')}
        </div>` : ''}
      </div>
      <div class="r-tt-side">
        ${d.education.length ? `
        <div class="r-tt-section">
          <div class="r-tt-stitle">Education</div>
          ${d.education.map(e => `
          <div class="r-tt-item">
            <div style="font-size:0.85rem;font-weight:700;color:#fff">${esc(e.institution)}</div>
            <div style="font-size:0.78rem;color:#cbd5e1;margin:0.2rem 0">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.73rem;color:#94a3b8">${esc(e.startYear)}${e.endYear ? `–${esc(e.endYear)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
          </div>`).join('')}
        </div>` : ''}
        ${d.skills.length ? `
        <div class="r-tt-section">
          <div class="r-tt-stitle">Skills</div>
          <div>${d.skills.map(s => `
          <div class="r-tt-skill-row">
            <span style="font-size:0.78rem;color:#e2e8f0">${esc(s.name)}</span>
            <div class="r-tt-bar"><div class="r-tt-bar-fill" style="width:${skillPct(s.level)}%"></div></div>
          </div>`).join('')}</div>
        </div>` : ''}
        ${d.certifications.length ? `
        <div class="r-tt-section">
          <div class="r-tt-stitle">Certifications</div>
          ${d.certifications.map(c => `
          <div class="r-tt-item">
            <div style="font-size:0.78rem;font-weight:600;color:#e2e8f0">${esc(c.name)}</div>
            <div style="font-size:0.72rem;color:#94a3b8">${esc(c.issuer)} ${c.year || ''}</div>
          </div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}
