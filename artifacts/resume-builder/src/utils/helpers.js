export function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function skillPct(level) {
  return { Beginner: 25, Intermediate: 55, Advanced: 80, Expert: 100 }[level] || 60;
}

export function skillDots(level) {
  const n = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 }[level] || 2;
  return Array.from({ length: 4 }, (_, i) =>
    `<span class="r-level-dot ${i < n ? 'filled' : ''}"></span>`
  ).join('');
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const icons = { success: '✓', info: 'ℹ', error: '✕' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
