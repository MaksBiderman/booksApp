class BooksList {
  constructor() {
    this.initData();
    this.getElements();
    this.initActions();
    this.render();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    this.booksList = document.querySelector('.books-list');
    this.favoriteBooks = [];
    this.filters = [];
  }
  initActions() {
    const thisBook = this;
    const bookList = document.querySelector('.books-list');
    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const bookImage = event.target.closest('.book__image');
      if (bookImage) {
        bookImage.classList.add('favorite');
        const bookId = bookImage.getAttribute('data-id');
        if (thisBook.favoriteBooks.includes(bookId)) {
          const index = thisBook.favoriteBooks.indexOf(bookId);
          bookImage.classList.remove('favorite');
          thisBook.favoriteBooks.splice(index, 1);
        } else {
          thisBook.favoriteBooks.push(bookId);
        }
      }
    });
  
    const formFilter = document.querySelector('.filters');
    formFilter.addEventListener('click', function (event) {
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
        if (event.target.checked) {
          thisBook.filters.push(event.target.value);
        } else {
          const index = thisBook.filters.indexOf(event.target.value);
          if (index !== -1) {
            thisBook.filters.splice(index, 1);
          }
        }
      }
      thisBook.filterBooks();
    });
  }

  filterBooks() {
    for (let book of this.data) {
      let shouldBeHidden = false;
      for (let filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      if (shouldBeHidden === true) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if (rating > 6 && rating <= 8) {
      return 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if (rating > 8 && rating <= 9) {
      return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if (rating > 9) {
      return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

  render() {
    for (let book of this.data) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;
      book.ratingBgc = ratingBgc;
      const generatedHTML = this.templateBook(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(element);
    }
  }
}

const app = new BooksList();
