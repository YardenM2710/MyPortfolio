function onInit() {
  renderBooks();
}

function renderBooks() {
  var books = getBooks();
  let strHtml =
    "<tr><td>Id</td><td>Title</td><td>Price</td><td>Actions</td></tr>";
  books.forEach((book) => {
    strHtml += `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price}$</td><td><button id="${book.id}" onclick="onReadBook(this.id)">Read<button id="${book.id}" onclick="onUpdateBooks(this.id)">Update<button onclick="onRemoveBook(this.id)" id="${book.id}">Delete</td></tr>`;
  });
  document.querySelector("tbody").innerHTML = strHtml;
}

function onRemoveBook(id) {
  removeBook(id);
  renderBooks();
}

function onAddBooks() {
  toggleModal();
  var bookTitle = document.querySelector(".book-title").value;
  var bookPrice = document.querySelector(".book-price").value;
  addBook(bookTitle, bookPrice);
  renderBooks();
  document.querySelector(".book-title").value = "";
  document.querySelector(".book-price").value = "";
}

function onUpdateBooks(id) {
  toggleUpdateModal();
  var bookPrice = document.querySelector(".update-price").value;
  var bookTitle = document.querySelector(".update-title").value;
  console.log(bookTitle, bookPrice);
  updateBooks(id, bookPrice, bookTitle);
  renderBooks();
  document.querySelector(".update-price").value = "";
  document.querySelector(".update-title").value = "";
}

function onReadBook(bookId) {
  var elModal = document.querySelector(".modal");
  editBooksDisplay(bookId);
  elModal.style.display = "flex";
}

function closeModal() {
  var elModal = document.querySelector(".modal");
  elModal.style.display = "none";
}

function onRate(id, rating) {
  setRating(id, rating);
}

function onNextPage() {
  nextPage();
  renderBooks();
}

function toggleModal() {
  var modal = document.querySelector(".add-books-modal");
  gIsVisible = !gIsVisible;
  if (gIsVisible) modal.style.display = "flex";
  else modal.style.display = "none";
}
function toggleUpdateModal() {
  var modal = document.querySelector(".update-books-modal");
  gIsUpdateVisible = !gIsUpdateVisible;
  if (gIsUpdateVisible) modal.style.display = "flex";
  else modal.style.display = "none";
}
