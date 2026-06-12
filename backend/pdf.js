// pdf.js — pragmatic Markdown -> PDF renderer using pdfkit (pure JS, no headless browser).
// Handles the subset of Markdown used by the Gaia Nexus audit/seo/plan docs:
// headings, paragraphs, bullet/numbered lists, tables, horizontal rules,
// inline **bold** and `code`.
import PDFDocument from 'pdfkit';

const COLORS = { text: '#1e293b', muted: '#64748b', accent: '#4f46e5', rule: '#e2e8f0', th: '#0f172a' };

// Split a line of inline markdown into styled segments.
function parseInline(line) {
  const segs = [];
  // Tokenize on ** (bold) and ` (code). Simple state machine.
  const re = /(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let last = 0, m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) segs.push({ text: line.slice(last, m.index), bold: false, code: false });
    if (m[2] !== undefined) segs.push({ text: m[2], bold: true, code: false });
    else segs.push({ text: m[4], bold: false, code: true });
    last = re.lastIndex;
  }
  if (last < line.length) segs.push({ text: line.slice(last), bold: false, code: false });
  if (!segs.length) segs.push({ text: line, bold: false, code: false });
  return segs;
}

function writeInline(doc, line, opts = {}) {
  const segs = parseInline(line);
  segs.forEach((s, i) => {
    const last = i === segs.length - 1;
    if (s.code) doc.font('Courier').fillColor(COLORS.accent);
    else if (s.bold) doc.font('Helvetica-Bold').fillColor(opts.color || COLORS.text);
    else doc.font('Helvetica').fillColor(opts.color || COLORS.text);
    doc.text(s.text, { continued: !last, ...opts });
  });
}

function renderTable(doc, rows) {
  // rows: array of arrays of cell strings (header first). Drop separator rows already.
  if (!rows.length) return;
  const startX = doc.x, fullW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const cols = rows[0].length;
  const colW = fullW / cols;
  doc.fontSize(9);
  rows.forEach((cells, ri) => {
    const isHeader = ri === 0;
    // measure row height
    let h = 0;
    cells.forEach((c, ci) => {
      const ht = doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
        .heightOfString(c, { width: colW - 8 });
      if (ht > h) h = ht;
    });
    h += 6;
    if (doc.y + h > doc.page.height - doc.page.margins.bottom) doc.addPage();
    const y = doc.y;
    cells.forEach((c, ci) => {
      const x = startX + ci * colW;
      doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
        .fillColor(isHeader ? COLORS.th : COLORS.text)
        .text(c, x + 4, y + 3, { width: colW - 8 });
    });
    // bottom border
    doc.moveTo(startX, y + h).lineTo(startX + fullW, y + h).strokeColor(COLORS.rule).lineWidth(0.5).stroke();
    doc.y = y + h;
    doc.x = startX;
  });
  doc.moveDown(0.5);
  doc.fontSize(10);
}

export function markdownToPdfBuffer(markdown, title) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50, bufferPages: true });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    if (title) {
      doc.font('Helvetica-Bold').fontSize(20).fillColor(COLORS.accent).text(title);
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(9).fillColor(COLORS.muted)
        .text('Gaia Nexus Platform — generated report');
      doc.moveTo(doc.x, doc.y + 4).lineTo(doc.page.width - doc.page.margins.right, doc.y + 4)
        .strokeColor(COLORS.rule).lineWidth(1).stroke();
      doc.moveDown(1);
    }

    const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
    let i = 0;
    while (i < lines.length) {
      const raw = lines[i];
      const line = raw.replace(/\s+$/, '');

      // Table block
      if (/^\s*\|.*\|\s*$/.test(line)) {
        const tbl = [];
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
          const cells = lines[i].trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
          // skip markdown separator row (---|---)
          if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) tbl.push(cells);
          i++;
        }
        doc.fontSize(10);
        renderTable(doc, tbl);
        continue;
      }

      if (line.trim() === '') { doc.moveDown(0.5); i++; continue; }

      if (/^---+$/.test(line.trim())) {
        doc.moveDown(0.3);
        doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .strokeColor(COLORS.rule).lineWidth(1).stroke();
        doc.moveDown(0.5);
        i++; continue;
      }

      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        const level = h[1].length;
        const sizes = { 1: 18, 2: 15, 3: 13, 4: 12, 5: 11, 6: 11 };
        doc.moveDown(0.4);
        if (doc.y > doc.page.height - doc.page.margins.bottom - 60) doc.addPage();
        doc.font('Helvetica-Bold').fontSize(sizes[level] || 11)
          .fillColor(level <= 2 ? COLORS.accent : COLORS.th);
        writeInline(doc, h[2], { color: level <= 2 ? COLORS.accent : COLORS.th });
        doc.moveDown(0.3);
        doc.fontSize(10);
        i++; continue;
      }

      const bullet = line.match(/^(\s*)[-*]\s+(.*)$/);
      if (bullet) {
        const indent = Math.floor(bullet[1].length / 2) * 12;
        doc.fontSize(10);
        const x0 = doc.page.margins.left + indent;
        doc.font('Helvetica').fillColor(COLORS.text).text('•  ', x0, doc.y, { continued: true });
        writeInline(doc, bullet[2], {});
        i++; continue;
      }

      const num = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
      if (num) {
        const indent = Math.floor(num[1].length / 2) * 12;
        doc.fontSize(10);
        const x0 = doc.page.margins.left + indent;
        doc.font('Helvetica').fillColor(COLORS.text).text(num[2] + '.  ', x0, doc.y, { continued: true });
        writeInline(doc, num[3], {});
        i++; continue;
      }

      // paragraph
      doc.fontSize(10);
      writeInline(doc, line, {});
      i++;
    }

    doc.end();
  });
}
