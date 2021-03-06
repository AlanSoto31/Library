let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Local Storage

function storageBook(arr) {
  const arrString = JSON.stringify(arr);
  localStorage.setItem('myLibrary2', arrString);
}

function removeBook(bookName) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary2'));

  myLibrary.forEach((book, index) => {
    if (book.title === bookName) {
      myLibrary.splice(index, 1);
    }
  });

  localStorage.setItem('myLibrary2', JSON.stringify(myLibrary));
}

const listCon = document.getElementById('book-list-con');
const btn = document.querySelector('#add-btn');
const form = document.querySelector('form');

function printBooks(arr) {
  listCon.innerHTML = '';
  arr.forEach((item, index) => {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const statusBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    div.classList.add('card', 'm-5', 'border', 'border-dark', 'border-2', 'text-center');
    div.setAttribute('id', `book${index}`);
    ul.classList.add('list-group', 'list-group-flush');
    li1.classList.add('list-group-item');
    li2.classList.add('list-group-item');
    li3.classList.add('list-group-item');
    statusBtn.classList.add('list-group-item');
    deleteBtn.classList.add('delete-btn', 'btn-danger');

    listCon.appendChild(div);
    div.appendChild(ul);
    div.appendChild(deleteBtn);
    ul.appendChild(li1);
    li1.textContent = item.title;
    ul.appendChild(li2);
    li2.textContent = item.author;
    ul.appendChild(li3);
    li3.textContent = item.pages;
    ul.appendChild(statusBtn);
    if (item.read === 'true') {
      statusBtn.textContent = 'I read it!';
    } else {
      statusBtn.textContent = 'Not read yet!';
    }
    statusBtn.addEventListener('click', () => {
      if (item.read === 'true') {
        item.read = 'false';
        statusBtn.textContent = 'Not read yet!';
      } else {
        item.read = 'true';
        statusBtn.textContent = 'I read it!';
      }
    });
    deleteBtn.textContent = 'Delete Book';
  });
}

listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    removeBook(e.target.previousElementSibling.firstChild.textContent);
    e.target.parentElement.remove();
  }
});

btn.addEventListener('click', () => {
  form.classList.toggle('d-none');
});

// DOM Manipulation

function addBook(e) {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('status');
  const book = new Book(title.value, author.value, pages.value, read.value);
  addBookToLibrary(book);
  storageBook(myLibrary);
  printBooks(myLibrary);
  form.reset();
  form.classList.toggle('d-none');
}

form.addEventListener('submit', addBook);

if (localStorage.getItem('myLibrary2') === null) {
  myLibrary = [];
} else {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary2'));
}

printBooks(myLibrary);
