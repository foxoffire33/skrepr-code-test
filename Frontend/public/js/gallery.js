const templateGallery = document.createElement('template');
templateGallery.innerHTML = `
<style> @import "./../css/app.css";</style>
<section class="overflow-hidden text-gray-700">
    <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <p id="gallerySummary" class="flex flex-wrap text-center container mx-auto lg:pt-12 lg:px-32"></p>
         <div class="flex flex-wrap -m-1 md:-m-2" id="x-gallery" />  
    </div>
    <div id="x-gallery-loading" />
</section>
`;

class gallery extends HTMLElement {

    pageNumber = 1;
    imagesOnPage = 9;
    searchText = 'nature';
    searchMessage = '';

    totalPhotos = 0;
    showingStart = 0;
    showingEnd = 0;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateGallery.content.cloneNode(true));
    }

    async connectedCallback() {
        this.render(await this.searchImages());
    }

    disconnectedCallback() {
        document.querySelector('#searchInput').removeEventListener('input', async (event) => {
        })
    }

    async searchImages() {
        const gallery = this.shadowRoot.getElementById('x-gallery');
        gallery.innerHTML = null;

        const loading = this.shadowRoot.appendChild(document.createElement('gallery-loading'));

        const apiKey = '563492ad6f91700001000001ec5c3cb3823a4e8a968fb73f70eeab83';
        const url = `https://api.pexels.com/v1/search?query=${this.searchText}&per_page=${this.imagesOnPage}&page=${this.pageNumber}`;
        const response = await fetch(url, {
            method: 'GET', headers: {
                'Authorization': apiKey, 'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        loading.remove();

        return response;
    }

    render(response) {
        if (Array.isArray(response.photos) && response.photos.length > 0) {
            const gallery = this.shadowRoot.getElementById('x-gallery');
            gallery.innerHTML = null;
            this.totalPhotos = response.total_results;
            this.showingStart = (response.per_page * (response.page - 1));
            this.showingEnd = response.photos.length * response.page;

            const summary = this.shadowRoot.querySelector('#gallerySummary');
            summary.innerHTML = `Showing ${this.showingStart} to  ${this.showingEnd} from ${this.totalPhotos}`;
            this.shadowRoot.querySelector('section').prepend(summary);

            response.photos.forEach(photo => {
                const galleryImage = document.createElement('gallery-image');
                galleryImage.setAttribute('alt', photo.alt);
                galleryImage.setAttribute('src', photo.src.medium);
                galleryImage.setAttribute('id', photo.id);
                galleryImage.setAttribute('class', 'flex w-1/3 sm:w-3/3');
                gallery.appendChild(galleryImage);
            });
        } else {
            const noResultText = document.createElement('h1');
            noResultText.setAttribute('class', 'font-semibold');
            const gallery = this.shadowRoot.getElementById('x-gallery');
            this.searchMessage = 'We did looked everywhere but didn\'t find anything.';
            gallery.innerHTML = `<p>${this.searchMessage}</p>`;
        }
    }

    async nextPage() {
        this.pageNumber++;
        this.render(await this.searchImages());
    }

    async previousPage() {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.render(await this.searchImages());
        }
    }


    async search(searchText) {
        this.pageNumber = 1;
        this.searchText =
            this.searchText = searchText ?? 'nature';
        if (this.searchText.length > 3) {
            this.render(await this.searchImages());
        } else if (length === 0) {
            this.render(await this.searchImages())
        }
    }

}

window.customElements.define('app-gallery', gallery);