class CapstackFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__content">
          <section class="site-footer__brand" aria-label="CAPSTACK">
            <a class="site-footer__logo" href="/" aria-label="CAPSTACK home"><img src="/Capstack_logo.png" alt="" /><span>CAPSTACK</span></a>
            <p>Software engineering for startups<br />and growing businesses.</p>
            <nav class="site-footer__social" aria-label="Social media">
              <a href="https://www.linkedin.com" aria-label="CAPSTACK on LinkedIn" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 8.3A2.1 2.1 0 1 0 6.2 4a2.1 2.1 0 0 0 0 4.3ZM4.4 20h3.7V9.8H4.4V20Zm6.1 0h3.7v-5c0-1.3.3-2.6 1.9-2.6s1.6 1.6 1.6 2.7V20h3.7v-5.6c0-3.4-.7-6-4.7-6-1.9 0-3.2 1-3.7 2.1h-.1V9.8h-3.5V20Z" /></svg></a>
              <a href="https://github.com" aria-label="CAPSTACK on GitHub" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.3-.3-4.7-1.2-4.7-5.2 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4-2.4 4.9-4.7 5.2.4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.4Z" /></svg></a>
              <a href="https://x.com" aria-label="CAPSTACK on X" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.8h3.8l3.7 5 4.2-5h1.8l-5.2 6.1 5.7 8.3h-3.8l-4.1-5.8-4.9 5.8H3.4l5.7-6.8L4 4.8Zm2.9 1.4 8.2 11.6h1.4L8.3 6.2H6.9Z" /></svg></a>
              <a href="https://www.youtube.com" aria-label="CAPSTACK on YouTube" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.2 7.1a2.7 2.7 0 0 0-1.9-1.9C17.6 4.7 12 4.7 12 4.7s-5.6 0-7.3.5A2.7 2.7 0 0 0 2.8 7.1 28 28 0 0 0 2.3 12c0 1.7.2 3.3.5 4.9a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.3.5 7.3.5s5.6 0 7.3-.5a2.7 2.7 0 0 0 1.9-1.9c.3-1.6.5-3.2.5-4.9s-.2-3.3-.5-4.9ZM10 15.6V8.4l6 3.6-6 3.6Z" /></svg></a>
            </nav>
          </section>
          <div class="site-footer__divider" aria-hidden="true"></div>
          <nav class="site-footer__links" aria-label="Footer navigation">
            <section><h2>Services</h2><a href="/services/website-development">Website Development</a><a href="/services/saas-product-development">SaaS &amp; Product Development</a><a href="/services/workflow-automation">Workflow Automation</a><a href="/services/api-system-integrations">API &amp; System Integrations</a></section>
            <section><h2>Company</h2><a href="/about">About</a><a href="/work">Work</a><a href="/process">Process</a><a href="/contact">Contact</a></section>
            <section><h2>Resources</h2><a href="/faq">FAQ</a><a href="/engineering-principles">Engineering Principles</a><a href="/guides">Guides</a><a href="/blog">Blog</a></section>
          </nav>
        </div>
        <div class="site-footer__legal"><span>© <span data-footer-year></span> CAPSTACK. All rights reserved.</span><span><a href="/privacy">Privacy Policy</a><i aria-hidden="true">|</i><a href="/terms">Terms of Service</a></span></div>
        <div class="site-footer__architecture" aria-hidden="true"><img src="/footer_demo_image.png" alt="" /></div>
      </footer>`;
    this.querySelector('[data-footer-year]').textContent = new Date().getFullYear();
  }
}
customElements.define('capstack-footer', CapstackFooter);
