function renderModal() {
  let projects = getProjs();
  var strHtml = "";
  projects.map((project, i) => {
    strHtml += `<div class="portfolio-modal modal fade" id="portfolioModal${i}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="close-modal" data-dismiss="modal">
      <div class="lr">
      <div class="rl"></div>
      </div>
      </div>
      <div class="container">
      <div class="row">
      <div class="col-lg-8 mx-auto">
      <div class="modal-body">
      <h2>${project.name}</h2>
      <p class="item-intro text-muted">${project.title}</p>
      <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.name}.png" alt="">
      <p>${project.desc}</p>
      <div class="flex col">
      <a href="projs/${project.name}/index.html" target="blank" class="check-btn">Check My Project</a>
      <button class="btn  exit-btn" data-dismiss="modal"  type="button">
      <i class="fa fa-times"></i>
      Close Project</button>
      </div>
  
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      `;
    $(".modal-container").html(strHtml);
  });
}

function renderPortfolio() {
  let projects = getProjs();
  console.log(projects);
  var strHtml = "";
  projects.map((project, i) => {
    strHtml += `<div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i}">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>   
        <img class="img-fluid"  src="img/portfolio/${project.name}.png" alt="">
      </a>
      <div class="portfolio-caption">
        <h4>${project.name}</h4>
        <p class="text-muted">${project.title}</p>
      </div>
    </div>`;
  });
  $(".proj-container").html(strHtml);
}

function createProjs() {
  createProject({
    id: "1",
    name: "Minesweeper",
    title: "The infamous Minesweeper",
    desc: "Pure Javascript implementation of Intergalactic Minesweeper!",
  });
  createProject({
    id: "2",
    name: "Ball-Board",
    title: "The Ball Game",
    desc: "Lets see if u can catch all the balls before they disapear",
  });
  createProject({
    id: "3",
    name: "Touch-Nums",
    title: "Time is just a number",
    desc: "Lets see if u can count",
  });
  createProject({
    id: "4",
    name: "PacMan",
    title: "Ghost eating yellow div",
    desc: "Pac-Man is a maze action game developed and released by Yarden for arcades in 2020 ",
  });
  createProject({
    id: "5",
    name: "Book-Shop",
    title: "Online library",
    desc: "Also Amazon started like this",
  });
  createProject({
    id: "6",
    name: "Chess",
    title: "Exciting board game",
    desc: "Amusing old people in the park since 1950",
  });
}

function createProject(project) {
  gProjs.push(project);
}
