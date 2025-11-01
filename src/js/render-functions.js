import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader");

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 300,
});

export function createGallery(images) {
    const markup = images
    .map(
        (item) => `
        <li class="gallery-item">
        <a href="${item.largeImageURL}">
            <img src="${item.webformatURL}" alt="${item.tags}"/>
        </a>
        <ul class="card">
            <li class="card-item"><b>Likes:</b> ${item.likes}</li>
            <li class="card-item"><b>Views:</b> ${item.views}</li>
            <li class="card-item"><b>Comments:</b> ${item.comments}</li>
            <li class="card-item"><b>Downloads:</b> ${item.downloads}</li>
        </ul>
        </li>`
    )
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.remove("is-hidden");
}
export function hideLoader() {
  loader.classList.add("is-hidden");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("is-hidden");
}
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("is-hidden");
}

export const loadMoreButton = loadMoreBtn;

export const galleryEl = galleryContainer;