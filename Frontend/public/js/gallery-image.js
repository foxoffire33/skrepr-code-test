const template = document.createElement('template');
template.innerHTML = `
<style> @import "./../css/app.css";</style>
<div>
    <div class="w-full p-1 md:p-2">
        <img 
        class="block object-cover object-center w-full h-full rounded-lg shadow shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hover:cursor-pointer" 
        loading="lazy" >
</div>
</div>
`;

class galleryImage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('img').alt = this.getAttribute('alt')
        this.shadowRoot.querySelector('img').src = this.getAttribute('src');
        this.shadowRoot.querySelector('img').addEventListener("click", (event) => {
            const modelElement = document.createElement('gallery-modal');
            this.shadowRoot.appendChild(modelElement);
            modelElement.show(this.getAttribute('id'));
        });
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener('click', this.clickHandler);
    }


}

window.customElements.define('gallery-image', galleryImage);