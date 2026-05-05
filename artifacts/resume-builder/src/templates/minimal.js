import { esc } from '../utils/helpers.js';

export function minimalTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.website].filter(Boolean);
  const nameParts = (p.name || 'Your Name').split(' ');
  const lastName = nameParts.pop();
  const firstName = nameParts.join(' ');
  return `
  <div class="resume-minimal">
    <div class="r-header">
      <div class="r-name"><strong>${esc(lastName)}</strong>${firstName ? `, ${esc(firstName)}` : ''}</div>
      <div class="r-contact">
        ${contacts.map(c => `<span>${esc(c)}</span>`).join('')}
        ${p.linkedin ? `<span>${esc(p.linkedin)}</span>` : ''}
        ${p.github   ? `<span>${esc(p.github)}</span>` : ''}
      </div>
    </div>
    <div class="r-divider"></div>
    ${p.summary ? `<div class="r-section" style="margin-bottom:1.5rem"><div class="r-section-title">Profile</div><div class="r-summary">${esc(p.summary)}</div></div>` : ''}
    <div class="r-body">
      <div class="r-left">
        ${d.experience.length ? `
        <div class="r-section">
          <div class="r-section-title">Experience</div>
          ${d.experience.map(e => `
          <div class="r-item">
            <div class="r-item-header">
              <span class="r-item-title">${esc(e.position)}</span>
              <span class="r-item-date">${esc(e.startDate)}${e.endDate ? `–${esc(e.endDate)}` : ''}</span>
            </div>
            <div class="r-item-sub">${esc(e.company)}</div>
            <div class="r-item-desc">${esc(e.description)}</div>
          </div>`).join('')}
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
      </div>
      <div class="r-right">
        ${d.education.length ? `
        <div class="r-section">
          <div class="r-section-title">Education</div>
          ${d.education.map(e => `
          <div class="r-item">
            <div class="r-item-title">${esc(e.institution)}</div>
            <div class="r-item-sub">${esc(e.degree)}${e.field ? ` · ${esc(e.field)}` : ''}</div>
            <div class="r-item-date">${esc(e.startYear)}${e.endYear ? `–${esc(e.endYear)}` : ''} ${e.gpa ? `· ${esc(e.gpa)}` : ''}</div>
          </div>`).join('')}
        </div>` : ''}
        ${d.skills.length ? `
        <div class="r-section">
          <div class="r-section-title">Skills</div>
          ${d.skills.map(s => `<span class="r-skill-tag">${esc(s.name)}</span>`).join('')}
        </div>` : ''}
        ${d.certifications.length ? `
        <div class="r-section">
          <div class="r-section-title">Certifications</div>
          ${d.certifications.map(c => `
          <div class="r-item">
            <div class="r-item-title" style="font-size:0.83rem">${esc(c.name)}</div>
            <div class="r-item-sub">${esc(c.issuer)} ${c.year ? `· ${esc(c.year)}` : ''}</div>
          </div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}
