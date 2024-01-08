const access = "yBDEzzYs66FVO1PJmafTv_Ejr-xf0YYjIV38oBIQ0f4";

const formE = document.querySelector("form");
const inputE = document.getElementById("search-input");
const searchE = document.querySelector(".search-results");
const showbutton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputE.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access}`;

  const response = await fetch(url);
  const data = await response.json();

  const result = data.results;

  if (page === 1) {
    searchE.innerHTML = "";
  }

  result.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchE.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showbutton.style.display = "block";
  }
}

formE.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showbutton.addEventListener("click", () => {
  searchImages();
});
