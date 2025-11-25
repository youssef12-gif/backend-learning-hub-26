// ==========================
// Part 1: Variables & Basic Types
// ==========================

// 1. Basic variables
let totalBooks: number = 0;
let libraryName: string = "Central Library";
let isOpen: boolean = true;
let lateFeePerDay: number = 2.5;
let maxBooksPerPerson: number = 20;
let currentDate: string = "2025-11-25";

console.log("Library Info:");
console.log({ totalBooks, libraryName, isOpen, lateFeePerDay, maxBooksPerPerson, currentDate });
console.log("Data types:");
console.log(
    typeof totalBooks,
    typeof libraryName,
    typeof isOpen,
    typeof lateFeePerDay,
    typeof maxBooksPerPerson,
    typeof currentDate
);

// 2. Book interface
interface Book {
    id: number;
    title: string;
    author: string;
    publishYear: number;
    status: "available" | "borrowed" | "reserved";
    pages: number;
}

// 3. Magazine interface extends Book
interface Magazine extends Book {
    issueNumber: number;
    monthlySubscription: boolean;
}

// 4. Sample books & magazines
let book1: Book = {
    id: 1,
    title: "TypeScript Basics",
    author: "Yomna",
    publishYear: 2025,
    status: "available",
    pages: 200
};

let book2: Book = {
    id: 2,
    title: "Advanced TypeScript",
    author: "Ali",
    publishYear: 2024,
    status: "borrowed",
    pages: 350
};

let magazine1: Magazine = {
    id: 3,
    title: "Tech Monthly",
    author: "Sara",
    publishYear: 2025,
    status: "available",
    pages: 50,
    issueNumber: 12,
    monthlySubscription: true
};

// Update totalBooks
totalBooks += 3;
console.log("\nTotal Books after adding samples:", totalBooks);
console.log({ book1, book2, magazine1 });


// ==========================
// Part 2: Loops & If Conditions
// ==========================

let booksArray: Book[] = [book1, book2, magazine1];

// 1. Print available books
console.log("\nAvailable books:");
for (let book of booksArray) {
    if (book.status === "available") {
        console.log(`- ${book.title} by ${book.author}`);
    }
}

// 2. Calculate total pages
let totalPages: number = 0;
for (let book of booksArray) {
    totalPages += book.pages;
}
console.log("\nTotal pages of all books:", totalPages);


// ==========================
// Part 3: Utility Types
// ==========================

// 1. Partial: Update only some properties
let updateBook: Partial<Book> = {
    pages: 220,
    status: "reserved"
};
console.log("\nPartial Update Book:", updateBook);

// 2. Pick: Select only some properties
type BookPreview = Pick<Book, "title" | "author">;
let preview: BookPreview = {
    title: book1.title,
    author: book1.author
};
console.log("\nBook Preview:", preview);

// 3. Omit: Exclude some properties
type BookSafe = Omit<Book, "pages" | "publishYear">;
let safeBook: BookSafe = {
    id: book1.id,
    title: book1.title,
    author: book1.author,
    status: book1.status
};
console.log("\nSafe Book Info:", safeBook);

// 4. Readonly: make all properties readonly
const importantBook: Readonly<Book> = { ...book1 };
// importantBook.title = "New Title"; // ❌ Error: Cannot assign to 'title' because it is a read-only property

// 5. Ensure partial object is completed
let partialBook: Partial<Book> = { title: "New Book" };
// Complete before adding
if (partialBook.id && partialBook.author && partialBook.publishYear && partialBook.status && partialBook.pages) {
    booksArray.push(partialBook as Book);
} else {
    console.log("\nPartial book cannot be added, missing fields.");
}


// ==========================
// Part 4: Optional Extra - Find book by id
// ==========================
function findBookById(id: number): Book | undefined {
    for (let book of booksArray) {
        if (book.id === id) {
            return book;
        }
    }
    return undefined;
}

console.log("\nFind book with id=2:", findBookById(2));
console.log("Find book with id=99:", findBookById(99));