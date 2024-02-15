class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (this.books.length === this.capacity) {
            throw new Error('Not enough space in the collection.');
        }

        this.books.push({
            bookName,
            bookAuthor,
            payed: false,
            toString() {
                return `${this.bookName} == ${this.bookAuthor} - ${this.payed ? 'Has Paid' : 'Not Paid'}.`;
            }
        })

        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook(bookName) {
        const selectedBook = this.books.find(book => book.bookName === bookName);

        if (selectedBook === null) {
            throw new Error(`${bookName} is not in the collection.`);
        }

        if (selectedBook.payed === true) {
            throw new Error(`${bookName} has already been paid.`);
        }

        selectedBook.payed = true;
        return `${bookName} has been successfully paid.`;
    }

    removeBook(bookName) {
        const selectedBook = this.books.find(book => book.bookName === bookName);

        if (selectedBook === null) {
            throw new Error('The book, you\'re looking for, is not found.');
        }

        if (!selectedBook.payed) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        } else {
            const selectedBookIndex = this.books.indexOf(selectedBook);
            this.books.splice(selectedBookIndex, 1);
            return `${bookName} remove from the collection.`
        }
    }

    getStatistics(bookAuthor) {
        if (bookAuthor === undefined) {
            const emptySpots = this.capacity - this.books.length;
            const sortedBooks = [...this.books].sort((a, b) => a.bookName.localeCompare(b.bookName));

            return `The book collection has ${emptySpots} empty spots left.\n${sortedBooks.map(book => book.toString()).join('\n')}`;
        } else {
            return this.books.filter(book => book.bookAuthor === bookAuthor).map(book => book.toString()).join('\n');
        }
    }
}

const myLibraryCollection = new LibraryCollection(5);
myLibraryCollection.addBook('Mein Kampf', 'Adolf Hitler');
myLibraryCollection.addBook('kNigga', 'Prosveta');
myLibraryCollection.addBook('From Israel With Love', 'Adolf Hitler');
console.log(myLibraryCollection.getStatistics('Adolf Hitler'));