import { state } from './state.js';

let _render = null;

export function initRouter(renderFn) {
  _render = renderFn;
}

export function navigate(page, opts = {}) {
  state.page = page;
  if (opts.template) state.template = opts.template;
  if (opts.section)  state.activeSection = opts.section;
  _render();
  window.scrollTo(0, 0);
}
