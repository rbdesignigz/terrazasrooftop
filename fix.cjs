const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

function extractBetween(startMarker, endMarker, fileName) {
    const startIdx = content.indexOf(startMarker);
    const endIdx = endMarker ? content.indexOf(endMarker, startIdx) : content.length;
    if (startIdx !== -1 && endIdx !== -1) {
        let compContent = content.substring(startIdx, endIdx);
        compContent = compContent.replace(/src="\.\/img\//g, 'src="/img/');
        fs.writeFileSync(`src/components/${fileName}`, compContent);
        console.log(`Extracted ${fileName}`);
    } else {
        console.log(`Failed to extract ${fileName} (startIdx: ${startIdx}, endIdx: ${endIdx})`);
    }
}

extractBetween('<section id="servicios"', '<section id="proyectos"', 'Services.astro');
extractBetween('<section id="proyectos"', '<section id="faqs"', 'Projects.astro');
extractBetween('<section id="faqs"', '<section id="contacto"', 'FAQs.astro');
extractBetween('<section id="contacto"', '</main>', 'Contact.astro');
