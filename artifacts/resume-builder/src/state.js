import { loadResume } from './utils/storage.js';

export const state = {
  page: 'home',
  template: 'modern',
  resume: loadResume(),
  activeSection: 'personal'
};
