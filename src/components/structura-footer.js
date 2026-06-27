class StructuraFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer style="border-top:1px solid #242424;padding:2.5rem 2rem">
        <div style="max-width:80rem;margin:0 auto;display:flex;flex-direction:column;gap:1rem;align-items:center;text-align:center">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;width:100%;gap:1rem">
            <span style="font-family:'Playfair Display',serif;font-size:0.85rem;letter-spacing:0.4em;color:#F5F5F5;font-weight:300">STRUCTURA</span>
            <span style="font-size:0.7rem;color:#555;letter-spacing:0.05em">Parametric Jewelry · BIM Design System · Riyadh · Jeddah</span>
            <span style="font-size:0.7rem;color:#444">© ${year} Structura. All rights reserved.</span>
          </div>
        </div>
      </footer>`;
  }
}
customElements.define('structura-footer', StructuraFooter);
