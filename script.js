// Get elements
const bookList = document.getElementById('bookList');
const addButton = document.getElementById('addButton');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');

// Initialize book collection from local storage
let myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];

// Render book list
function renderBookList() {
  bookList.innerHTML = '';
  myBooks.forEach((book, index) => {
    // Create book item
    const bookItem = document.createElement('div');
    bookItem.innerHTML = `
      <span>${book.title}<br>${book.author}</span><br>
      <button class="removeButton" data-index="${index}">Remove</button><br><br>
    `;
    bookList.appendChild(bookItem);
  });
}

// Add new book
function addBook() {
  // Get input values
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  /* eslint-disable no-alert */
  // Validate input
  if (!title || !author) {
    alert('Please provide both title and author!');
    return;
  }
  /* eslint-enable no-alert */

  // Add book to collection
  myBooks.push({ title, author });

  // Update local storage
  localStorage.setItem('myBooks', JSON.stringify(myBooks));

  // Clear input fields
  titleInput.value = '';
  authorInput.value = '';

  // Render book list
  renderBookList();
}

// Remove book
function removeBook(index) {
  // Filter out book at specified index
  myBooks = myBooks.filter((book, i) => i !== index);

  // Update local storage
  localStorage.setItem('myBooks', JSON.stringify(myBooks));

  // Render book list
  renderBookList();
}

// Add event listeners
addButton.addEventListener('click', addBook);
bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeButton')) {
    const index = parseInt(event.target.dataset.index, 10);
    removeBook(index);
  }
});

// Render book list on page load
renderBookList();