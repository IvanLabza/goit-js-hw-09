// Import the SimpleLightbox library
import SimpleLightbox from 'simplelightbox';
// Import the additional styles
import 'simplelightbox/dist/simple-lightbox.min.css';
// Import the gallery items
import { galleryItems } from './gallery-items.js';
// Function to create the gallery markup
function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </li>
      `;
    })
    .join('');
}
// Get the gallery element
const gallery = document.querySelector('.gallery');
// Set the gallery markup
gallery.innerHTML = createGalleryMarkup(galleryItems);
// Initialize the SimpleLightbox plugin
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
// Add event listener to open the lightbox on image click
gallery.addEventListener('click', (event) => {
  event.preventDefault();
  lightbox.open();
});