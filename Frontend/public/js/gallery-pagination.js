const templatePagination = document.createElement('template');
templatePagination.innerHTML = `
<style> @import "./../css/app.css";</style>
<div class="max-w-lg p-1 container flex justify-center mx-auto" id="pagination">
    <div class="flex flex-row mx-auto">
        <button type="button" class="bg-gray-700 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-gray-600 hover:text-white px-3" id="previous">
            <div class="flex flex-row align-middle">
                <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
                <p class="ml-2">Previous</p>
            </div>
        </button>
        <button type="button" class="bg-gray-700 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-gray-600 hover:text-white px-3" id="next">
            <div class="flex flex-row align-middle">
                <span class="mr-2">Next</span>
                <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </button>
    </div>
</div>
`;

class galleryPagination extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templatePagination.content.cloneNode(true));
    }

    connectedCallback() {
        let gallery = document.querySelector('app-gallery');
        this.shadowRoot.querySelector('#previous').addEventListener("click", (event) => {
            gallery.previousPage();
        });
        this.shadowRoot.querySelector('#next').addEventListener("click", (event) => {
            gallery.nextPage();
            this.shadowRoot.querySelector('#nec')
            event.target.innerHtml += '<div class="flex justify-center items-center">\n' +
                '  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">\n' +
                '  </div>\n' +
                '</div>';
        });
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener('click', this.clickHandler);
    }

    enableDisable(element,disabled){
        this.shadowRoot.querySelector(`#${element}`).setAttribute('disabled','disabled');
    }


}

window.customElements.define('gallery-pagination', galleryPagination);