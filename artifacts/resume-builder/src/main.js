import './app.css';
import { state } from './state.js';
import { loadTemplate } from './utils/storage.js';
import { initRouter } from './router.js';
import { renderHome,      bindHomeEvents    } from './pages/home.js';
import { renderTemplates, bindTplEvents     } from './pages/templates.js';
import { renderEditor,    bindEditorEvents  } from './pages/editor.js';
import { renderPreview,   bindPreviewEvents } from './pages/preview.js';
import { renderATS,       bindATSEvents     } from './pages/ats.js';

state.template = loadTemplate();

function render() {
  const app = document.getElementById('app');
  switch (state.page) {
    case 'home':      app.innerHTML = renderHome();      bindHomeEvents();    break;
    case 'templates': app.innerHTML = renderTemplates(); bindTplEvents();     break;
    case 'editor':    app.innerHTML = renderEditor();    bindEditorEvents();  break;
    case 'preview':   app.innerHTML = renderPreview();   bindPreviewEvents(); break;
    case 'ats':       app.innerHTML = renderATS();       bindATSEvents();     break;
  }
}

initRouter(render);
render();
