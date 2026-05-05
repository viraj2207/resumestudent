import { esc } from '../utils/helpers.js';

export function academicTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);
  return `
  <div class="resume-academic">
    <div class="r-acad-header">
      <div class="r-acad-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-acad-role">${d.experience[0]?.position || d.education[0]?.degree || 'Researcher'}</div>
      <div class="r-acad-contact">${contacts.join('  ·  ')}</div>
    </div>
    <div class="r-acad-rule"></div>
    <div class="r-acad-body">
      ${p.summary ? `
      <div class="r-acad-section">
        <div class="r-acad-title">Research Interests / Summary</div>
        <p class="r-acad-text">${esc(p.summary)}</p>
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-acad-section">
        <div class="r-acad-title">Education</div>
        ${d.education.map(e => `
        <div class="r-acad-item">
          <div class="r-acad-item-row">
            <strong class="r-acad-inst">${esc(e.institution)}</strong>
            <span class="r-acad-date">${esc(e.startYear)}${e.endYear ? ` – ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-acad-sub">${esc(e.degree)}${e.field ? ` in ${esc(e.field)}` : ''} ${e.gpa ? `· GPA: ${esc(e.gpa)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.experience.length ? `
      <div class="r-acad-section">
        <div class="r-acad-title">Academic / Professional Experience</div>
        ${d.experience.map(e => `
        <div class="r-acad-item">
          <div class="r-acad-item-row">
            <strong class="r-acad-inst">${esc(e.position)}</strong>
            <span class="r-acad-date">${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ''}</span>
          </div>
          <div class="r-acad-sub">${esc(e.company)}</div>
          <div class="r-acad-text">${esc(e.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-acad-section">
        <div class="r-acad-title">Research Projects</div>
        ${d.projects.map(pr => `
        <div class="r-acad-item">
          <div class="r-acad-item-row">
            <strong class="r-acad-inst">${esc(pr.name)}</strong>
            ${pr.url ? `<span class="r-acad-date">${esc(pr.url)}</span>` : ''}
          </div>
          <div class="r-acad-sub">${esc(pr.technologies)}</div>
          <div class="r-acad-text">${esc(pr.description)}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-acad-section">
        <div class="r-acad-title">Technical Skills</div>
        <div class="r-acad-skills">${d.skills.map(s => `<span class="r-acad-skill">${esc(s.name)} <em>(${s.level})</em></span>`).join(' &nbsp;·&nbsp; ')}</div>
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-acad-section">
        <div class="r-acad-title">Certifications &amp; Awards</div>
        ${d.certifications.map(c => `
        <div class="r-acad-item">
          <div class="r-acad-item-row">
            <span class="r-acad-inst">${esc(c.name)}</span>
            <span class="r-acad-date">${c.year || ''}</span>
          </div>
          <div class="r-acad-sub">${esc(c.issuer)}</div>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </div>`;
}
