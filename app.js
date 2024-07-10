const myLibrary = [];

function Book(name, author, pages, haveRead){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.toggleReadStatus = () => {
        this.haveRead = !this.haveRead;
    }
}

function addBookToLibrary(name, author, pages, haveRead){
    let book = new Book(name, author, pages, haveRead);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks(){
    const bookHolder = document.getElementById('bookHolder');
    bookHolder.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-div');

        const title = document.createElement('p');
        title.classList.add('book-text', 'book-title');
        title.textContent = book.name;

        const author = document.createElement('p');
        author.classList.add('book-text', 'book-author');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.classList.add('book-text', 'book-pages');
        pages.textContent = `${book.pages} Pages`;

        const readButton = document.createElement('button');
        readButton.classList.add('changeRead');
        readButton.textContent = book.haveRead ? 'Read' : 'Not Read';
        readButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('removeBtn');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(readButton);
        bookDiv.appendChild(removeButton);

        bookHolder.appendChild(bookDiv);
    });
}

document.getElementById('bookForm').addEventListener('submit', function(event){
    event.preventDefault();
    const name = document.getElementById('bookName').value;
    const author = document.getElementById('bookAuthor').value;
    const pages = document.getElementById('bookPages').value;
    const haveRead = document.getElementById('haveRead').checked;

    addBookToLibrary(name, author, pages, haveRead);

    document.getElementById('bookForm').reset();
});
