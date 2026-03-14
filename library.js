let myLibrary = []
/*
addBookToLibrary(
  "Clean Code",
  "Robert C. Martin",
  2008,
  464,
  "https://covers.openlibrary.org/b/id/9613601-L.jpg",
  9.5,
  "A foundational guide to writing readable, maintainable, and elegant code through disciplined practices.",
  ["Software Engineering", "Best Practices", "Programming"]
);

addBookToLibrary(
  "Design Patterns: Elements of Reusable Object-Oriented Software",
  "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
  1994,
  395,
  "https://covers.openlibrary.org/b/id/8231996-L.jpg",
  9.7,
  "The classic catalog of software design patterns that shaped modern object‑oriented programming.",
  ["Software Architecture", "Object-Oriented Design", "Patterns"]
);

addBookToLibrary(
  "Refactoring: Improving the Design of Existing Code",
  "Martin Fowler",
  1999,
  431,
  "https://covers.openlibrary.org/b/id/10523366-L.jpg",
  9.4,
  "A practical guide to restructuring code safely, improving clarity and reducing complexity.",
  ["Refactoring", "Software Engineering", "Programming"]
);

addBookToLibrary(
  "You Don't Know JS: Scope & Closures",
  "Kyle Simpson",
  2014,
  98,
  "https://covers.openlibrary.org/b/id/8165264-L.jpg",
  8.9,
  "A deep dive into JavaScript’s core mechanics, focusing on scope, closures, and how the language truly works.",
  ["JavaScript", "Programming Languages", "Web Development"]
);

addBookToLibrary(
  "JavaScript: The Good Parts",
  "Douglas Crockford",
  2008,
  176,
  "https://covers.openlibrary.org/b/id/5546156-L.jpg",
  8.7,
  "A curated look at the most powerful and elegant parts of JavaScript, stripping away the unnecessary.",
  ["JavaScript", "Programming", "Web Development"]
);

addBookToLibrary(
  "Introduction to Algorithms",
  "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
  2009,
  1312,
  "https://covers.openlibrary.org/b/id/13518227-L.jpg",
  9.8,
  "A comprehensive academic reference covering algorithms, data structures, and computational theory.",
  ["Algorithms", "Computer Science", "Theory"]
);

addBookToLibrary(
  "The Mythical Man-Month",
  "Frederick P. Brooks Jr.",
  1975,
  322,
  "https://covers.openlibrary.org/b/id/8235116-L.jpg",
  9.0,
  "A timeless exploration of software project management and why adding manpower often slows progress.",
  ["Project Management", "Software Engineering", "Productivity"]
);

addBookToLibrary(
  "Working Effectively with Legacy Code",
  "Michael Feathers",
  2004,
  456,
  "https://covers.openlibrary.org/b/id/240726-L.jpg",
  9.2,
  "A practical handbook for safely modifying and improving large, untested, or outdated codebases.",
  ["Legacy Code", "Refactoring", "Software Engineering"]
);

addBookToLibrary(
  "Code Complete",
  "Steve McConnell",
  2004,
  960,
  "https://covers.openlibrary.org/b/id/240727-L.jpg",
  9.6,
  "A comprehensive guide to software construction, covering best practices, design, and craftsmanship.",
  ["Software Engineering", "Best Practices", "Programming"]
);

addBookToLibrary(
  "The Clean Coder",
  "Robert C. Martin",
  2011,
  256,
  "https://covers.openlibrary.org/b/id/7352161-L.jpg",
  9.1,
  "A professional guide to the mindset, ethics, and discipline required to be a responsible software developer.",
  ["Professionalism", "Software Engineering", "Career Development"]
);
*/
function setLibrary(){
    if(localStorage.getItem("myLibrary")!==null){
        localStorage.setItem("myLibrary",null)
    } 
    try{
        localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
        console.log("Added to the library preset!")
    }catch(error){
            console.log("problem occured while library reloading"+error)
    }

}

const libraryContainer = document.querySelector('.library-container')


function loadLibrary(){
   const data = localStorage.getItem("myLibrary");
   if(data){
    
        myLibrary=JSON.parse(data);   
        console.log("downloaded from localStorage")     
   }
}

function Book(title,author,year,pages,image,ranking, description,genres){
    this.id=crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.ranking = ranking 
    this.year = year;
    this.pages = pages;
    this.image = image;
    this.description = description;
    this.genres=genres
} 

function addBookToLibrary(...params){
    myLibrary.push(new Book(...params))
}





function showLibrary(){
    loadLibrary()
    myLibrary.forEach((book,id)=>{
        

        libraryContainer.innerHTML += bookCard(book,id)
        })
}


function bookCard(book,number){
    return`
    <div id="${book.id}" class="book-card">
        <div class="book-cover">
        <img src="${book.image}" alt="Book cover"></img>
        </div>
        <div class="book-info">
        <h2 class="book-title">${book.title}<span class="book-rating"> ★ ${book.ranking}</span></h2>
        <p class="book-author">by ${book.author} (${book.year})</p>
        <p class="book-genre">${book.genres.join(' · ')}</p>
        <p class="book-desc">
            ${book.description}
        </p>
        
        <div class="btn-section">
          <button class="book-btn delete">Delete</button>
          <button class="book-btn edit">Edit</button>

        </div>
        </div>
        
    </div>`
}


showLibrary()