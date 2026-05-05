import { esc, skillPct } from '../utils/helpers.js';

export function corporateTemplate(d) {
  const p = d.personal;
  return `
  <div class="resume-corporate">
    <div class="r-corp-sidebar">
      <div class="r-corp-logo">${(p.name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</div>
      <div class="r-corp-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-corp-role">${d.experience[0]?.position || 'Professional'}</div>
      <div class="r-corp-divider"></div>
      ${p.email || p.phone || p.location ? `
      <div class="r-corp-section">
        <div class="r-corp-stitle">Contact</div>
        ${p.email    ? `<div class="r-corp-info">${esc(p.email)}</div>` : ''}
        ${p.phone    ? `<div class="r-corp-info">${esc(p.phone)}</div>` : ''}
        ${p.location ? `<div class="r-corp-info">${esc(p.location)}</div>` : ''}
        ${p.linkedin ? `<div class="r-corp-info">${esc(p.linkedin)}</div>` : ''}
        ${p.github   ? `<div class="r-corp-info">${esc(p.github)}</div>` : ''}
        ${p.website  ? `<div class="r-corp-info">${esc(p.website)}</div>` : ''}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-corp-section">
        <div class="r-corp-stitle">Expertise</div>
        ${d.skills.map(s => `
        <div class="r-corp-skill-row">
          <span style="font-size:0.78rem;color:#cbd5e1">${esc(s.name)}</span>
          <div class="r-corp-bar"><div class="r-corp-bar-fill" style="width:${skillPct(s.level)}%"></div></div>
        </div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-corp-section">
        <div class="r-corp-stitle">Certifications</div>
        ${d.certifications.map(c => `
        <div style="margin-bottom:0.6rem">
          <div style="font-size:0.78rem;color:#f1f5f9;font-weight:600">${esc(c.name)}</div>
          <div style="font-size:0.72rem;color:#94a3b8">${esc(c.issuer)} ${c.year || ''}</div>
        </div>`).join('')}
      </div>` : ''}
    </div>
    <div class="r-corp-main">
      ${p.summary ? `<div class="r-corp-msection"><div class="r-corp-mtitle">Executive Summary</div><p class="r-corp-mtext">${esc(p.summary)}</p></div>` : ''}
      ${d.experience.length ? `
      <div class="r-corp-msection">
        <div class="r-corp-mtitle">Professional Experience</div>
        ${d.experience.map(e => `
        <div class="r-corp-mitem">
          <div class="r-corp-mhead">
            <strong>${esc(e.position)}</strong>
            <span class="r-corp-mdate">${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ''}</span>
          </div>
          <div class="r-corp-mcompany">${esc(e.company)}</div>
          <p class="r-corp-mtext">${esc(e.description)}</p>
        </div>`).join('')}
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-corp-msection">
        <div class="r-corp-mtitle">Education</div>
        ${d.education.map(e => `
        <div class="r-corp-mitem">
          <div class="r-corp-mhead">
            <strong>${esc(e.institution)}</strong>
            <span class="r-corp-mdate">${esc(e.startYear)}${e.endYear ? ` – ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-corp-mcompany">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-corp-msection">
        <div class="r-corp-mtitle">Key Projects</div>
        ${d.projects.map(pr => `
        <div class="r-corp-mitem">
          <div class="r-corp-mhead">
            <strong>${esc(pr.name)}</strong>
            ${pr.url ? `<span class="r-corp-mdate">${esc(pr.url)}</span>` : ''}
          </div>
          <div class="r-corp-mcompany">${esc(pr.technologies)}</div>
          <p class="r-corp-mtext">${esc(pr.description)}</p>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </div>`;
}
