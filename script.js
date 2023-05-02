/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('myBooks')) || [];
    this.bookList = document.getElementById('bookList');
    this.addBtn = document.getElementById('addButton');
    this.titleInput = document.getElementById('titleInput');
    this.authorInput = document.getElementById('authorInput');

    this.addBtn.addEventListener('click', () => this.addBook());
    this.bookList.addEventListener('click', (event) => {
      if (event.target.classList.contains('removeButton')) {
        const index = parseInt(event.target.dataset.index, 10);
        this.removeBook(index);
      }
    });

    this.renderBookList();
  }

  addBook() {
    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();
    const book = new Book(title, author);

    // Add book to collection
    this.books.push(book);

    // Update local storage
    localStorage.setItem('myBooks', JSON.stringify(this.books));

    // Clear input fields
    this.titleInput.value = '';
    this.authorInput.value = '';
    this.renderBookList();
  }

  removeBook(index) {
    // Filter out book at specified index
    this.books = this.books.filter((book, i) => i !== index);

    // Update local storage
    localStorage.setItem('myBooks', JSON.stringify(this.books));
    this.renderBookList();
  }

  renderBookList() {
    this.bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      // Create book item
      const bookItem = document.createElement('div');
      bookItem.classList.add('bookItem');
      bookItem.innerHTML = `
        <span>${book.title}&nbsp by &nbsp${book.author}</span>&nbsp &nbsp
        <button class="removeButton" data-index="${index}">Remove</button>
      `;
      this.bookList.appendChild(bookItem);
    });
  }
}

/* eslint-disable-next-line no-unused-vars */
const myBookCollection = new BookCollection();