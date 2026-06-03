import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Download, Eye, FileText, X } from 'lucide-react';

const reports = [
  {
    id: 'LR-Q2-2026-W22',
    name: 'Launch Risk Briefing - Q2 2026 W22',
    quarter: 'Q2 2026',
    week: 'Week 22',
    coverage: 'EU clean label, spice commodities, packaging',
    status: 'Published',
    risk: 'High',
    published: 'May 27, 2026',
    owner: 'Sarah Chen',
    summary: "We're seeing significant volatility in key spice commodities heading into Q3, while regulatory bodies in the EU are tightening clean label definitions.",
    metrics: [
      ['Top cost mover', 'Paprika +18%'],
      ['Regulatory signal', 'EU clean label review'],
      ['Supplier watchlist', '8 vendors'],
      ['Launch impact', 'Medium-high']
    ],
    risks: [
      ['Paprika & Capsicum', 'Spot prices have surged 18% in the last 14 days, with further pressure expected through June.'],
      ['Glass Packaging', 'Manufacturers are signaling a potential 5% price increase and longer lead times for small-batch formats.'],
      ['Clean Label Claims', 'EU reviewers are tightening substantiation language around natural flavouring and additive-free claims.']
    ],
    easing: [
      ['Soy Oil', 'Record harvests have stabilized emulsifier costs across the latest supplier quotes.'],
      ['Logistics', 'Port congestion has eased in major Asian hubs, reducing expected delays by 4-6 days.'],
      ['Cold Chain Capacity', 'Regional availability improved after two additional carriers opened summer allocations.']
    ],
    actions: [
      'Lock June paprika pricing for active sauce concepts.',
      'Review label copy for all Q3 clean label launches.',
      'Ask packaging suppliers for alternate jar formats before pilot production.'
    ]
  },
  {
    id: 'LR-Q2-2026-W21',
    name: 'Launch Risk Briefing - Q2 2026 W21',
    quarter: 'Q2 2026',
    week: 'Week 21',
    coverage: 'Dairy alternatives, claims, preservatives',
    status: 'Reviewed',
    risk: 'Medium',
    published: 'May 20, 2026',
    owner: 'Marco Silva',
    summary: 'Dairy alternative launches remain viable, but protein sourcing and preservative positioning need tighter guardrails before Q3 retail sell-in.',
    metrics: [
      ['Top cost mover', 'Pea protein +9%'],
      ['Claims watch', 'No preservatives'],
      ['Supplier watchlist', '5 vendors'],
      ['Launch impact', 'Medium']
    ],
    risks: [
      ['Pea Protein', 'Spot quotes moved up after two European suppliers reduced near-term availability.'],
      ['Preservative-Free Claims', 'Shelf-life language is under closer review where chilled distribution exceeds 14 days.'],
      ['Oat Base Consistency', 'Pilot lots showed viscosity variation across two ingredient sources.']
    ],
    easing: [
      ['Coconut Cream', 'Forward pricing eased after improved inbound availability.'],
      ['Starter Cultures', 'Lead times returned to standard ranges for the main cultures used in spoonable formats.'],
      ['Cold Storage', 'Regional capacity opened in Ireland and the UK for late June production slots.']
    ],
    actions: [
      'Confirm alternate protein supplier specs before scale-up.',
      'Run preservative-free claim copy through regulatory review.',
      'Hold shelf-life assumptions until second pilot data is available.'
    ]
  },
  {
    id: 'LR-Q2-2026-W20',
    name: 'Launch Risk Briefing - Q2 2026 W20',
    quarter: 'Q2 2026',
    week: 'Week 20',
    coverage: 'Cocoa, cartons, vegan claims',
    status: 'Reviewed',
    risk: 'Medium',
    published: 'May 13, 2026',
    owner: 'Priya Raman',
    summary: 'Cocoa volatility remains the main commercial pressure, while vegan claim substantiation is becoming more important for chocolate bakery concepts.',
    metrics: [
      ['Top cost mover', 'Cocoa powder +14%'],
      ['Packaging signal', 'Cartons stable'],
      ['Claims watch', 'Vegan process controls'],
      ['Launch impact', 'Medium']
    ],
    risks: [
      ['Cocoa Powder', 'Suppliers are narrowing quote windows and asking for quicker commitment on volumes.'],
      ['Cross-Contact Controls', 'Vegan concepts need clearer separation evidence where shared chocolate lines are used.'],
      ['Natural Colour', 'Brown shade variation increased in two test batches using reduced cocoa solids.']
    ],
    easing: [
      ['Carton Board', 'Converted carton pricing held flat for the third consecutive week.'],
      ['Vanilla Alternatives', 'Natural flavour blends remain available with no meaningful lead-time change.'],
      ['Retail Timing', 'Buyers indicated flexibility on late Q2 range review submissions.']
    ],
    actions: [
      'Re-cost cocoa-heavy concepts using a 10-15% stress case.',
      'Request vegan line-clearance documentation from co-packers.',
      'Prepare a reduced-cocoa formulation option for margin review.'
    ]
  },
  {
    id: 'LR-Q2-2026-W19',
    name: 'Launch Risk Briefing - Q2 2026 W19',
    quarter: 'Q2 2026',
    week: 'Week 19',
    coverage: 'Sweeteners, shelf life, Benelux retail',
    status: 'Archived',
    risk: 'Low',
    published: 'May 6, 2026',
    owner: 'Sarah Chen',
    summary: 'Sweetener inputs and Benelux retail timing are broadly stable, with shelf-life validation the only notable watch item for low-sugar launches.',
    metrics: [
      ['Top cost mover', 'Erythritol +3%'],
      ['Retail signal', 'Benelux stable'],
      ['Validation watch', 'Shelf life'],
      ['Launch impact', 'Low']
    ],
    risks: [
      ['Erythritol', 'Small price movement is manageable but should be reflected in low-sugar margin models.'],
      ['Shelf-Life Testing', 'Reduced sugar formats need additional water activity checks after flavour changes.'],
      ['Dutch Translation', 'A few front-of-pack claims require local-language review before artwork lock.']
    ],
    easing: [
      ['Stevia Blends', 'Supply remains stable with multiple approved alternates available.'],
      ['Benelux Listings', 'Retail calendars are holding and no buyer delays were reported.'],
      ['Flexible Pouches', 'Film availability improved for smaller trial formats.']
    ],
    actions: [
      'Update low-sugar costing assumptions with latest sweetener quotes.',
      'Add water activity checks to the validation plan.',
      'Send Dutch and French claim translations for review.'
    ]
  },
  {
    id: 'LR-Q2-2026-W18',
    name: 'Launch Risk Briefing - Q2 2026 W18',
    quarter: 'Q2 2026',
    week: 'Week 18',
    coverage: 'Protein isolates, allergens, chilled meals',
    status: 'Archived',
    risk: 'High',
    published: 'Apr 29, 2026',
    owner: 'Niamh Kelly',
    summary: 'Protein isolate pressure and allergen-control complexity create elevated launch risk for chilled ready-meal concepts.',
    metrics: [
      ['Top cost mover', 'Soy isolate +16%'],
      ['Allergen watch', 'Soy and milk'],
      ['Supplier watchlist', '7 vendors'],
      ['Launch impact', 'High']
    ],
    risks: [
      ['Soy Isolate', 'Two suppliers shortened validity windows and flagged constrained summer allocation.'],
      ['Allergen Controls', 'Shared chilled-meal lines need stronger cleaning validation for soy and milk cross-contact.'],
      ['Protein Claim Delivery', 'Reformulation options risk falling below high-protein claim thresholds.']
    ],
    easing: [
      ['Pea Isolate', 'Secondary pea isolate supply is available, though sensory impact needs validation.'],
      ['Tray Sealing Film', 'Film lead times normalized after earlier allocation pressure.'],
      ['Chilled Transport', 'Carrier availability improved for weekly launch trial lanes.']
    ],
    actions: [
      'Reserve soy isolate allocation for priority concepts.',
      'Run allergen-control review before pilot confirmation.',
      'Prepare a pea-protein backup formula for sensory screening.'
    ]
  },
  {
    id: 'LR-Q2-2026-W17',
    name: 'Launch Risk Briefing - Q2 2026 W17',
    quarter: 'Q2 2026',
    week: 'Week 17',
    coverage: 'Tomato paste, pouches, Mediterranean flavours',
    status: 'Archived',
    risk: 'Medium',
    published: 'Apr 22, 2026',
    owner: 'Marco Silva',
    summary: 'Mediterranean flavour platforms remain attractive, but tomato paste quality bands and pouch lead times require active management.',
    metrics: [
      ['Top cost mover', 'Tomato paste +7%'],
      ['Packaging signal', 'Pouches tight'],
      ['Flavour watch', 'Herb oils'],
      ['Launch impact', 'Medium']
    ],
    risks: [
      ['Tomato Paste', 'Higher brix material is tightening and lower grades may alter finished colour.'],
      ['Retort Pouches', 'Printed pouch lead times are longer than planned for two trial formats.'],
      ['Herb Oils', 'Basil and oregano oil lots show broader sensory variation than approved standards.']
    ],
    easing: [
      ['Olive Oil', 'Contracted volumes are secure through the next pilot window.'],
      ['Acidulants', 'Citric acid pricing remains steady and widely available.'],
      ['Mediterranean Claims', 'No material regulatory changes were flagged for current naming.']
    ],
    actions: [
      'Approve a secondary tomato paste grade before scale-up.',
      'Move pouch artwork approval up by one week.',
      'Request herb oil sensory retains with each supplier quote.'
    ]
  }
];

const riskValue = { High: 3, Medium: 2, Low: 1 };

function weekNumber(value) {
  return Number(String(value).replace(/\D/g, '')) || 0;
}

function quarterValue(value) {
  const match = String(value).match(/Q(\d)\s+(\d{4})/);
  return match ? Number(match[2]) * 10 + Number(match[1]) : 0;
}

function reportValue(report, key) {
  if (key === 'quarter') return quarterValue(report.quarter);
  if (key === 'week') return weekNumber(report.week);
  if (key === 'risk') return riskValue[report.risk] || 0;
  if (key === 'published') return new Date(report.published).getTime();
  return report[key] || '';
}

function pdfText(value) {
  return String(value).replace(/[\\()]/g, '\\$&').replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '');
}

function wrapPdfLine(text, max = 82) {
  const words = String(text).split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    if ((line + ' ' + word).trim().length > max) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  });
  if (line) lines.push(line);
  return lines;
}

function reportPdfLines(report) {
  const lines = [
    report.name,
    `${report.id} | ${report.quarter} | ${report.week} | Published ${report.published}`,
    `Owner: ${report.owner} | Risk: ${report.risk}`,
    '',
    'Summary'
  ];
  lines.push(...wrapPdfLine(report.summary));
  lines.push('', 'Metrics');
  report.metrics.forEach(([label, value]) => lines.push(`${label}: ${value}`));
  lines.push('', 'Supply & Cost Risks');
  report.risks.forEach(([title, body]) => {
    lines.push(title);
    lines.push(...wrapPdfLine(body));
  });
  lines.push('', 'Easing Pressures');
  report.easing.forEach(([title, body]) => {
    lines.push(title);
    lines.push(...wrapPdfLine(body));
  });
  lines.push('', 'Recommended Next Steps');
  report.actions.forEach((action) => lines.push(`- ${action}`));
  return lines;
}

function downloadReportPdf(report) {
  const lines = reportPdfLines(report);
  const pages = [];
  for (let index = 0; index < lines.length; index += 42) pages.push(lines.slice(index, index + 42));

  const fontRef = 3 + pages.length * 2;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index * 2} 0 R`).join(' ')}] /Count ${pages.length} >>`
  ];

  pages.forEach((pageLines, index) => {
    const pageRef = 3 + index * 2;
    const contentRef = pageRef + 1;
    const body = ['BT', '/F1 11 Tf', '50 760 Td', '14 TL', ...pageLines.map((line) => `(${pdfText(line)}) Tj T*`), 'ET'].join('\n');
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontRef} 0 R >> >> /Contents ${contentRef} 0 R >>`);
    objects.push(`<< /Length ${body.length} >>\nstream\n${body}\nendstream`);
  });

  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
  link.download = `${report.id}.pdf`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function Risk() {
  const [sort, setSort] = useState({ key: 'published', dir: 'desc' });
  const [openReport, setOpenReport] = useState(null);

  const rows = useMemo(() => [...reports].sort((a, b) => {
    const av = reportValue(a, sort.key);
    const bv = reportValue(b, sort.key);
    const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sort.dir === 'asc' ? result : -result;
  }), [sort]);

  const head = (label, key) => {
    const active = sort.key === key;
    const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown;
    const nextDir = active && sort.dir === 'asc' ? 'desc' : 'asc';

    return (
      <button
        className={'sortHeader ' + (active ? 'sortHeaderActive' : '')}
        onClick={() => setSort((current) => current.key === key ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })}
        aria-label={`Sort by ${label} ${nextDir === 'asc' ? 'ascending' : 'descending'}`}
      >
        {label}
        <Icon className="sortIcon" size={13} strokeWidth={2.4} />
      </button>
    );
  };

  return (
    <div className="riskPage">
      <div className="pageTitle">
        <h1>Launch Risk Intelligence</h1>
        <p>Curated weekly risk briefings by our industry experts.</p>
      </div>

      <section className="conceptLibrary reportLibrary">
        <div className="conceptToolbar">
          <div className="reportLibraryTitle">
            <FileText size={16} />
            <b>Weekly report library</b>
          </div>
          <button className="reportAction">Export list <Download size={14} /></button>
        </div>
        <div className="riskListHeader">
          {head('Latest first', 'published')}
          {head('Risk level', 'risk')}
          {head('Quarter', 'quarter')}
        </div>
        <div className="riskList">
          {rows.map((report) => (
            <button
              key={report.id}
              className={'riskListItem ' + (openReport?.id === report.id ? 'isActive' : '')}
              onClick={() => setOpenReport(report)}
            >
              <div className="riskListMain">
                <span className="riskListName"><Eye size={14} /> {report.name}</span>
                <small>{report.id}</small>
              </div>
              <div className="riskListMeta">
                <span>{report.quarter}</span>
                <span>{report.week}</span>
                <span>{report.published}</span>
                <span className={'riskBadge risk' + report.risk}>{report.risk} risk</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {openReport && <ReportDrawer report={openReport} onClose={() => setOpenReport(null)} />}
    </div>
  );
}

function ReportDrawer({ report, onClose }) {
  return (
    <aside className="conceptDrawer reportDrawer">
      <div className="drawerHeader">
        <div>
          <b>{report.id}</b>
          <h2>{report.name}</h2>
        </div>
        <button onClick={onClose} aria-label="Close report"><X size={16} /></button>
      </div>

      <div className="drawerMeta">
        <span>{report.quarter}</span>
        <span>{report.week}</span>
        <span>{report.published}</span>
        <span>{report.owner}</span>
        <span className={'riskBadge risk' + report.risk}>{report.risk} risk</span>
      </div>

      <button className="drawerPdfButton" onClick={() => downloadReportPdf(report)}>
        <Download size={15} />
        Download PDF
      </button>

      <blockquote>{report.summary}</blockquote>

      <div className="reportMetricGrid">
        {report.metrics.map(([label, value]) => (
          <div className="reportMetric" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>

      <div className="briefGrid">
        <div>
          <h3 className="down">Supply & Cost Risks</h3>
          {report.risks.map(([title, body]) => <p key={title}><b>{title}</b><br />{body}</p>)}
        </div>
        <div>
          <h3 className="up">Easing Pressures</h3>
          {report.easing.map(([title, body]) => <p key={title}><b>{title}</b><br />{body}</p>)}
        </div>
      </div>

      <div className="reportActionsBlock">
        <h3>Recommended Next Steps</h3>
        <ul>{report.actions.map((action) => <li key={action}>{action}</li>)}</ul>
      </div>
    </aside>
  );
}
