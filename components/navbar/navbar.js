class CapstackNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-navbar" aria-label="Primary navigation"><div class="site-navbar__inner">
        <a class="brand" href="/" aria-label="CAPSTACK home"><img class="brand__mark" src="/Capstack_logo.png" alt="" /><span>CAPSTACK</span></a>
        <nav class="navigation" aria-label="Main menu">
          <details class="nav-services" data-nav-dropdown>
            <summary class="nav-trigger" aria-controls="services-menu" aria-expanded="false">Services</summary>
            <div class="services-menu" id="services-menu"><section class="services-panel"><p>Our Services</p><div class="services-grid"><a href="/services/website-development"><i class="menu-icon menu-icon--website" aria-hidden="true"></i><span><b>Website Development</b><small>High-performance, scalable websites</small></span></a><a href="/services/saas-product-development"><i class="menu-icon menu-icon--product" aria-hidden="true"></i><span><b>SaaS &amp; Product Development</b><small>End-to-end products built to scale</small></span></a><a href="/services/workflow-automation"><i class="menu-icon menu-icon--automation" aria-hidden="true"></i><span><b>Workflow Automation</b><small>Automate operations and reduce manual work</small></span></a><a href="/services/api-system-integrations"><i class="menu-icon menu-icon--integration" aria-hidden="true"></i><span><b>API &amp; System Integrations</b><small>Connect your tools, data, and platforms</small></span></a></div></section></div>
          </details>
          <details class="nav-solutions" data-nav-dropdown>
            <summary class="nav-trigger" aria-controls="solutions-menu" aria-expanded="false">Solutions</summary>
            <div class="solutions-menu" id="solutions-menu"><section class="solutions-panel"><p>Solutions for your stage</p><div class="solutions-grid"><a href="/solutions/startups"><i class="solution-icon solution-icon--startup" aria-hidden="true"></i><span><b>For Startups</b></span></a><a href="/solutions/growing-businesses"><i class="solution-icon solution-icon--growing" aria-hidden="true"></i><span><b>For Growing Businesses</b></span></a></div></section></div>
          </details>
          <a href="/work">Work</a>
          <a href="/process">Process</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
        </nav>
        <div class="navbar__end"><i aria-hidden="true"></i><a class="header-cta" href="/contact/start-a-project">Start a Project <span aria-hidden="true">↗</span></a><button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation"><span></span><span></span><span></span><b class="sr-only">Open navigation</b></button></div>
        <nav class="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" hidden><details data-nav-dropdown><summary>Services</summary><a href="/services/website-development">Website Development</a><a href="/services/saas-product-development">SaaS &amp; Product Development</a><a href="/services/workflow-automation">Workflow Automation</a><a href="/services/api-system-integrations">API &amp; System Integrations</a></details><details data-nav-dropdown><summary>Solutions</summary><a href="/solutions/startups"><i class="solution-icon solution-icon--startup" aria-hidden="true"></i>For Startups</a><a href="/solutions/growing-businesses"><i class="solution-icon solution-icon--growing" aria-hidden="true"></i>For Growing Businesses</a></details><a href="/work">Work</a><a href="/process">Process</a><a href="/about">About</a><a href="/faq">FAQ</a></nav>
      </div></header>`;

    const dropdowns = [...this.querySelectorAll('[data-nav-dropdown]')];
    const services = this.querySelector('.nav-services');
    const mobileToggle = this.querySelector('.mobile-menu-toggle');
    const mobileNavigation = this.querySelector('.mobile-navigation');
    let closeTimer;
    let pinnedDropdown = null;

    const isDesktop = () => window.matchMedia('(min-width: 1141px)').matches;
    const syncExpanded = (dropdown) => {
      const summary = dropdown.querySelector('summary');
      if (summary) summary.setAttribute('aria-expanded', String(dropdown.open));
    };
    const closeDropdowns = () => {
      pinnedDropdown = null;
      dropdowns.forEach((dropdown) => { dropdown.open = false; syncExpanded(dropdown); });
    };
    const closeDesktopDropdown = () => { if (isDesktop()) closeDropdowns(); };

    dropdowns.forEach((dropdown) => {
      syncExpanded(dropdown);
      dropdown.querySelector('summary').addEventListener('click', (event) => {
        event.preventDefault();
        const nextOpen = !dropdown.open;
        pinnedDropdown = nextOpen ? dropdown : null;
        dropdown.open = nextOpen;
        syncExpanded(dropdown);
      });
      dropdown.addEventListener('toggle', () => {
        syncExpanded(dropdown);
        if (dropdown.open) dropdowns.filter((other) => other !== dropdown).forEach((other) => { other.open = false; syncExpanded(other); });
      });
      dropdown.addEventListener('mouseenter', () => {
        if (!isDesktop()) return;
        clearTimeout(closeTimer);
        if (!pinnedDropdown) {
          dropdown.open = true;
          syncExpanded(dropdown);
        }
      });
      dropdown.addEventListener('mouseleave', () => {
        if (!isDesktop()) return;
        if (pinnedDropdown) return;
        closeTimer = setTimeout(closeDesktopDropdown, 180);
      });
    });

    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    this.querySelectorAll('a[href]').forEach((link) => {
      const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname.replace(/\/+$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
      link.addEventListener('click', () => {
        closeDropdowns();
        mobileNavigation.hidden = true;
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    this.handleOutsidePointer = (event) => {
      if (!this.contains(event.target)) {
        closeDropdowns();
        mobileNavigation.hidden = true;
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    };
    document.addEventListener('pointerdown', this.handleOutsidePointer);
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDropdowns();
        mobileNavigation.hidden = true;
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNavigation.hidden;
      mobileNavigation.hidden = !isOpen;
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.handleOutsidePointer);
  }
}

customElements.define('capstack-navbar', CapstackNavbar);
