import { classicTemplate }   from './classic.js';
import { modernTemplate }    from './modern.js';
import { creativeTemplate }  from './creative.js';
import { minimalTemplate }   from './minimal.js';
import { executiveTemplate } from './executive.js';
import { techproTemplate }   from './techpro.js';
import { boldTemplate }      from './bold.js';
import { academicTemplate }  from './academic.js';
import { startupTemplate }   from './startup.js';
import { corporateTemplate } from './corporate.js';
import { gradientTemplate }  from './gradient.js';
import { compactTemplate }   from './compact.js';
import { elegantTemplate }   from './elegant.js';
import { darkTemplate }      from './dark.js';
import { twotoneTemplate }   from './twotone.js';

export function getResumeHTML(templateId, data) {
  switch (templateId) {
    case 'classic':   return classicTemplate(data);
    case 'modern':    return modernTemplate(data);
    case 'creative':  return creativeTemplate(data);
    case 'minimal':   return minimalTemplate(data);
    case 'executive': return executiveTemplate(data);
    case 'techpro':   return techproTemplate(data);
    case 'bold':      return boldTemplate(data);
    case 'academic':  return academicTemplate(data);
    case 'startup':   return startupTemplate(data);
    case 'corporate': return corporateTemplate(data);
    case 'gradient':  return gradientTemplate(data);
    case 'compact':   return compactTemplate(data);
    case 'elegant':   return elegantTemplate(data);
    case 'dark':      return darkTemplate(data);
    case 'twotone':   return twotoneTemplate(data);
    default:          return modernTemplate(data);
  }
}
