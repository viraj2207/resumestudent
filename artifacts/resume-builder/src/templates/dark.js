import { esc } from '../utils/helpers.js';

export function darkTemplate(d) {
  const p = d.personal;
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean);
  return `
  <div class="resume-dark">
    <div class="r-dark-header">
      <div class="r-dark-accent-line"></div>
      <div class="r-dark-name">${esc(p.name) || 'Your Name'}</div>
      <div class="r-dark-role">${d.experience[0]?.position || 'Developer'}</div>
      <div class="r-dark-contacts">${contacts.map(c => `<span>${esc(c)}</span>`).join('<span style="opacity:0.3;margin:0 0.5rem">|</span>')}</div>
    </div>
    <div class="r-dark-body">
      ${p.summary ? `
      <div class="r-dark-section">
        <div class="r-dark-stitle"><span class="r-dark-hash">#</span> about</div>
        <p class="r-dark-text">${esc(p.summary)}</p>
      </div>` : ''}
      ${d.experience.length ? `
      <div class="r-dark-section">
        <div class="r-dark-stitle"><span class="r-dark-hash">#</span> experience</div>
        ${d.experience.map(e => `
        <div class="r-dark-item">
          <div class="r-dark-item-head">
            <strong>${esc(e.position)}</strong>
            <span class="r-dark-date">${esc(e.startDate)}${e.endDate ? ` → ${esc(e.endDate)}` : ''}</span>
          </div>
          <div class="r-dark-company">&gt; ${esc(e.company)}</div>
          <p class="r-dark-text">${esc(e.description)}</p>
        </div>`).join('')}
      </div>` : ''}
      ${d.skills.length ? `
      <div class="r-dark-section">
        <div class="r-dark-stitle"><span class="r-dark-hash">#</span> skills</div>
        <div class="r-dark-skills">${d.skills.map(s => `<span class="r-dark-skill">${esc(s.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${d.projects.length ? `
      <div class="r-dark-section">
        <div class="r-dark-stitle"><span class="r-dark-hash">#</span> projects</div>
        ${d.projects.map(pr => `
        <div class="r-dark-item">
          <div class="r-dark-item-head">
            <strong>${esc(pr.name)}</strong>
            ${pr.url ? `<span class="r-dark-date">${esc(pr.url)}</span>` : ''}
          </div>
          <div class="r-dark-company">&gt; ${esc(pr.technologies)}</div>
          <p class="r-dark-text">${esc(pr.description)}</p>
        </div>`).join('')}
      </div>` : ''}
      ${d.education.length ? `
      <div class="r-dark-section">
        <div class="r-dark-stitle"><span class="r-dark-hash">#</span> education</div>
        ${d.education.map(e => `
        <div class="r-dark-item">
          <div class="r-dark-item-head">
            <strong>${esc(e.institution)}</strong>
            <span class="r-dark-date">${esc(e.startYear)}${e.endYear ? ` → ${esc(e.endYear)}` : ''}</span>
          </div>
          <div class="r-dark-company">&gt; ${esc(e.degree)}${e.field ? ` · ${esc(e.field)}` : ''} ${e.gpa ? `· GPA ${esc(e.gpa)}` : ''}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="r-dark-section">
        <div class="r-dark-stitle"><span class="r-dark-hash">#</span> certifications</div>
        <div class="r-dark-skills">${d.certifications.map(c => `<span class="r-dark-skill">${esc(c.name)} ${c.year ? `(${c.year})` : ''}</span>`).join('')}</div>
      </div>` : ''}
    </div>
  </div>`;
}
