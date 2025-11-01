import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, loadMoreButton, galleryEl, } from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const input = form.querySelector("input[name='search-text']");

let currentQuery = "";
let currentPage = 1;
const PER_PAGE = 15;
let totalHits = 0;
let loadedHits = 0;


form.addEventListener("submit", onSearch);
loadMoreButton.addEventListener("click", onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: "Please enter a search term!",
      position: "topRight",
    });
    return;
  }

  if (query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    loadedHits = 0;
    totalHits = 0;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    totalHits = data.totalHits || 0;

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight"
      });
      return;
    }

    createGallery(data.hits);
    input.value = "";

    loadedHits += data.hits.length;

      if (loadedHits < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong. Please try again later.",
      position: "topRight"
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  loadMoreButton.disabled = true;
  showLoader();

  currentPage += 1;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    loadedHits += data.hits.length;

    const firstCard = galleryEl.querySelector(".gallery-item");
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: "smooth",
      });
    }

    if (loadedHits >= (data.totalHits || totalHits)) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong while loading more images.",
      position: "topRight"
    });
  } finally {
    hideLoader();
    loadMoreButton.disabled = false;
  }
}