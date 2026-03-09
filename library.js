/*some init data
addBookToLibrary("The Hobbit",
     "J.R.R. Tolkien",
     1937,
     310,
     "https://covers.openlibrary.org/b/id/6979861-L.jpg")

console.log(myLibrary[0])

addBookToLibrary("1984",
    "George Orwell",
    1949,
    328,
    "https://covers.openlibrary.org/b/id/7222246-L.jpg")

addBookToLibrary("The Pragmatic Programmer",
    "Andrew Hunt & David Thomas",
    1999,
    352,
    "https://covers.openlibrary.org/b/id/9251996-L.jpg")


localStorage.setItem("myLibrary",JSON.stringify(myLibrary))*/
const libraryContainer = document.querySelector('.library-container')

let myLibrary = []
function loadLibrary(){
   const data = localStorage.getItem("myLibrary");
   if(data){
        myLibrary=JSON.parse(data);        
   }
}

function Book(title,author,year,pages,image){
    this.id=crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.image = image;
    
} 

function addBookToLibrary(...params){
    myLibrary.push(new Book(...params))
}


loadLibrary()
console.log(myLibrary.length)

function showLibrary(){
    myLibrary.forEach((book,i)=>{
        let rowsHTML;
        rowsHTML=`<tr><td>${book.values}</td></tr>`

        libraryContainer.innerHTML += `
    <table>
        <thead>
            <th>Book ${i+1}</th>
        </thead>
        <tbody>
            ${rowsHTML}            
        </tbody>
    </table>`
    })
}


function bookTable(book,number){
    book.
}
