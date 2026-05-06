import { navigate } from '../router.js';
import { state } from '../state.js';
import { debounce } from '../utils/helpers.js';
import { triggerDownload } from './preview.js';

export function renderATS() {
  const score = computeATSScore(state.resume, '');
  return `
  <div class="bg-orbs">
    <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  </div>
  <div class="page ats-page">
    <nav class="top-nav">
      <button class="btn-back" data-nav="home">← Home</button>
      <span class="logo">ATS Score Tester</span>
      <button class="btn-primary" data-nav="editor">Fix Issues →</button>
    </nav>
    <div class="ats-layout">

      <div class="ats-left animate-in">
        <div class="ats-score-card">
          <div class="ats-ring-wrap">
            <svg class="ats-ring" viewBox="0 0 140 140" width="140" height="140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
              <circle cx="70" cy="70" r="58" fill="none"
                stroke="${scoreColor(score.total)}"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${2 * Math.PI * 58}"
                stroke-dashoffset="${2 * Math.PI * 58 * (1 - score.total / 100)}"
                transform="rotate(-90 70 70)"
                id="ats-ring-circle"
                style="transition:stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1);filter:drop-shadow(0 0 8px ${scoreColor(score.total)})"/>
            </svg>
            <div class="ats-ring-label">
              <div class="ats-score-num" id="ats-score-num">0</div>
              <div class="ats-score-sub">/ 100</div>
            </div>
          </div>
          <div class="ats-grade-badge" style="background:${scoreGradient(score.total)}">${scoreGrade(score.total)}</div>
          <div class="ats-score-msg">${scoreMessage(score.total)}</div>
        </div>

        <div class="ats-jd-card">
          <div class="ats-jd-header">
            <span class="ats-section-icon">📋</span>
            <div>
              <div class="ats-card-title">Job Description Matcher</div>
              <div class="ats-card-sub">Paste a job posting to check keyword alignment</div>
            </div>
          </div>
          <textarea id="ats-jd-input" class="ats-jd-textarea" placeholder="Paste job description here to match keywords...&#10;&#10;Example: 'We are looking for a software engineer with experience in React, Node.js, Python, and AWS...'"></textarea>
          <div class="ats-jd-stats" id="ats-jd-stats" style="display:none">
            <div class="ats-jd-stat matched" id="ats-matched-count">0 Matched</div>
            <div class="ats-jd-stat missing" id="ats-missing-count">0 Missing</div>
          </div>
          <div id="ats-keyword-chips" class="ats-keyword-chips"></div>
        </div>
      </div>

      <div class="ats-right animate-in" style="animation-delay:0.12s">
        <div class="ats-categories-card">
          <div class="ats-card-title" style="margin-bottom:1.25rem">Score Breakdown</div>
          ${score.categories.map((cat, i) => `
          <div class="ats-cat-row" style="animation-delay:${0.1 + i * 0.07}s">
            <div class="ats-cat-header">
              <span class="ats-cat-icon">${cat.icon}</span>
              <span class="ats-cat-name">${cat.name}</span>
              <span class="ats-cat-pts" style="color:${scoreColor(cat.pct)}">${cat.earned}/${cat.max}</span>
            </div>
            <div class="ats-cat-bar-bg">
              <div class="ats-cat-bar-fill" style="width:0%;background:${scoreColor(cat.pct)}" data-target="${cat.pct}"></div>
            </div>
            ${cat.tip ? `<div class="ats-cat-tip">${cat.tip}</div>` : ''}
          </div>`).join('')}
        </div>

        <div class="ats-tips-card">
          <div class="ats-card-title" style="margin-bottom:1rem">💡 Improvement Tips</div>
          <div class="ats-tips-list" id="ats-tips-list">
            ${score.tips.map((tip, i) => `
            <div class="ats-tip-item ${tip.type}" style="animation-delay:${i * 0.06}s">
              <span class="ats-tip-icon">${tipIcon(tip.type)}</span>
              <span class="ats-tip-text">${tip.text}</span>
            </div>`).join('')}
          </div>
        </div>

        <div class="ats-actions-row">
          <button class="btn-primary" data-nav="editor" style="flex:1">✏️ Edit Resume</button>
          <button class="btn-download" id="ats-download-btn" style="flex:1;justify-content:center">⬇ Download PDF</button>
        </div>
      </div>
    </div>
  </div>`;
}

export function bindATSEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  animateScore(computeATSScore(state.resume, '').total);

  setTimeout(() => {
    document.querySelectorAll('.ats-cat-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 200);

  const jdInput = document.getElementById('ats-jd-input');
  jdInput?.addEventListener('input', debounce(() => {
    const jd = jdInput.value.trim();
    const score = computeATSScore(state.resume, jd);
    updateScoreDisplay(score);
    if (jd) {
      renderKeywordChips(score.jdMatch);
      document.getElementById('ats-jd-stats').style.display = 'flex';
      document.getElementById('ats-matched-count').textContent = score.jdMatch.matched.length + ' Matched';
      document.getElementById('ats-missing-count').textContent = score.jdMatch.missing.length + ' Missing';
    } else {
      document.getElementById('ats-keyword-chips').innerHTML = '';
      document.getElementById('ats-jd-stats').style.display = 'none';
    }
    document.getElementById('ats-tips-list').innerHTML = score.tips.map((tip, i) =>
      `<div class="ats-tip-item ${tip.type}" style="animation-delay:${i * 0.05}s">
        <span class="ats-tip-icon">${tipIcon(tip.type)}</span>
        <span class="ats-tip-text">${tip.text}</span>
      </div>`).join('');
    document.querySelectorAll('.ats-cat-bar-fill').forEach((bar, idx) => {
      bar.style.width = (score.categories[idx]?.pct ?? 0) + '%';
    });
  }, 400));

  document.getElementById('ats-download-btn')?.addEventListener('click', triggerDownload);
}

function animateScore(target) {
  const el = document.getElementById('ats-score-num');
  if (!el) return;
  const start = performance.now();
  const duration = 1200;
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

function updateScoreDisplay(score) {
  const el = document.getElementById('ats-score-num');
  if (el) el.textContent = score.total;
  const circle = document.getElementById('ats-ring-circle');
  if (circle) {
    const circ = 2 * Math.PI * 58;
    circle.style.strokeDashoffset = circ * (1 - score.total / 100);
    circle.setAttribute('stroke', scoreColor(score.total));
  }
}

function renderKeywordChips(jdMatch) {
  const container = document.getElementById('ats-keyword-chips');
  if (!container) return;
  container.innerHTML =
    jdMatch.matched.map(k => `<span class="kw-chip matched">✓ ${k}</span>`).join('') +
    jdMatch.missing.slice(0, 12).map(k => `<span class="kw-chip missing">✕ ${k}</span>`).join('');
}

function computeATSScore(resume, jobDesc) {
  const p = resume.personal;
  const tips = [];
  const categories = [];

  let contact = 0;
  if (p.name?.trim())     contact += 3;
  if (p.email?.trim())    contact += 3;
  if (p.phone?.trim())    contact += 3;
  if (p.location?.trim()) contact += 2;
  if (p.linkedin?.trim()) contact += 2;
  if (p.github?.trim() || p.website?.trim()) contact += 2;
  const contactTip = contact < 15 ? '→ Add ' + [!p.name && 'name', !p.email && 'email', !p.phone && 'phone', !p.location && 'location', !p.linkedin && 'LinkedIn'].filter(Boolean).join(', ') : '';
  categories.push({ name: 'Contact Info', icon: '👤', earned: contact, max: 15, pct: Math.round(contact / 15 * 100), tip: contactTip || '' });
  if (contact < 10) tips.push({ type: 'error', text: 'Contact info is incomplete. Add email, phone, and LinkedIn profile.' });
  else if (contact < 15) tips.push({ type: 'warn', text: 'Add LinkedIn or GitHub/portfolio URL to boost recruiter trust.' });

  let summary = 0;
  const sumText = p.summary || '';
  const sumWords = sumText.split(/\s+/).filter(Boolean).length;
  if (sumText.trim()) summary += 4;
  if (sumWords >= 30)  summary += 4;
  if (sumWords >= 60)  summary += 3;
  const sumActionVerbs = countActionVerbs(sumText);
  if (sumActionVerbs >= 1) summary += 2;
  if (sumActionVerbs >= 2) summary += 2;
  categories.push({ name: 'Professional Summary', icon: '📝', earned: summary, max: 15, pct: Math.round(summary / 15 * 100), tip: !sumText.trim() ? '→ Add a professional summary — it\'s the first thing ATS and recruiters read.' : sumWords < 30 ? `→ Expand your summary (${sumWords} words). Aim for 40–80 words with action verbs.` : '' });
  if (!sumText.trim()) tips.push({ type: 'error', text: 'No professional summary found. Add a 40–80 word summary with keywords.' });
  else if (sumWords < 30) tips.push({ type: 'warn', text: `Your summary is short (${sumWords} words). Aim for 40–80 words.` });
  else tips.push({ type: 'success', text: 'Great summary! Well-written intro increases recruiter engagement by 40%.' });

  let exp = 0;
  const exps = resume.experience;
  if (exps.length >= 1) exp += 5;
  if (exps.length >= 2) exp += 4;
  if (exps.length >= 3) exp += 3;
  let totalExpWords = 0, totalActionVerbs = 0, hasQuantified = false;
  exps.forEach(e => {
    const desc = e.description || '';
    totalExpWords += desc.split(/\s+/).filter(Boolean).length;
    totalActionVerbs += countActionVerbs(desc);
    if (/\d+%|\d+x|\$\d+|\d+\s*(million|thousand|users|clients|projects|teams|members)/i.test(desc)) hasQuantified = true;
  });
  if (totalExpWords >= 60)   exp += 5;
  if (totalActionVerbs >= 3) exp += 4;
  if (hasQuantified)          exp += 4;
  categories.push({ name: 'Work Experience', icon: '💼', earned: Math.min(exp, 25), max: 25, pct: Math.round(Math.min(exp, 25) / 25 * 100), tip: exps.length === 0 ? '→ Add at least one work experience entry.' : !hasQuantified ? '→ Add quantified achievements (e.g. "increased revenue by 25%")' : '' });
  if (exps.length === 0) tips.push({ type: 'error', text: 'No work experience found. Add internships, jobs, or volunteer work.' });
  else if (!hasQuantified) tips.push({ type: 'warn', text: 'Use numbers in experience descriptions — e.g. "improved speed by 30%".' });
  else tips.push({ type: 'success', text: 'Quantified achievements detected! This significantly boosts your ATS score.' });
  if (totalActionVerbs < 3 && exps.length > 0) tips.push({ type: 'warn', text: 'Use strong action verbs: Led, Built, Improved, Achieved, Delivered, Managed.' });

  let edu = 0;
  const edus = resume.education;
  if (edus.length >= 1)        edu += 5;
  if (edus[0]?.degree?.trim()) edu += 2;
  if (edus[0]?.field?.trim())  edu += 2;
  if (edus[0]?.endYear?.trim()) edu += 1;
  categories.push({ name: 'Education', icon: '🎓', earned: edu, max: 10, pct: Math.round(edu / 10 * 100), tip: edus.length === 0 ? '→ Add your education details (degree, institution, year).' : '' });
  if (edus.length === 0) tips.push({ type: 'error', text: 'No education section found. Add your school and degree details.' });

  let skills = 0;
  const skillCount = resume.skills.length;
  if (skillCount >= 1)  skills += 3;
  if (skillCount >= 4)  skills += 4;
  if (skillCount >= 7)  skills += 4;
  if (skillCount >= 10) skills += 4;
  categories.push({ name: 'Skills', icon: '⚡', earned: Math.min(skills, 15), max: 15, pct: Math.round(Math.min(skills, 15) / 15 * 100), tip: skillCount === 0 ? '→ Add at least 6–10 relevant skills.' : skillCount < 6 ? `→ You have ${skillCount} skills. Aim for 8–12 for best ATS matching.` : '' });
  if (skillCount === 0) tips.push({ type: 'error', text: 'No skills listed. Add 8–12 relevant technical and soft skills.' });
  else if (skillCount < 6) tips.push({ type: 'warn', text: `Only ${skillCount} skills listed. Add more (target 8–12) to match job requirements.` });
  else tips.push({ type: 'success', text: `${skillCount} skills listed — good coverage for ATS keyword matching.` });

  let proj = 0;
  const projs = resume.projects;
  if (projs.length >= 1) proj += 5;
  if (projs.length >= 2) proj += 3;
  if (projs[0]?.technologies?.trim()) proj += 2;
  categories.push({ name: 'Projects', icon: '🚀', earned: Math.min(proj, 10), max: 10, pct: Math.round(Math.min(proj, 10) / 10 * 100), tip: projs.length === 0 ? '→ Add 1–2 projects with technologies used and measurable outcomes.' : '' });
  if (projs.length === 0) tips.push({ type: 'warn', text: 'Add personal projects — they show initiative and real-world skills.' });

  let certs = 0;
  if (resume.certifications.length >= 1) certs += 3;
  if (resume.certifications.length >= 2) certs += 2;
  categories.push({ name: 'Certifications', icon: '🏆', earned: Math.min(certs, 5), max: 5, pct: Math.round(Math.min(certs, 5) / 5 * 100), tip: resume.certifications.length === 0 ? '→ Add relevant certifications to stand out.' : '' });
  if (resume.certifications.length === 0) tips.push({ type: 'info', text: 'Certifications (AWS, Google, etc.) add credibility and ATS keyword matches.' });

  let jdMatch = { matched: [], missing: [], score: 0, matchPct: 0 };
  if (jobDesc.trim()) {
    jdMatch = matchJobKeywords(resume, jobDesc);
    tips.push({
      type: jdMatch.matchPct > 0.5 ? 'success' : 'warn',
      text: `Job match: ${jdMatch.matched.length} of ${jdMatch.matched.length + jdMatch.missing.length} keywords found (${Math.round(jdMatch.matchPct * 100)}%). ${jdMatch.missing.length > 0 ? 'Missing: ' + jdMatch.missing.slice(0, 3).join(', ') + (jdMatch.missing.length > 3 ? '…' : '') + '.' : ''}`
    });
  }

  const rawTotal = Math.min(contact + summary + Math.min(exp, 25) + edu + Math.min(skills, 15) + Math.min(proj, 10) + Math.min(certs, 5), 95);
  const jdBonus = jobDesc.trim() ? Math.round(jdMatch.matchPct * 5) : 0;
  const total = Math.min(rawTotal + jdBonus, 100);
  return { total, categories, tips, jdMatch };
}

function countActionVerbs(text) {
  const verbs = ['led','built','developed','created','designed','managed','improved','increased','decreased','delivered','launched','implemented','architected','scaled','optimized','reduced','achieved','collaborated','mentored','analyzed','generated','automated','deployed','maintained','contributed','spearheaded','streamlined','enhanced','accelerated','transformed'];
  const lower = text.toLowerCase();
  return verbs.filter(v => new RegExp(`\\b${v}`, 'i').test(lower)).length;
}

function matchJobKeywords(resume, jd) {
  const jdLower = jd.toLowerCase();
  const allResumeText = [
    resume.personal.summary,
    ...resume.experience.map(e => `${e.position} ${e.company} ${e.description}`),
    ...resume.skills.map(s => s.name),
    ...resume.projects.map(p => `${p.name} ${p.technologies} ${p.description}`),
    ...resume.certifications.map(c => `${c.name} ${c.issuer}`)
  ].join(' ').toLowerCase();

  const stopWords = new Set(['the','and','or','of','in','to','a','an','for','with','is','are','be','by','we','our','you','your','as','on','at','from','that','this','will','can','have','has','must','including','experience','required','preferred','ability','strong','excellent','good','well','role','team','work','years','year','minimum','plus']);
  const jdWords = jdLower.match(/\b[a-z][a-z.+#\-]{2,}\b/g) || [];
  const freq = {};
  jdWords.forEach(w => { if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1; });
  const keywords = Object.entries(freq).filter(([, c]) => c >= 1).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k]) => k);
  const matched = keywords.filter(k => allResumeText.includes(k));
  const missing = keywords.filter(k => !allResumeText.includes(k));
  const matchPct = keywords.length > 0 ? matched.length / keywords.length : 0;
  return { matched, missing, matchPct };
}

function scoreColor(pct) {
  if (pct >= 80) return '#10b981';
  if (pct >= 60) return '#f59e0b';
  if (pct >= 40) return '#f97316';
  return '#ef4444';
}
function scoreGradient(pct) {
  if (pct >= 80) return 'linear-gradient(135deg,#10b981,#059669)';
  if (pct >= 60) return 'linear-gradient(135deg,#f59e0b,#d97706)';
  if (pct >= 40) return 'linear-gradient(135deg,#f97316,#ea580c)';
  return 'linear-gradient(135deg,#ef4444,#dc2626)';
}
function scoreGrade(pct) {
  if (pct >= 90) return '🏆 Excellent';
  if (pct >= 80) return '✅ Strong';
  if (pct >= 70) return '👍 Good';
  if (pct >= 60) return '⚠️ Fair';
  if (pct >= 40) return '📉 Weak';
  return '🚨 Poor';
}
function scoreMessage(pct) {
  if (pct >= 90) return 'Outstanding! Your resume is highly optimized for ATS systems.';
  if (pct >= 80) return 'Strong resume! Minor improvements can push it to excellent.';
  if (pct >= 70) return 'Good foundation. Address the tips below to boost your score.';
  if (pct >= 60) return 'Fair score. Several key sections need attention.';
  if (pct >= 40) return 'Needs work. Follow the tips below to significantly improve.';
  return 'Critical issues found. Your resume needs major improvements to pass ATS.';
}
function tipIcon(type) {
  return { success: '✅', warn: '⚠️', error: '🚨', info: '💡' }[type] || '•';
}
