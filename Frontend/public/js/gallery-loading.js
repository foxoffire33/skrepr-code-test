const templateGalleryLoading = document.createElement('template');
templateGalleryLoading.innerHTML = `
<style> @import "./../css/app.css";</style>
<div class="flex animate-pulse p-1 md:p-2 m-2">
    <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
    <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
        <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
    </div>
    </div>
    <div class="flex animate-pulse p-1 md:p-2 m-2">
    <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
        <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
        <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
    </div>
    <div class="flex animate-pulse p-1 md:p-2 m-2">
    <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
        <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
        <div class="flex border shadow shadow-md rounded-md p-4 max-w-sm mx-auto w-1/3 h-44 justify-center text-center text-gray-600" >
        Loading image
    </div>
</div>
`;

class galleryLoading extends HTMLElement {

    pageNumber = 1;
    imagesOnPage = 9;
    searchText = 'nature';
    images = [];

    pagination = document.querySelector('gallery-pagination');

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateGalleryLoading.content.cloneNode(true));
    }
}

window.customElements.define('gallery-loading', galleryLoading);