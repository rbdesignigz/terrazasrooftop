const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const extract = (startTag, endTag, file) => {
    const startIdx = content.indexOf(startTag);
    const endIdx = content.indexOf(endTag) + endTag.length;
    if (startIdx !== -1 && endIdx !== -1) {
        let compContent = content.substring(startIdx, endIdx);
        // Fix image paths
        compContent = compContent.replace(/src="\.\/img\//g, 'src="/img/');
        fs.writeFileSync(`src/components/${file}`, compContent);
    } else {
        console.log('Could not extract', file);
    }
};

extract('<!-- BEGIN: MainHeader -->', '<!-- END: MainHeader -->', 'Header.astro');
extract('<!-- BEGIN: HeroSection -->', '<!-- END: HeroSection -->', 'Hero.astro');
extract('<!-- BEGIN: AboutSection -->', '<!-- END: AboutSection -->', 'About.astro');
extract('<!-- BEGIN: StatsSection -->', '<!-- END: StatsSection -->', 'Stats.astro');
extract('<!-- BEGIN: ServicesSection -->', '<!-- END: ServicesSection -->', 'Services.astro');
extract('<!-- BEGIN: StackedCardsSection', '<!-- END: StackedCardsSection -->', 'Projects.astro');
extract('<!-- BEGIN: FAQSection -->', '<!-- END: FAQSection -->', 'FAQs.astro');
extract('<!-- BEGIN: ContactSection -->', '<!-- END: ContactSection -->', 'Contact.astro');
extract('<!-- BEGIN: MainFooter -->', '<!-- END: MainFooter -->', 'Footer.astro');

const scriptStart = content.indexOf('<script>', content.indexOf('<!-- END: MainFooter -->'));
const scripts = content.substring(scriptStart, content.indexOf('</body>'));

const indexContent = `---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Stats from '../components/Stats.astro';
import Services from '../components/Services.astro';
import Projects from '../components/Projects.astro';
import FAQs from '../components/FAQs.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
    <Header />
    <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Projects />
        <FAQs />
        <Contact />
    </main>
    <Footer />
    ${scripts}
</Layout>
`;

fs.writeFileSync('src/pages/index.astro', indexContent);
