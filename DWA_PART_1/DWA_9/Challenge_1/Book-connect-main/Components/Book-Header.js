class BookHeader extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <header class="header">
        
    `;
  }
}
  
// I will define the custom element for the BookHeader component
customElements.define('book-header', BookHeader);
