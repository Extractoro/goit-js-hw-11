import cardsTpl from '../templates/cards-render.hbs'
import Notiflix from 'notiflix';
import PicturesApiService from './fetch_api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const picturesApi = new PicturesApiService();

const searchEl = document.querySelector('.search-form')
const galleryEl = document.querySelector('.gallery')
const btn = document.querySelector('.btnn')

Notiflix.Notify.init({
    position: 'right-top',
    width: '400px',
    fontSize: '18px',
});

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

searchEl.addEventListener('submit', onSearch)
btn.addEventListener('click', btnAddMore)

function onSearch(e) {
    e.preventDefault()
    picturesApi.quary = e.currentTarget.elements.searchQuery.value.trim();


    if (picturesApi.quary === '') {
        return Notiflix.Notify.failure('Please enter something')
    }

    picturesApi.resetPage()
    clearPicContainer()

    picturesApi.fetchPictures().then(pictures => {
        if (pictures.data.totalHits !== 0 && pictures.data.hits.length !== 0) {
            Notiflix.Notify.success(
                `Hooray! We found ${pictures.data.totalHits} images.`,
            );
        } else {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.',
            );
        }

        renderPics(pictures)
        lightbox.refresh();
        btn.classList.remove('is-hidden')
    })
}

function btnAddMore() {
    picturesApi.incrementPage()

    picturesApi.fetchPictures().then(pics => {
        renderPics(pics)
        lightbox.refresh();
    })
}


function renderPics(pictures) {
    galleryEl.insertAdjacentHTML('beforeend', cardsTpl(pictures))
}

function clearPicContainer() {
    galleryEl.innerHTML = ''
}