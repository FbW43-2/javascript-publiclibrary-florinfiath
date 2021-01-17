

class Shelf {
​
    books = [];
    constructor(name, books) {
        this.name = name;
        this.books = [];
    }
​
    checkExistingBook(book) {
        for (var i = 0; i < this.books.length; i++) {
            if (this.books[i] === book) {
                return true;
            }
        }
        return false;
    }
​
    spaceLimitReached() {
        if (this.books.length >= 5) {
            return true;
        }
        return false;
    }
​
    addBook(book) {
        if (this.checkExistingBook(book)) {
            throw new Error("This book is already in the shelf.");
        }
        if (this.spaceLimitReached()) {
            throw new Error("You can't add this book, this shelf is already full.");
        }
        this.books.push(book);
        book.assignShelf(this);
    }
​
    removeBook(book) {
        if (this.checkExistingBook(book) === false) {
            throw new Error("This book is not in the shelf");
        }
        for (var i = 0; i < this.books.length; i++) {
            if (this.books[i] === book) {
                this.books.splice(i, 1);
            }
        }
    }
    moveBook(shelf, book) {
​
        if (this.checkExistingBook(book)) {
​
            if (shelf.checkExistingBook(book)) {
                throw new Error("This book is already in the shelf");
            }
            if (shelf.spaceLimitReached()) {
                throw new Error("You can't add this book, this shelf is already full.")
            }
​
            book.deleteShelfAssigned();
            this.removeBook(book);
            shelf.books.push(book);
            book.assignShelf(shelf);
        } else {
            throw new Error("The book is not in this shelf.")
        }
    }
​    amountOfBooks() {
        console.log("The " + this.name + " has " + this.books.length + " books.");
    }
​
    displayBooks() {
        console.log("All books in " + this.name + " :");
        console.log(this.books);
    }
​
    emptyShelf() {
        this.books = [];
        for (n in this.books) {
            n.author = null;
        }
    }
}
​
class Author {
    constructor(firstName, lastName, age, nationality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.nationality = nationality;
    }
}
​class Book {
    shelf = null;
​
    constructor(title, author, pages, publicationYear) {
        this.title = title;
        this.author = this.assignAuthor(author);
        this.pages = pages;
        this.publicationYear = publicationYear;
    }
​
    assignShelf(shelf) {
        if (this.shelf !== null) {
            throw new Error("This book is already in a shelf");
        }
        this.shelf = shelf.name;
    }
​
    deleteShelfAssigned() {
        if (this.shelf !== null) {
            this.shelf = null;
        }
    }
​
    assignAuthor(author) {
        this.author = author.firstName;
        return author.firstName + " " + author.lastName;
    }
}

var shelfA = new Shelf("ShelfA");
var shelfB = new Shelf("ShelfB");
​
let doe = new Author("John", "Doe", 51, "American");
let twain = new Author("Mark", "Twain", 45, "American");
let obama = new Author("Barack", "Obama", 59, "American")
let sharma = new Author("Robin", "Sharma", 56, "Canadian")
​
let book1 = new Book("Strangers", doe, 133, 2012);
let book2 = new Book("A Connecticut Yankee in King Arthur’s Court", twain, 221, 1889);
let book3 = new Book("A Promised Land",obama, 768, 2020);
let book4 = new Book (" The Monk Who Sold His Ferrari ",sharma,198,1999);

​
​
shelfA.addBook(book1);
shelfB.addBook(book2);
shelfA.addBook(book3);
shelfB.addBook(book4);
