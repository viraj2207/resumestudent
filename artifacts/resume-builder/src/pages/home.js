import { navigate } from '../router.js';

export function renderHome() {
  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
  <div class="page home-page">
    <div class="home-hero">
      <div class="home-badge">✦ Student Resume Builder</div>
      <h1 class="home-title">Build Your Dream<br>Resume Today</h1>
      <p class="home-subtitle">Professional, ATS-friendly resumes crafted with beautiful templates — ready in minutes, not hours.</p>
    </div>

    <div class="options-grid">
      <div class="option-card tpl" data-nav="templates">
        <div class="card-icon">🎨</div>
        <div class="card-title">Browse Templates</div>
        <div class="card-desc">Explore 15 modern, professionally designed resume templates used by top professionals worldwide.</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="option-card edt" data-nav="editor">
        <div class="card-icon">✏️</div>
        <div class="card-title">Resume Editor</div>
        <div class="card-desc">Fill in your details with our guided editor. Add experience, skills, projects, and more.</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="option-card prv" data-nav="preview">
        <div class="card-icon">👁️</div>
        <div class="card-title">Live Preview</div>
        <div class="card-desc">See exactly how your resume will look with real-time preview across all templates.</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="option-card ats" data-nav="ats">
        <div class="card-icon">🎯</div>
        <div class="card-title">ATS Score Tester</div>
        <div class="card-desc">Instantly analyze your resume's ATS compatibility score with real-time feedback and tips.</div>
        <div class="card-arrow">→</div>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;animation:fadeIn 1s ease 0.9s both;opacity:0;animation-fill-mode:both;">
      <p style="font-size:0.82rem;color:#334155;">
        ✓ ATS Score Tester &nbsp;&nbsp;✓ PDF Download &nbsp;&nbsp;✓ 15 Templates &nbsp;&nbsp;✓ Auto-Save &nbsp;&nbsp;✓ Free Forever
      </p>
    </div>

    <footer class="home-footer">
      <div class="footer-brand">RESUMEBUILDER <span class="footer-version">v1.7.3</span></div>
      <div class="footer-tagline">Get job ready resumes.</div>
      <div class="footer-copy">© ${new Date().getFullYear()} ResumeBuilder. All rights reserved.</div>
      <div class="footer-designer">Designed by <strong style="color:#6366f1;">Viraj Khandare</strong></div>
    </footer>
  </div>`;
}

export function bindHomeEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
}
