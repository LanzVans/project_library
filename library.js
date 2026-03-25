export let myLibrary = []

export function Book(...args){
  if (typeof args[0] ==="object" && !Array.isArray(args[0])){
    this.id=args[0].id;
    this.title = args[0].title;
    this.author = args[0].author;
    this.rating = args[0].rating 
    this.year = args[0].year;
    this.pages = args[0].pages;
    this.image = args[0].image;
    this.description = args[0].description;
    this.genres= args[0].genres
    return;
  }
  
  const [title,author,year,pages,image,rating, description,genres]=args
   this.id=crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.rating = rating 
    this.year = year;
    this.pages = pages;
    this.image = image;
    this.description = description;
    this.genres = genres
} 


export function addBookToLibrary(...params){
    myLibrary.push(new Book(...params))
    console.log('Book has been added to the library')
   
   }


export function setLibrary(){
  if(localStorage.getItem("myLibrary")!=null){
    localStorage.setItem("myLibrary",null)
  } try{
    localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
    console.log("Added to the local storage!")
  }catch(error){
    console.log("Problem occured while library reloading."+error)
  }
}

export function clearLibrary(){
  myLibrary = [];
  setLibrary();
}

function loadLibrary(){
  const data = localStorage.getItem("myLibrary");
  if(data!=null){
  myLibrary=[];
  JSON.parse(data).forEach((book)=>addBookToLibrary(book));   
  console.log("downloaded from localStorage") 
   } else return 'No data in localStarage found'
}

function bookCard(book){
  return`
  <div id="${book.id}" class="book-card">
    <div class="book-cover">
      <img src="${book.image}" alt="Book cover"></img>
    </div>
    <div class="book-info">
      <h2 class="book-title">${book.title}<span class="book-rating"> ★ ${book.rating}</span></h2>
      <p class="book-author">by ${book.author} (${book.year})</p>
      <p class="book-genre">${book.genres/*.join(' • ')*/}</p>
      <p class="book-desc">
        ${book.description}
      </p>
    
    <div class="btn-section">
      <button class = "book-btn delete">Delete</button>
      <button class="book-btn edit">Edit</button>
    </div>
    </div>
  </div>`
}


let editButtons = undefined;
let deleteButtons = undefined;
const libraryContainer = document.querySelector('.library-container')

function showLibrary(){
  console.log('Library render: ')
  libraryContainer.innerHTML='';
  loadLibrary()
  console.log(myLibrary)
  
  myLibrary.forEach((book)=>{
    libraryContainer.innerHTML += bookCard(book)});
    deleteButtons = document.querySelectorAll('.delete');
    editButtons = document.querySelectorAll('.edit');
 
  deleteButtons.forEach(button=>button.addEventListener("click",()=>deletionHandle(button))); 
  editButtons.forEach(button=>button.addEventListener("click",()=>formCall(button,'edition'))); 

}

showLibrary()

let currentBookId="";
let currentFormStatus ="";
const editModal = document.querySelector('.edit-modal')
const editForm = document.getElementById('edit-form')
const addButton = document.querySelector('.book-btn.add')



function formCall(button, status){
  currentFormStatus = status;
  console.log('Form called with status: ' + status)
  if (status==="edition"){
    
    const id = button.closest('.book-card').id;
    currentBookId = id;
    const book = myLibrary.find((book)=>book.id===id);
    console.log('Book to edit: ', book)
    editModal.style.display="block";
    
    document.getElementById("input-title").value = book.title;
    document.getElementById("input-author").value = book.author;
    document.getElementById("input-cover").value = book.image;
    document.getElementById("input-year").value = book.year;
    document.getElementById("input-pages").value = book.pages;
    document.getElementById("input-rating").value = book.rating;
    document.getElementById("input-desc").value = book.description;
    document.getElementById("input-genres").value = book.genres;
    return
} 
  if (status === "adding"){
    editModal.style.display="block";
  }
}


function clearError(input) {
  input.classList.remove("invalid");
  input.nextElementSibling.textContent = "";
}

function showError(input, error){
  input.nextElementSibling.textContent = error;
  input.classList.add("invalid")
}

function clearErrorOnInput(input) {
  input.addEventListener("input", () => {
  console.log('1');
    if (input.validity.valid) {
      clearError(input);
    }
  });
}

editForm.addEventListener("click",(e)=>{
  if(e.target.id=='clear-form'){
    const title = document.getElementById('input-title');
    const author = document.getElementById('input-author');
    const year = document.getElementById('input-year');
    const pages = document.getElementById('input-pages');
    const image = document.getElementById('input-cover')
    const rating = document.getElementById('input-rating');
    const description = document.getElementById('input-desc');
    const genres = document.getElementById('input-genres');
    const fields =[title,author,year,pages,image,rating,description,genres]
    fields.forEach(field=>clearError(field))
    console.log('Clear form. No changes applied');
    editForm.reset()
    editModal.style.display ='none'
  }
})

editForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const title = document.getElementById('input-title');
  const author = document.getElementById('input-author');
  const year = document.getElementById('input-year');
  const pages = document.getElementById('input-pages');
  const image = document.getElementById('input-cover')
  const rating = document.getElementById('input-rating');
  const description = document.getElementById('input-desc');
  const genres = document.getElementById('input-genres');
  const fields =[title,author,year,pages,image,rating,description,genres]

  const isSubmited =fieldValidation(fields) 

  if(isSubmited){
    if (currentFormStatus ==='edition'){
      editingSubmition(fields)
    } else if (currentFormStatus ==='adding'){
      addingSubmition(fields)
    }
    editForm.reset();
    editModal.style.display = "none";
    currentBookId = '';
    currentFormStatus = '';
    console.log('Form submited.');
    setLibrary();
    showLibrary();
    }
    
  }
)



function editingSubmition([title,author,year,pages,image,rating,description,genres]){
  const book = myLibrary.find((record)=>record.id===currentBookId);
  book.title = title.value;
  book.author = author.value;
  book.year = year.value;
  book.pages = pages.value;
  book.image = image.value;
  book.rating = rating.value;
  book.description = description.value;
  book.genres = genres.value.split(",");
}

function addingSubmition([title,author,year,pages,image,rating,description,genres]){
  addBookToLibrary(
    title.value,
    author.value,
    year.value,
    pages.value,
    image.value,
    rating.value,
    description.value,
    genres.value.split(","))
}

function fieldValidation([title,author,year,pages,image,rating,description,genres]){
  let isValid = true;
  console.log('Validation started...')
  clearErrorOnInput(title);
  if(!title.value){
    showError(title,"Enter the book title")
    isValid =false;
  } else {
    clearError(title);
  }
  clearErrorOnInput(author);
  if(!author.value){
    showError(author,"Enter the book author")
    isValid =false;
  } else {
    clearError(author); 
  }
  clearErrorOnInput(year);
  if(!year.value){
    showError(year,"Enter the year")
    isValid =false;
  } else {
    clearError(year); 
  }
  clearErrorOnInput(pages);
  if(!pages.value){
    showError(pages,"Enter numer of pages")
    isValid =false;
  } else {
    clearError(pages); 
  }
  clearErrorOnInput(image);
  if(!image.value){
    showError(image,"Enter link to image cover")
    isValid =false;
  } else {
    clearError(image); 
  }
  clearErrorOnInput(rating);
  if(!rating.value){
    showError(rating,"Enter the rating")
    isValid =false;
  } else {
    clearError(rating); 
  }  
  clearErrorOnInput(description);
  if(!description.value){
    showError(description,"Enter the book description")
    isValid =false;
  } else {
    clearError(description);
  }  
  clearErrorOnInput(genres);
  if(!genres.value){
    showError(genres,"Enter the book genres")
    isValid =false;
  } else {
    clearError(genres);
  }
  return isValid;
}




addButton.addEventListener("click", ()=> formCall(addButton,"adding"))


 const deletionHandle=(button)=>{
  currentBookId = button.closest('.book-card').id
  const index = myLibrary.indexOf(myLibrary.find((record)=>record.id===currentBookId))
  console.log(index)
  const deleted = myLibrary.splice(index,1)
  if(deleted){
    alert(`The book ${currentBookId} was removed from the library.`)
    setLibrary()
    showLibrary()
    
  }else {
    alert("Something wrong with id's")
  }
 }
