import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const shell = await readFile(join(output, 'index.html'), 'utf8');
const routes = {
  'zevian': ['Zevian — AI performance workflow case study', 'How Zevian turns weekly work reports into evidence-backed performance signals that managers can review and question.'],
  'zevian-hrms': ['Zevian HRMS — Interface system case study', 'An earlier HRMS concept and reusable interface system for attendance, employee records, calendars, approvals and work policies.'],
  'orderific': ['Orderific — Design system case study', 'A shared component system across six restaurant products with RTL, LTR and theme-mode support.'],
  'purno': ['Purno — POS product case study', 'A point-of-sale system connecting shop sales, inventory, payments and daily retail operations.'],
  'jayga': ['Jayga — Warehouse operations case study', 'A warehouse system connecting storage, pricing, billing, delivery and fulfilment.'],
  'portfolio': ['Portfolio redesign — Reza Al Hassan', 'How this portfolio moved from moodboards and section studies into one clear editorial design system.'],
};

const escapeHtml = (value) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const decode = (value) => value.replaceAll('&nbsp;',' ').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replace(/&#(\d+);/g, (_,code) => String.fromCharCode(Number(code)));
const toMarkdown = (html, title, description, slug) => {
  const content = html
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '\n# $1\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '\n### $1\n')
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/g, '\nCaption: $1\n')
    .replace(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g, '\n- **$1:** $2\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '\n$1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '\n- $1')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return `# ${title}\n\n> ${description}\n\n${decode(content)}\n\n---\n\n[View the visual case study](/${slug})\n`;
};

const vite = await createServer({ root, configFile:false, server:{ middlewareMode:true }, appType:'custom', logLevel:'error' });
try {
  const { App } = await vite.ssrLoadModule('/src/main.jsx');
  for (const [slug, [title, description]] of Object.entries(routes)) {
    const rendered = renderToString(React.createElement(App, { initialPath:`/${slug}` }));
    const jsonLd = JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:title,description,author:{'@type':'Person',name:'Reza Al Hassan',jobTitle:'Product Designer'},inLanguage:'en',url:`/${slug}`}).replaceAll('<','\\u003c');
    const html = shell
      .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
      .replace(/<meta name="description" content=".*?"\s*\/?>/s, `<meta name="description" content="${escapeHtml(description)}" />`)
      .replace('</head>', `<link rel="alternate" type="text/markdown" href="/ai/${slug}.md" title="AI-readable case study" /><script type="application/ld+json">${jsonLd}</script></head>`)
      .replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
    const htmlPath = join(output, slug, 'index.html');
    await mkdir(dirname(htmlPath), { recursive:true });
    await writeFile(htmlPath, html);
    const markdownPath = join(output, 'ai', `${slug}.md`);
    await mkdir(dirname(markdownPath), { recursive:true });
    await writeFile(markdownPath, toMarkdown(rendered, title, description, slug));
  }
} finally {
  await vite.close();
}

console.log(`Generated ${Object.keys(routes).length} complete HTML and Markdown case studies.`);
