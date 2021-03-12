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
  arr.map(item => {

    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let li4 = document.createElement('li');

    div.classList.add('card');
    ul.classList.add('list-group', 'list-group-flush');
    li1.classList.add('list-group-item');
    li2.classList.add('list-group-item');
    li3.classList.add('list-group-item');
    li4.classList.add('list-group-item');
    
    listCon.appendChild(div);
    div.appendChild(ul);

    ul.appendChild(li1);
    li1.textContent = item.title;
    ul.appendChild(li2);
    li2.textContent = item.author;
    ul.appendChild(li3);
    li3.textContent = item.pages;
    ul.appendChild(li4);
    li4.textContent = item.read;
  });
}

const book1 = new Book('The Hobbit', 'R.R.', '564', 'no');
const book2 = new Book('It', 'Stephen King', '365', 'yes');

addBookToLibrary(book1);
addBookToLibrary(book2);


//DOM Manipulation

let listCon = document.getElementById('book-list-con');

printBooks(myLibrary);

