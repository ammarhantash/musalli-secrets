import { getLang, initLang, t } from '../i18n/index.js';

class WaitlistForm extends HTMLElement {
  connectedCallback() {
    this._lang = initLang();
    this._state = 'idle'; // idle | submitting | success | error
    this._render();
    window.addEventListener('lang-change', (e) => {
      this._lang = e.detail.lang;
      if (this._state !== 'success') this._render();
    });
  }

  _render() {
    const d = t(this._lang).waitlist;
    const isRtl = this._lang === 'ar';
    const inputStyle = `width:100%;padding:0.75rem 1rem;background:#111;border:1px solid #2A2A2A;
                        color:#F0EDE8;font-size:0.85rem;font-family:inherit;outline:none;
                        transition:border-color 0.2s;direction:${isRtl ? 'rtl' : 'ltr'}`;

    if (this._state === 'success') {
      this.innerHTML = `
        <div style="padding:1.5rem;border:1px solid #2A4A2A;background:#0F1F0F;text-align:center">
          <p style="color:#7EC87E;font-size:0.85rem;letter-spacing:0.05em">${d.success}</p>
        </div>`;
      return;
    }

    this.innerHTML = `
      <form id="wl-form" style="display:flex;flex-direction:column;gap:0.75rem">
        <input name="name" placeholder="${d.namePlaceholder}" required
          style="${inputStyle}" onfocus="this.style.borderColor='#C5A059'" onblur="this.style.borderColor='#2A2A2A'"/>
        <input name="email" type="email" placeholder="${d.emailPlaceholder}" required
          style="${inputStyle}" onfocus="this.style.borderColor='#C5A059'" onblur="this.style.borderColor='#2A2A2A'"/>
        <input name="city" placeholder="${d.cityPlaceholder}"
          style="${inputStyle}" onfocus="this.style.borderColor='#C5A059'" onblur="this.style.borderColor='#2A2A2A'"/>
        ${this._state === 'error' ? `<p style="font-size:0.75rem;color:#E07070">${d.error}</p>` : ''}
        <button type="submit" id="wl-btn"
          style="padding:0.9rem;background:#C5A059;color:#0A0A0A;font-size:0.75rem;
                 letter-spacing:0.2em;text-transform:uppercase;font-weight:500;border:none;
                 cursor:pointer;font-family:inherit;transition:background 0.2s;margin-top:0.25rem"
          onmouseover="this.style.background='#A68A4D'" onmouseout="this.style.background='#C5A059'">
          ${this._state === 'submitting' ? d.submitting : d.submit}
        </button>
      </form>`;

    this.querySelector('#wl-form').addEventListener('submit', (e) => this._submit(e));
  }

  async _submit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('#wl-btn');
    const d = t(this._lang).waitlist;

    btn.textContent = d.submitting;
    btn.disabled = true;
    this._state = 'submitting';

    const body = {
      name:  form.name.value.trim(),
      email: form.email.value.trim(),
      city:  form.city.value.trim(),
    };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('api error');
      this._state = 'success';
    } catch {
      this._state = 'error';
    }
    this._render();
  }
}

customElements.define('waitlist-form', WaitlistForm);
