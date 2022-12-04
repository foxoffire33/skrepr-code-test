const templateModal = document.createElement('template');
templateModal.innerHTML = `
<style> @import "./../css/app.css";</style>
<div class="modal-md sm:w-full" id="modal">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" id="modal-bg">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-lg">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title"></h3>
              <div class="flex p-2">
              <div class="rounded-md p-4 max-w-sm w-full mx-auto" id="modal-loading">
              <div class="animate-pulse flex space-x-4" >
                <div class="rounded bg-slate-200 h-48 w-48"></div>
                <div class="flex-1 space-y-6 py-1">
                      <div class="h-2 bg-slate-200 rounded"></div>
                          <div class="space-y-3">
                            <div class="grid grid-cols-2 gap-48"></div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                          </div>
                    </div>
              </div>
            </div>
                  <div class="flex w-2/3">
                    <img class="h-64"/>
                  </div>
                  <div class="mt-2 flex w-1/3 h-12" >
                      <table class="table">
                          <tbody id="image-information">
                          </tbody>
                    </table>
                 </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <a type="button" id="download-button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Download</a>
          <button type="button" id="modal-close" class="text-white mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

`;

class galleryModal extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateModal.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#modal-close, #modal-bg').addEventListener('click', () => {
            this.shadowRoot.querySelector('#modal').remove();
        });
    }

    async show(id) {
        this.shadowRoot.querySelector('#modal').classList.remove('hidden');
        const downloadedImageInformation = await this.getPhotoById(id);
        this.shadowRoot.querySelector('#modal-loading').remove();

        const modalTitle = this.shadowRoot.querySelector('#modal-title');
        modalTitle.innerHTML = downloadedImageInformation.alt;

        const imageElement = this.shadowRoot.querySelector('img');
        imageElement.alt = downloadedImageInformation.alt
        imageElement.src = downloadedImageInformation.src.large;

        const imageInformation = this.shadowRoot.querySelector('#image-information');
        imageInformation.innerHTML = '';
        imageInformation.innerHTML += `<tr><td><b>Photographer</b><td><td>${downloadedImageInformation.photographer}<td></<tr>`;
        imageInformation.innerHTML += `<tr><td><b>Width</b><td><td>${downloadedImageInformation.width} pixels<td></<tr>`;
        imageInformation.innerHTML += `<tr><td><b>Height</b><td><td>${downloadedImageInformation.height} pixels<td></<tr>`;
        imageInformation.innerHTML += `<tr><td><b>Alt text</b><td><td>${downloadedImageInformation.alt}<td></<tr>`;

        this.shadowRoot.querySelector('#download-button').href = downloadedImageInformation.src.original;
    }

    async getPhotoById(id) {
        const apiKey = '563492ad6f91700001000001ec5c3cb3823a4e8a968fb73f70eeab83';
        const url = `https://api.pexels.com/v1/photos/${id}`;
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

        console.log(response);
        return response;
    }


}

window.customElements.define('gallery-modal', galleryModal);