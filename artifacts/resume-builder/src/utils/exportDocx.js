import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType, VerticalAlign, Header, Footer,
  PageNumber, NumberFormat
} from 'docx';

function pt(n) { return n * 20; }

function sectionHeading(title) {
  return new Paragraph({
    children: [
      new TextRun({ text: title.toUpperCase(), bold: true, size: pt(10), color: '334155', font: 'Calibri' })
    ],
    spacing: { before: pt(10), after: pt(3) },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: '6366f1', space: 2 }
    }
  });
}

function bulletItem(text) {
  return new Paragraph({
    children: [new TextRun({ text: text || '', size: pt(10), font: 'Calibri', color: '374151' })],
    bullet: { level: 0 },
    spacing: { before: pt(1), after: pt(1) }
  });
}

function labelValue(label, value) {
  if (!value) return null;
  return new Paragraph({
    children: [
      new TextRun({ text: label + ': ', bold: true, size: pt(10), font: 'Calibri', color: '374151' }),
      new TextRun({ text: value, size: pt(10), font: 'Calibri', color: '374151' })
    ],
    spacing: { before: pt(1), after: pt(1) }
  });
}

export async function exportToDocx(state) {
  const r = state.resume;
  const p = r.personal;
  const sections = [];

  // ── HEADER: Name + Contact ──
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: p.name || 'Your Name', bold: true, size: pt(24), font: 'Calibri', color: '1e1b4b' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: pt(4) }
    })
  );

  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  if (contacts.length) {
    sections.push(
      new Paragraph({
        children: [new TextRun({ text: contacts.join('  |  '), size: pt(9), font: 'Calibri', color: '6366f1' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: pt(8) }
      })
    );
  }

  // ── SUMMARY ──
  if (p.summary) {
    sections.push(sectionHeading('Professional Summary'));
    sections.push(
      new Paragraph({
        children: [new TextRun({ text: p.summary, size: pt(10), font: 'Calibri', color: '374151' })],
        spacing: { before: pt(3), after: pt(6) }
      })
    );
  }

  // ── EXPERIENCE ──
  if (r.experience.length) {
    sections.push(sectionHeading('Work Experience'));
    r.experience.forEach(e => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: e.position || '', bold: true, size: pt(11), font: 'Calibri', color: '1e293b' }),
            new TextRun({ text: `  ${e.company || ''}`, size: pt(10), font: 'Calibri', color: '475569' }),
            new TextRun({ text: `    ${[e.startDate, e.endDate || (e.current ? 'Present' : '')].filter(Boolean).join(' – ')}`, size: pt(9), font: 'Calibri', color: '94a3b8', italics: true })
          ],
          spacing: { before: pt(6), after: pt(2) }
        })
      );
      if (e.description) {
        e.description.split('\n').filter(Boolean).forEach(line => {
          sections.push(bulletItem(line.trim()));
        });
        if (!e.description.includes('\n')) {
          sections.push(bulletItem(e.description));
        }
      }
    });
  }

  // ── EDUCATION ──
  if (r.education.length) {
    sections.push(sectionHeading('Education'));
    r.education.forEach(e => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: e.institution || '', bold: true, size: pt(11), font: 'Calibri', color: '1e293b' }),
            new TextRun({ text: `    ${[e.startYear, e.endYear].filter(Boolean).join(' – ')}`, size: pt(9), font: 'Calibri', color: '94a3b8', italics: true })
          ],
          spacing: { before: pt(6), after: pt(1) }
        })
      );
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: [e.degree, e.field].filter(Boolean).join(', ') + (e.gpa ? `  ·  GPA: ${e.gpa}` : ''), size: pt(10), font: 'Calibri', color: '475569' })],
          spacing: { after: pt(3) }
        })
      );
    });
  }

  // ── SKILLS ──
  if (r.skills.length) {
    sections.push(sectionHeading('Skills'));
    const skillText = r.skills.map(s => s.level ? `${s.name} (${s.level})` : s.name).join('  ·  ');
    sections.push(
      new Paragraph({
        children: [new TextRun({ text: skillText, size: pt(10), font: 'Calibri', color: '374151' })],
        spacing: { before: pt(3), after: pt(6) }
      })
    );
  }

  // ── PROJECTS ──
  if (r.projects.length) {
    sections.push(sectionHeading('Projects'));
    r.projects.forEach(proj => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.name || '', bold: true, size: pt(11), font: 'Calibri', color: '1e293b' }),
            proj.url ? new TextRun({ text: `  —  ${proj.url}`, size: pt(9), font: 'Calibri', color: '6366f1', italics: true }) : new TextRun({ text: '' })
          ],
          spacing: { before: pt(6), after: pt(1) }
        })
      );
      if (proj.technologies) {
        sections.push(
          new Paragraph({
            children: [new TextRun({ text: proj.technologies, size: pt(9.5), font: 'Calibri', color: '6366f1' })],
            spacing: { after: pt(2) }
          })
        );
      }
      if (proj.description) {
        sections.push(bulletItem(proj.description));
      }
    });
  }

  // ── CERTIFICATIONS ──
  if (r.certifications.length) {
    sections.push(sectionHeading('Certifications'));
    r.certifications.forEach(c => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: c.name || '', bold: true, size: pt(10), font: 'Calibri', color: '1e293b' }),
            new TextRun({ text: [c.issuer, c.year].filter(Boolean).join('  ·  ') ? `  —  ${[c.issuer, c.year].filter(Boolean).join('  ·  ')}` : '', size: pt(9.5), font: 'Calibri', color: '475569' })
          ],
          spacing: { before: pt(4), after: pt(2) }
        })
      );
    });
  }

  const doc = new Document({
    creator: 'ResumeBuilder v1.7.3',
    title: `${p.name || 'Resume'} - Resume`,
    description: 'Generated by ResumeBuilder',
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 900, bottom: 720, left: 900 }
        }
      },
      children: sections
    }]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(p.name || 'resume').replace(/\s+/g, '_')}_resume.docx`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
