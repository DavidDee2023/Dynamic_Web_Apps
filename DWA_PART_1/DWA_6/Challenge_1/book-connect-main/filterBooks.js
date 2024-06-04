// filterBooks.js

export function filterAndDisplayBooks(
    event,
    filters,
    books,
    createPreview,
    dataListItems,
    dataListButton,
    dataListMessage,
    page,
    BOOKS_PER_PAGE
  ) {
    event.preventDefault();
    const formData = new FormData(event.target);
    filters = Object.fromEntries(formData);
    const result = [];
  
    for (const book of books) {
      const titleMatch = filters.title.trim() !== '' && book.title.toLowerCase().includes(filters.title.toLowerCase());
      const genreMatch = filters.genre !== 'any' && book.genres.includes(filters.genre);
      const authorMatch = filters.author !== 'any' && book.author.includes(filters.author);
  
      if (titleMatch || authorMatch || genreMatch) {
        result.push(book);
      }
    }
  
    if (result.length === 0) {
      dataListItems.innerHTML = '';
      dataListButton.disabled = true;
      dataListMessage.classList.add('list__message_show');
    } else {
      dataListMessage.classList.remove('list__message_show');
      dataListItems.innerHTML = '';
  
      const searchStartIndex = (page - 1) * BOOKS_PER_PAGE;
      const searchEndIndex = searchStartIndex + BOOKS_PER_PAGE;
  
      const searchBookFragment = document.createDocumentFragment();
      const searchBookExtracted = result.slice(searchStartIndex, searchEndIndex);
  
      for (const preview of searchBookExtracted) {
        const showPreview = createPreview(preview);
        searchBookFragment.appendChild(showPreview);
      }
  
      dataListItems.appendChild(searchBookFragment);
    }
  
    const remaining = result.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;
    dataListButton.disabled = remaining <= 0;
  }
  