/**
 * This code is a combination of JavaScript and HTML code. It is handling some actions and events related to a book listing.
*/

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js"     // Imports: The code imports various constants (BOOKS_PER_PAGE, authors, genres, books) from a data.js file.

/**
 * Constants: Several constant variables are declared to store references to HTML elements using document.querySelector().
 * These elements BELOW are identified by their data attributes.
*/

import {
  dataHeaderSearch, dataHeaderSettings, dataListItems, dataListMessage, dataListButton, dataListActive, dataListBlur, dataListImage,
  dataListTitle, dataListSubtitle, dataListDescription, dataListClose, dataSearchOverlay, dataSearchForm, dataSearchTitle,
  dataSearchGenres, dataSearchAuthors, dataSearchCancel, dataSettingsOverlay, dataSettingsForm, dataSettingsTheme, dataSettingsCancel

} from './Encapsulation/domElements.js';


/**
 * First, there are some variable assignments and checks at the beginning of the code. 
 * It checks if the books variable is defined and an array, and throws an error if it is not. 
 * Similarly, it checks if the range variable is defined and has a length of at least 2, and throws an error if it does not.
*/

let matches = books
let page = 1;     //current page of book 
const range = [0, BOOKS_PER_PAGE]

if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}

if (!range && range.length === 2) {
    throw new Error('Range must be an array with two numbers')
}


/**
 * Book Previews: The code defines a function createPreview() that generates HTML markup for a book preview based on the provided book data.
 * It also creates a loop to iterate over a subset of books (determined by the current page) and appends the generated previews to the DOM.
*/
  
function createPreview(preview) {
    const { author: authorId, id, image, title } = preview

    const showPreview = document.createElement('button')
    showPreview.classList = 'preview'
    showPreview.setAttribute('data-preview', id)

    showPreview.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />

        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `

    return showPreview
}

// add index

const startIndex = (page - 1) * BOOKS_PER_PAGE
const endIndex = startIndex + BOOKS_PER_PAGE

const bookFragment = document.createDocumentFragment()
const bookExtracted = books.slice(startIndex, endIndex)

/** Create a loop over preview to display previews, createpreview button is created */


/**
 * An event listener is added to the "Show more" button (dataListButton).
 * When clicked, it loads the next set of book previews, updates the remaining book count, and disables the button if there are no more books to display.
*/

import { loadInitialBookPreviews, setupShowMoreButton } from './Encapsulation/listButtonHandler.js';

loadInitialBookPreviews(books, page, BOOKS_PER_PAGE, createPreview, dataListItems);
setupShowMoreButton(dataListButton, dataListItems, matches, page, BOOKS_PER_PAGE, createPreview);



/**
 * ALL BOOKS SUMMARIES
*/

// When dataListItems is clicked,  it loads the next set of book previews, updates the remaining book count, and disables the button if there are no more books to display
dataListItems.addEventListener('click', (event) => {
  dataListActive.showModal()
  let pathArray = Array.from(event.path || event.composedPath())
  let active;

  for (const node of pathArray) {
    if (active) break;
    const id = node?.dataset?.preview

    for (const singleBook of books) {
      if (singleBook.id === id) {
        active = singleBook
        break;
      };
    };
  };

  if (!active) return;
  dataListImage.src = active.image;
  dataListBlur.src = active.image;
  dataListTitle.textContent = active.title;
  dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
  dataListDescription.textContent = active.description;

});

//When dataListClose is clicked, it closes the modal by calling on close() on dataListActive.
dataListClose.addEventListener('click', () => {
  dataListActive.close()
});


/**
 * GENRES AND AUTHORS
 * The code creates a document fragment for 'genres' and 'authors'.
*/

//When dataHeaderSearch is clicked, it shows a modal by calling on showModal() on dataSearchOverlay
dataHeaderSearch.addEventListener('click', () => {
  dataSearchOverlay.showModal()
  dataSearchTitle.focus()
});

//When dataSearchCancel is clicked, it closes modal by calling on close() on dataSearchOverlay
dataSearchCancel.addEventListener('click', () => {
  dataSearchOverlay.close()
});

const genresFragment = document.createDocumentFragment()
const genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.innerText = 'All Genres'
genresFragment.appendChild(genreElement)

for (const [id] of Object.entries(genres)) {
  const genreElement = document.createElement('option')
  genreElement.value = id
  genreElement.innerText = genres[id]
  genresFragment.appendChild(genreElement)
};

dataSearchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()
const authorsElement = document.createElement('option')
authorsElement.value = 'any'
authorsElement.innerText = 'All Authors'
authorsFragment.appendChild(authorsElement)

for (const [id] of Object.entries(authors)) {
  const authorsElement = document.createElement('option')
  authorsElement.value = id
  authorsElement.innerText = authors[id]
  authorsFragment.appendChild(authorsElement)
};

dataSearchAuthors.appendChild(authorsFragment)

/**
 * FILTER BOOKS BY TITLE, GENRE AND AUTHOR
 * 
*/

import { filterAndDisplayBooks } from './Encapsulation/filterBooks.js';

dataSearchForm.addEventListener('submit', event => {
  filterAndDisplayBooks(
    event,
    filters,
    books,
    createPreview,
    dataListItems,
    dataListButton,
    dataListMessage,
    page,
    BOOKS_PER_PAGE
  );
});


/*
Event listner for 'Show More', when show more is clicked more books are shown.
*/

import { handleListButtonClick } from './Encapsulation/listButtonHandler.js';

dataListButton.addEventListener('click', () => {
  handleListButtonClick(page, result, BOOKS_PER_PAGE, dataListButton, dataListItems, createPreview);
});



/** THEME SELECTION (DAY/NIGHT MODE) 
 * Set up of event listeners and handlers 
 * Opening and closing of Overlay
*/


/**
 * Created a function that takes the selected theme and applies the corresponding CSS variables for the chosen theme.
*/

//The css object define two themes, 'day' and 'night'
const css = {
  day: ['255, 255, 255', '10, 10, 20'],
  night: ['10, 10, 20', '255, 255, 255']
}

//Let the value of the dataSettingsTheme input determine the user's preferred color scheme.t. with the use of encapsulatiion
class ThemeManager {
  constructor(css) {
    this.css = css;
  }

  applyTheme(selectedTheme) {
    document.documentElement.style.setProperty('--color-light', this.css[selectedTheme][0]);
    document.documentElement.style.setProperty('--color-dark', this.css[selectedTheme][1]);
  }


/**
 * Created functions to handle the event listeners for opening and closing the settings overlay, and for submitting the theme selection form.
*/

handleSettingsOpen() {
  dataSettingsOverlay.showModal();
}

handleSettingsClose() {
  dataSettingsOverlay.close();
}

handleThemeSubmit(event) {
  event.preventDefault();
  const formSubmit = new FormData(event.target);
  const selected = Object.fromEntries(formSubmit);

  this.applyTheme(selected.theme);

  this.handleSettingsClose();
}
}

/**
 * Modified my existing event listeners to use these abstraction functions.
*/

// Usage

const themeManager = new ThemeManager(css);

dataHeaderSettings.addEventListener('click', () => themeManager.handleSettingsOpen());

dataSettingsCancel.addEventListener('click', () => themeManager.handleSettingsClose());

dataSettingsForm.addEventListener('submit', (event) => themeManager.handleThemeSubmit(event));
