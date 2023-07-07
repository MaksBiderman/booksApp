{
const books = dataSource.books;

//Reference 
const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');


// favorite Books
const favoriteBooks = [];
//Filter
const filters = [];

//Functions
function render(){
  const thisBook = this;
  for(let book of books){
    const generatedHTML = templateBook(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(element);
  }
}
function initAction(){
    const bookList = document.querySelector('.books-list');
    bookList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookImage = event.target.closest('.book__image');
        if(bookImage){
            bookImage.classList.add('favorite');
            const bookId = bookImage.getAttribute('data-id');
            if (favoriteBooks.includes(bookId)) {
                const index = favoriteBooks.indexOf(bookId);
                bookImage.classList.remove('favorite');
                favoriteBooks.splice(index, 1);
              } else {
                favoriteBooks.push(bookId);
              
            }
        }
        console.log(favoriteBooks);
    })
    const formFilter = document.querySelector('.filters');
    formFilter.addEventListener('click', function(event){
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
            //console.log(event.target.value);
            if(event.target.checked){
                filters.push(event.target.value);
            }
            else {
                const index = filters.indexOf(event.target.value);
                if(index !== -1){
                filters.splice(index, 1);
                }
            
        }
        console.log(filters);
    }
    filterBooks();
    })
    
}
function filterBooks(){
    
    for( let book of books){
        let shouldBeHidden = false;
        for(let filter of filters){
            if(!book.details[filter]){
                shouldBeHidden = true;
                break;
            }
        }
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if(shouldBeHidden === true){
            bookImage.classList.add('hidden');
        } else {
            bookImage.classList.remove('hidden');

        }

    }
}







render();
initAction();
}