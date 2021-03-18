
let books = (() => {

  // Public functions

  const listCon = document.getElementById('book-list-con');
  const addBtn = document.querySelector('#add-btn');
  const form = document.querySelector('form');
  let myLibraryArr = [];
  
  let create = (title, author, pages, status) => {
    return {title, author, pages, status};
  };

  let addToLibrary = (e) => {
    e.preventDefault();
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const status = document.getElementById('status');

    const book  = books.create(title.value, author.value, pages.value, status.value);
    myLibraryArr.push(book);

    localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
    printBooks(myLibraryArr);

    form.reset();
    form.classList.toggle('d-none');
  };

  let changeStatus = (status, bookTitle) => {
    myLibraryArr.forEach((book) => {
      if (book.title === bookTitle) {
        if (status === 'I read it!') {
          book.status = 'Not read yet!';
        } else {
          book.status = 'I read it!';
        }
        localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
        myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
        printBooks(myLibraryArr);
      }
    });
  };



  //Private functions

  let printBooks = (arr) => {
    listCon.innerHTML = '';
    arr.forEach((item, index) => {
      let div = document.createElement('div');
      div.classList.add('card', 'm-5', 'border', 'border-dark', 'border-2', 'text-center');
      div.innerHTML = 
      `
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
  };

  function removeBook(bookName) {
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
  
    myLibraryArr.forEach((book, index) => {
      if (book.title === bookName) {
        myLibraryArr.splice(index, 1);
      }
    });
  
    localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
  }


  if (localStorage.getItem('myLibraryStorage') === null) {
    myLibraryArr = [];
  } else {
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
    printBooks(myLibraryArr);
  }


  return {create, myLibraryArr, addToLibrary, listCon, removeBook, addBtn, form, changeStatus};
  
})();




// Events

books.listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('status-btn')) {
   books.changeStatus(e.target.textContent, e.target.parentElement.firstChild.nextElementSibling.textContent);
  } 
});

books.listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
   books.removeBook(e.target.parentElement.firstChild.nextElementSibling.textContent);
   e.target.parentElement.parentElement.remove(); 
 }
});

books.addBtn.addEventListener('click', () => {
  books.form.classList.toggle('d-none');
 });

 books.form.addEventListener('submit', books.addToLibrary);