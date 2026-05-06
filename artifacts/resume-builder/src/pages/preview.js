import { navigate } from '../router.js';
import { state } from '../state.js';
import { TEMPLATES } from '../data/config.js';
import { getResumeHTML } from '../templates/index.js';
import { showToast } from '../utils/helpers.js';

export function renderPreview() {
  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page preview-page">
    <nav class="top-nav">
      <button class="btn-back" data-nav="editor">← Edit</button>
      <span class="logo">Resume Preview</span>
      <div class="editor-actions">
        <div style="display:flex;gap:0.4rem;align-items:center;flex-wrap:wrap;">
          ${TEMPLATES.map(t => `<button class="tpl-chip ${state.template === t.id ? 'active' : ''}" data-tpl="${t.id}" title="${t.name}">${t.name.split(' ')[0]}</button>`).join('')}
        </div>
        <button class="btn-download" id="btn-download">⬇ Download PDF</button>
      </div>
    </nav>
    <div class="full-preview">
      <div class="full-resume" id="full-resume-view">
        ${getResumeHTML(state.template, state.resume)}
      </div>
    </div>
  </div>`;
}

export function bindPreviewEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  document.querySelectorAll('.tpl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.template = chip.dataset.tpl;
      document.querySelectorAll('.tpl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const view = document.getElementById('full-resume-view');
      if (view) view.innerHTML = getResumeHTML(state.template, state.resume);
    });
  });

  document.getElementById('btn-download')?.addEventListener('click', triggerDownload);
}

export function triggerDownload() {
  const resumeHTML = getResumeHTML(state.template, state.resume);
  const printArea = document.getElementById('print-area');
  printArea.innerHTML = resumeHTML;
  printArea.style.display = 'block';
  showToast('Opening print dialog... Choose "Save as PDF"', 'info');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      printArea.style.display = 'none';
      printArea.innerHTML = '';
    }, 1000);
  }, 200);
}
