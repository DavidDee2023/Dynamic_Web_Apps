// listButtonHandler.js

export function handleListButtonClick(page, result, BOOKS_PER_PAGE, dataListButton, dataListItems, createPreview) {
    page++;
  
    const moreSearchStartIndex = (page - 1) * BOOKS_PER_PAGE;
    const moreSearchEndIndex = moreSearchStartIndex + BOOKS_PER_PAGE;
  
    const moreSearchBookExtracted = result.slice(moreSearchStartIndex, moreSearchEndIndex);
  
    const moreSearchBookFragment = document.createDocumentFragment();
  
    for (const preview of moreSearchBookExtracted) {
      const showPreview = createPreview(preview);
      moreSearchBookFragment.appendChild(showPreview);
    }
  
    dataListItems.appendChild(moreSearchBookFragment);
  
    const remaining = result.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;
  
    dataListButton.disabled = remaining <= 0;
}


// bookPreviewHandler

export function loadInitialBookPreviews(books, page, BOOKS_PER_PAGE, createPreview, dataListItems) {
    const startIndex = (page - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
  
    const bookFragment = document.createDocumentFragment();
    const bookExtracted = books.slice(startIndex, endIndex);
  
    for (const preview of bookExtracted) {
      const showPreview = createPreview(preview);
      bookFragment.appendChild(showPreview);
    }
  
    dataListItems.appendChild(bookFragment);
  }
  
  export function setupShowMoreButton(dataListButton, dataListItems, matches, page, BOOKS_PER_PAGE, createPreview) {
    dataListButton.addEventListener('click', () => {
      page++;
  
      const newStartIndex = (page - 1) * BOOKS_PER_PAGE;
      const newEndIndex = newStartIndex + BOOKS_PER_PAGE;
  
      const newBookExtracted = matches.slice(newStartIndex, newEndIndex);
  
      const newBookFragment = document.createDocumentFragment();
  
      for (const preview of newBookExtracted) {
        const showPreview = createPreview(preview);
        newBookFragment.appendChild(showPreview);
      }
  
      dataListItems.appendChild(newBookFragment);
  
      const remaining = matches.length - page * BOOKS_PER_PAGE;
      dataListButton.innerHTML = /* HTML */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
      `;
  
      dataListButton.disabled = remaining <= 0;
    });
  
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> 
      (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})
      </span>
    `;
  }
  