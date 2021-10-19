"use strict";

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function editBooksDisplay(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector(".modal");
  elModal.querySelector("h2").innerText = `Title : ${book.name}`;
  elModal.querySelector("h4").innerText = `Price : ${book.price} $`;
  elModal.querySelector("p").innerText = ` Book Id: ${book.id};`;
  elModal.querySelector("h1").innerHTML = `<img src="img/${book.name}.png" />`;
  elModal.querySelector(".rating").innerHTML = `  <!-- FIFTH STAR -->
    <input onclick="onRate('${bookId}',5)" type="radio" id="star_5" name="rate" value="5" />
    <label for="star_5" title="Five">&#9733;</label>
    <!-- FOURTH STAR -->
    <input onclick="onRate('${bookId}',4)" type="radio" id="star_4" name="rate" value="4" />
    <label for="star_4" title="Four">&#9733;</label>
    <!-- THIRD STAR -->
    <input onclick="onRate('${bookId}',3)" type="radio" id="star_3" name="rate" value="3" />
    <label for="star_3" title="Three">&#9733;</label>
    <!-- SECOND STAR -->
    <input onclick="onRate('${bookId}',2)" type="radio" id="star_2" name="rate" value="2" />
    <label for="star_2" title="Two">&#9733;</label>
    <!-- FIRST STAR -->
    <input onclick="onRate('${bookId}',1)" type="radio" id="star_1" name="rate" value="1" />
    <label for="star_1" title="One">&#9733;</label>`;
  for (var i = 1; i <= book.rating; i++) {
    var elStar = document.querySelector(`#star_${i}`);
    elStar.checked = true;
  }
}
