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

function printBooks(arr){
  listCon.innerHTML = '';
  arr.map((item, index) => {

    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let statusBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

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
    if(item.read == 'true'){
      statusBtn.textContent = 'I read it!'
    } else {
      statusBtn.textContent = 'Not read yet!'
    }
    statusBtn.addEventListener('click',() => {
     if(item.read == 'true'){
      item['read'] = 'false'
      statusBtn.textContent = 'Not read yet!'
     } else {
      item['read'] = 'true'
      statusBtn.textContent = 'I read it!';
    }
    })

    deleteBtn.textContent = 'Delete Book'
    deleteBtn.addEventListener('click', () => {
      arr.splice(index,1);
      printBooks(arr);
    })
  });
}

const deleteButtons = document.querySelectorAll('.btn-danger');

const book1 = new Book('The Hobbit', 'R.R.', '564', 'false');
const book2 = new Book('It', 'Stephen King', '365', 'true');

addBookToLibrary(book1);
addBookToLibrary(book2);

const btn = document.querySelector('#add-btn');
const form = document.querySelector('form')

btn.addEventListener('click', () => {
  form.classList.toggle('d-none');
})


//DOM Manipulation

let listCon = document.getElementById('book-list-con');
form.addEventListener('submit', addBook);

function addBook(e){
  e.preventDefault();
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('status');
  let book = new Book(title.value, author.value, pages.value, read.value);
  addBookToLibrary(book);
  printBooks(myLibrary);
  form.reset();
  form.classList.toggle('d-none');
}

printBooks(myLibrary);
