let isOpen = false;

function openCanvas() {
  document
    .querySelector(".offcanvas-btn")
    .classList.toggle("offcanvas-btn-open");
  document
    .querySelector(".offcanvas-aside")
    .classList.toggle("offcanvas-aside-open");
  if (isOpen) {
    document.querySelector(".bg-container").innerHTML = "";
  } else {
    document.querySelector(".bg-container").innerHTML =
      '<div class="back-screen" onclick="openCanvas()" ></div>';
  }
  isOpen = !isOpen;
}
