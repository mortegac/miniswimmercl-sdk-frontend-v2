// docs/webpay/getCompleteDocs.js
import axios from 'axios';
import { writeFile, mkdir } from 'fs/promises';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URLS_TO_SCRAPE = [
  'https://www.transbankdevelopers.cl/documentacion/webpay-plus',
  'https://www.transbankdevelopers.cl/documentacion/webpay-plus#crear-una-transaccion',
  'https://www.transbankdevelopers.cl/documentacion/webpay-plus#confirmar-una-transaccion',
  'https://www.transbankdevelopers.cl/documentacion/webpay-plus#obtener-estado-de-una-transaccion',
];

async function scrapeTransbankDocs() {
  try {
    // Crear directorio de salida
    const outputDir = join(__dirname, 'scraped-docs');
    await mkdir(outputDir, { recursive: true });
    
    const allDocs = [];
    
    for (const url of URLS_TO_SCRAPE) {
      console.log(`Extrayendo: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      
      const dom = new JSDOM(response.data);
      const document = dom.window.document;
      
      // Extraer título
      const title = document.querySelector('h1, title')?.textContent?.trim() || 'Sin título';
      
      // Extraer contenido principal
      const content = document.querySelector('main, .content, article, .documentation')?.textContent?.trim() || '';
      
      // Extraer ejemplos de código
      const codeBlocks = Array.from(document.querySelectorAll('pre code, .highlight'))
        .map(block => block.textContent.trim())
        .filter(code => code.length > 10);
      
      const docData = {
        url,
        title,
        content: content.substring(0, 5000), // Limitar tamaño
        codeExamples: codeBlocks
      };
      
      allDocs.push(docData);
      
      // Pequeña pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Guardar documentación completa
    const fullDocsPath = join(outputDir, 'webpay-complete-docs.json');
    await writeFile(fullDocsPath, JSON.stringify(allDocs, null, 2));
    
    // Crear archivo markdown resumido
    const markdownContent = allDocs.map(doc => 
      `## ${doc.title}\n\n**URL:** ${doc.url}\n\n${doc.content}\n\n### Ejemplos de Código\n\n${doc.codeExamples.map(code => `\`\`\`\n${code}\n\`\`\``).join('\n\n')}\n\n---\n\n`
    ).join('');
    
    const markdownPath = join(outputDir, 'webpay-docs.md');
    await writeFile(markdownPath, `# Documentación Webpay Plus\n\n${markdownContent}`);
    
    console.log(`✅ Documentación completa guardada en: ${outputDir}`);
    console.log(`📄 JSON: ${fullDocsPath}`);
    console.log(`📝 Markdown: ${markdownPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar
scrapeTransbankDocs();
