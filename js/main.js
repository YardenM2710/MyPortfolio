console.log("Starting up");

var gProjs = [];
createProjs();

$(document).ready(onInit);

function onInit() {
  renderPortfolio();
  renderModal();
}
function onSubmit() {
  var email = $("#exampleFormControlInput1").val();
  var subject = $("#exampleFormControlInput2").val();
  var text = $("#exampleFormControlTextarea1").val();
  if (!email && !subject && !text) return;
  var urlLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${text}`;
  window.open(urlLink);
  $("#exampleFormControlInput1").val("");
  $("#exampleFormControlInput2").val("");
  $("#exampleFormControlTextarea1").val("");
}

function getProjs() {
  return gProjs;
}
