import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryElements = document.querySelector('.gallery');

let modal; 

const createGalleryMarkup = galleryItems => {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
            />
        </a>
        </div>
        `;
    })
    .join('');
};

galleryElements.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

galleryElements.addEventListener('click', event => {
    event.preventDefault(); // Забороняємо стандартну дію по кліку на посиланні

    if (event.target.nodeName !== "IMG") {
        return;
    }

    const originalImageUrl = event.target.dataset.source;

    modal = basicLightbox.create(`
        <div>
            <img src="${originalImageUrl}" width="832" height="554" />
        </div>
    `);

    modal.show();
  document.addEventListener('keydown', escapeListener);
modal.element().addEventListener('click', event => {
  if (event.target.nodeName === 'IMG') {
    modal.close();
  }
});
});

function escapeListener(event) {
  if (event.code === 'Escape' && modal) {
    modal.close();
    document.removeEventListener('keydown', escapeListener);
  }
}

if (modal) {
  modal.on('close', () => {
    document.removeEventListener('keydown', escapeListener);
  });
}