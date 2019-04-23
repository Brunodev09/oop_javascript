class Book {
    constructor(title, author, code) {
      this.title = title;
      this.author = author;
      this.code = code;
    }
  }
  
  class UI {
    addBookToList(book) {
      const list = document.getElementById('book-list');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.code}</td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      const div = document.createElement('div');

      div.className = `alert ${className}`;

      div.appendChild(document.createTextNode(message));

      const container = document.querySelector('.container');

      const form = document.querySelector('#book-form');

      container.insertBefore(div, form);
  
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteBook(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('code').value = '';
    }
  }

  class Storage {

      static getfromLocalStorage() {
        let books;
        if (localStorage.getItem('books') === 'null') {
             books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
      }
      static displayAfterLoad() {
        const books = Storage.getfromLocalStorage();

        books.forEach(function(book) {
            const ui = new UI();
            ui.addBookToList(book);
        });
      }

      static addBook(item) {
        const books = Storage.getfromLocalStorage();
        books.push(item);
        localStorage.setItem('books', JSON.stringify(books));
      }

      static removeBook() {

      }
  }
  
  document.getElementById('book-form').addEventListener('submit', function(e){
      
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          code = document.getElementById('code').value
  
    const book = new Book(title, author, code);
  
    const ui = new UI();
    
    if(title === '' || author === '' || code === '') {
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      ui.addBookToList(book);

      //No need for instantiation since we are calling static methods
      Storage.addBook(book);
  
      ui.showAlert('Book Added!', 'success');
    
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  document.getElementById('book-list').addEventListener('click', function(e){
  
    const ui = new UI();
  
    ui.deleteBook(e.target);
  
    ui.showAlert('Book Removed!', 'success');
  
    e.preventDefault();
  });

  // DOM load event
  document.addEventListener('DOMContentLoaded', Storage.displayAfterLoad);