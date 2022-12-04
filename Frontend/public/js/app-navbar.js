const templateNavbar = document.createElement('template');
templateNavbar.innerHTML = `
<style> @import "./../css/app.css";</style>
<nav class="flex items-center justify-between flex-wrap bg-white p-1 drop-shadow">
    <div class="flex items-center flex-shrink-0 text-gray-700 mr-6">
        <a class="font-semibold text-xl tracking-tight" href="#">Skrepr gallery</a>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
            <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="searchInput" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search images" required>
            </div>
        </div>
    </div>
</nav>
`;

class appNavigation extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNavbar.content.cloneNode(true));

    }


    async connectedCallback() {
        gallery = document.querySelector('app-gallery');
        this.shadowRoot.querySelector('#searchInput').addEventListener('input', async (event) => {
            await gallery.search(event.target.value.trim());
        });
    }

}

window.customElements.define('app-navigation', appNavigation);