import { navigate } from '../router.js';
import { state } from '../state.js';
import { TEMPLATES } from '../data/config.js';
import { getResumeHTML } from '../templates/index.js';
import { saveResume } from '../utils/storage.js';
import { showToast } from '../utils/helpers.js';

export function renderTemplates() {
  const cards = TEMPLATES.map((t, i) => {
    const isSelected = state.template === t.id;
    return `
    <div class="template-card ${isSelected ? 'selected' : ''}" data-tpl="${t.id}" style="animation-delay:${i * 0.07}s">
      <div class="template-preview">
        <div class="template-preview-inner">
          ${getResumeHTML(t.id, state.resume)}
        </div>
      </div>
      <div class="template-info">
        <div class="template-name">${t.name} ${isSelected ? '<span class="selected-badge">✓ Selected</span>' : ''}</div>
        <div class="template-desc">${t.desc}</div>
        <button class="btn-use-tpl" data-tpl="${t.id}">${isSelected ? '✓ Currently Selected' : 'Use This Template'}</button>
      </div>
    </div>`;
  }).join('');

  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page" style="min-height:100vh;">
    <nav class="top-nav">
      <button class="btn-back" data-nav="home">← Back</button>
      <span class="logo">RESUMEBUILDER</span>
      <button class="btn-primary" data-nav="editor">Open Editor →</button>
    </nav>
    <div class="page-inner">
      <div class="page-header">
        <h1>Choose Your Template</h1>
        <p>15 modern, professionally designed resume templates. Click to select and use.</p>
      </div>
      <div class="templates-grid animate-in">${cards}</div>
    </div>
  </div>`;
}

export function bindTplEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  document.querySelectorAll('.btn-use-tpl').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.template = btn.dataset.tpl;
      saveResume(state);
      showToast(`Template "${TEMPLATES.find(t => t.id === state.template)?.name}" selected!`, 'success');
      navigate('editor');
    });
  });

  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      state.template = card.dataset.tpl;
      saveResume(state);
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}
