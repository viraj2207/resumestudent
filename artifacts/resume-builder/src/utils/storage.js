import { SAMPLE_RESUME } from '../data/config.js';

export function loadResume() {
  try {
    const saved = localStorage.getItem('rb_resume_v2');
    return saved ? JSON.parse(saved) : structuredClone(SAMPLE_RESUME);
  } catch {
    return structuredClone(SAMPLE_RESUME);
  }
}

export function saveResume(state) {
  localStorage.setItem('rb_resume_v2', JSON.stringify(state.resume));
  localStorage.setItem('rb_template', state.template);
}

export function loadTemplate() {
  return localStorage.getItem('rb_template') || 'modern';
}
