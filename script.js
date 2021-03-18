let myLibraryArr = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Store {
  static storeBook() {
    localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
  }

  static removeBook(bookName) {
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));

    myLibraryArr.forEach((book, index) => {
      if (book.title === bookName) {
        myLibraryArr.splice(index, 1);
      }
    });

    localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
  }
}

class UI {
  static addToLibrary(e) {
    const form = document.querySelector('form');
    e.preventDefault();
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const status = document.getElementById('status');

    const book = new Book(title.value, author.value, pages.value, status.value);
    myLibraryArr.push(book);
    Store.storeBook();

    UI.printBooks(myLibraryArr);

    form.reset();
    form.classList.toggle('d-none');
  }

  static changeStatus(status, bookTitle) {
    myLibraryArr.forEach((book) => {
      if (book.title === bookTitle) {
        if (status === 'I read it!') {
          book.status = 'Not read yet!';
        } else {
          book.status = 'I read it!';
        }
        localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
        myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
        UI.printBooks(myLibraryArr);
      }
    });
  }

  static printBooks(arr) {
    const listCon = document.getElementById('book-list-con');
    listCon.innerHTML = '';
    arr.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('card', 'm-5', 'border', 'border-dark', 'border-2', 'text-center');
      div.innerHTML = `
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${item.title}</li>
        <li class="list-group-item">${item.author}</li>
        <li class="list-group-item">${item.pages}</li>
        <button class="list-group-item status-btn">${item.status}</button>
        <button class="delete-btn btn-danger">X</button>
      </ul>
      `;
      listCon.appendChild(div);
    });
  }
}

const listCon = document.getElementById('book-list-con');
const addBtn = document.querySelector('#add-btn');
const form = document.querySelector('form');


if (localStorage.getItem('myLibraryStorage') === null) {
  myLibraryArr = [];
} else {
  myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
  UI.printBooks(myLibraryArr);
}

// Events

addBtn.addEventListener('click', () => {
  form.classList.toggle('d-none');
});

form.addEventListener('submit', UI.addToLibrary);

listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('status-btn')) {
    UI.changeStatus(e.target.textContent, e.target.parentElement.firstChild.nextElementSibling.textContent);
  }
});

listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    Store.removeBook(e.target.parentElement.firstChild.nextElementSibling.textContent);
    e.target.parentElement.parentElement.remove();
  }
});
