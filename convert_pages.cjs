const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../running_website');
const targetPagesDir = path.resolve(__dirname, 'src/pages');

const pageConfig = {
  'index.html': {
    out: ['index.astro'],
    title: 'Tripower Mold Tech | Advanced Tooling & Precision Injection Mold Solutions',
    description: 'Operating from our 1,500 sq. ft. precision facility in Thirumudivakkam, Chennai. Equipped with Makino VMC CNC centers, Wire EDM, and full CMM metrology for sub-micron tooling in mission-critical applications.',
    currentPage: 'home'
  },
  'about-us.html': {
    out: ['about-us.astro'],
    title: 'About Us | Tripower Mold Tech - Precision Engineering Excellence',
    description: 'Learn about Tripower Mold Tech, our history, ISO 9001:2015 certified toolroom in Thirumudivakkam, Chennai, leadership team, and precision engineering philosophy.',
    currentPage: 'about-us'
  },
  'services-d3-solutions.html': {
    out: ['services.astro', 'services-d3-solutions.astro'],
    title: 'Services & D3 Solutions | Tripower Mold Tech',
    description: 'End-to-end tooling services: Design, Development, Delivery. Precision Plastic Injection Molds, Insert & Multi-Cavity Tooling, D3 CAD/CAM/CAE Engineering.',
    currentPage: 'services'
  },
  'capabilities-portfolio.html': {
    out: ['capabilities.astro', 'capabilities-portfolio.astro'],
    title: 'Capabilities & Portfolio | Tripower Mold Tech',
    description: 'Explore our high-speed Makino CNC centers, Wire EDM, precision inspection metrology, and proven tooling project portfolio.',
    currentPage: 'capabilities'
  },
  'contact-us.html': {
    out: ['contact.astro', 'contact-us.astro'],
    title: 'Contact Us | Tripower Mold Tech - Thirumudivakkam, Chennai',
    description: 'Get in touch with Tripower Mold Tech plant at Thirumudivakkam, Chennai. Call +91 9176729970, email or schedule a facility visit.',
    currentPage: 'contact'
  },
  'rfq-portal.html': {
    out: ['rfq.astro', 'rfq-portal.astro'],
    title: 'RFQ Portal | Submit Tooling RFQ - Tripower Mold Tech',
    description: 'Submit your 2D drawings or 3D CAD (.STEP / .IGS / .X_T) for preliminary DFM assessment and formal quotation within 24 hours.',
    currentPage: 'rfq'
  }
};

function normalizeLinks(html) {
  return html
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="about-us\.html"/g, 'href="/about-us"')
    .replace(/href="services-d3-solutions\.html"/g, 'href="/services"')
    .replace(/href="capabilities-portfolio\.html"/g, 'href="/capabilities"')
    .replace(/href="contact-us\.html"/g, 'href="/contact"')
    .replace(/href="rfq-portal\.html"/g, 'href="/rfq"');
}

for (const [htmlFile, config] of Object.entries(pageConfig)) {
  const filePath = path.join(srcDir, htmlFile);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  const rawHtml = fs.readFileSync(filePath, 'utf8');

  // Extract <main> content
  const mainMatch = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.error(`No <main> found in ${htmlFile}`);
    continue;
  }

  let mainInner = mainMatch[1].trim();

  // If mainInner starts with <div class="flex flex-col w-full"> and ends with </div>, extract its contents
  // because BaseLayout already wraps slot with <div class="flex flex-col w-full">
  const wrapperMatch = mainInner.match(/^<div class="flex flex-col w-full">([\s\S]*)<\/div>$/i);
  if (wrapperMatch) {
    mainInner = wrapperMatch[1].trim();
  }

  // Extract any custom scripts outside or inside main
  const scripts = [...rawHtml.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
  const customScripts = scripts.filter(s => !s.includes('cdn.tailwindcss.com') && !s.includes('tailwind.config'));

  // Normalize links in mainInner
  mainInner = normalizeLinks(mainInner);

  // Normalize links in scripts if any
  const normalizedScripts = customScripts.map(s => normalizeLinks(s)).join('\n\n');

  const astroFileContent = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="${config.title}" description="${config.description}" currentPage="${config.currentPage}">
${mainInner}

${normalizedScripts ? `${normalizedScripts}\n` : ''}</BaseLayout>
`;

  for (const outFile of config.out) {
    const destPath = path.join(targetPagesDir, outFile);
    fs.writeFileSync(destPath, astroFileContent, 'utf8');
    console.log(`Generated: ${destPath} (${astroFileContent.length} bytes)`);
  }
}

console.log('All pages generated successfully!');
