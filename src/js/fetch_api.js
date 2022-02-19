import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export default class PicturesApi {
    constructor() {
        this.quary = '';
        this.page = 1
    }

    async fetchPictures() {
        try {
            const optionsApi = new URLSearchParams({
                key: '25714118-67c188788ca31de7bcc571353',
                q: this.quary,
                image_type: "photo",
                per_page: 40,
                orientation: "horizontal",
                page: this.page,
            })

            const url = `${BASE_URL}?${optionsApi}`;
            const response = await axios.get(url);
            return response

        } catch (error) {
            return error
        }
    }


    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1;
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}