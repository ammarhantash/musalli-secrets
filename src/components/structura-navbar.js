class StructuraNavbar extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active');
    this.innerHTML = `
      <header style="position:sticky;top:0;z-index:50;border-bottom:1px solid #2A2A2A;background:rgba(26,26,26,0.9);backdrop-filter:blur(8px)">
        <nav style="max-width:80rem;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px">
          <a href="./index.html" style="font-family:'Playfair Display',serif;font-size:1.25rem;letter-spacing:0.4em;color:#F5F5F5;text-decoration:none;font-weight:300">
            STRUCTURA
          </a>
          <ul style="display:flex;align-items:center;gap:2rem;list-style:none">
            <li>
              <a href="./catalog.html" style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;transition:color 0.2s;color:${active === 'catalog' ? '#C5A059' : '#CCCCCC'}">
                Collection
              </a>
            </li>
            <li>
              <a href="./index.html" style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;transition:color 0.2s;color:${active === 'home' ? '#C5A059' : '#CCCCCC'}">
                Studio
              </a>
            </li>
          </ul>
        </nav>
      </header>`;
  }
}
customElements.define('structura-navbar', StructuraNavbar);
