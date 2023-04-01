// This is for NAVBAR AND FOOTER
let category = document.getElementById("category");
let moving = document.getElementById("moving");
let text = document.getElementById("text");
let list = document.getElementById("list");
let filter = document.getElementById("filter-icon");
let filterBox = document.getElementById("filter-box");
let filterCloseBtn = document.getElementById("filter-close-button");

category.addEventListener("click", () => {
  list.classList.toggle("hidden");
  moving.classList.toggle("rotate");
});

// category filtering
function chooseCategory(choose) {
  text.innerHTML = choose;

  // filter
  let filteredArray = [];
  getFilteredInputs(choose);
  function getFilteredInputs(filterItem) {
    if (filterItem === "All") {
      filteredArray = inputData;
    } else {
      filteredArray = inputData.filter((el) => {
        return el.category === filterItem;
      });
    }
    console.log(filteredArray);
    return filteredArray;
  }

  //displaying filteredcards
  displayCards(filteredArray);
}

// price filtering
function applyPriceFilter() {
  let filterMinValue = document.getElementById("min_input").value;
  let filterMaxValue = document.getElementById("max_input").value;
  if (filterMaxValue <= filterMinValue) {
    alert("Max value should be greater than min value");
    return;
  } else {
    let newArray = inputData.filter((e) => {
      return (
        parseInt(e.price) >= filterMinValue &&
        parseInt(e.price) <= filterMaxValue
      );
    });
    console.log(newArray);
    displayCards(newArray);
  }
}

function resetDisplayCards() {
  document.getElementById("min_input").value = "";
  document.getElementById("max_input").value = "";
  displayCards(inputData);
}

// filter section

filter.addEventListener("click", openFilterSection, true);

function openFilterSection() {
  if (!filterBox.classList.contains("showElement")) {
    filterBox.classList.add("showElement");
  }
  if (filterBox.classList.contains("hideElement")) {
    filterBox.classList.remove("hideElement");
  }
}

function closeFilterSection() {
  filterBox.classList.remove("showElement");
  if (filterBox.classList.contains("showElement")) {
    filterBox.classList.remove("showElement");
  }
  if (!filterBox.classList.contains("hideElement")) {
    filterBox.classList.add("hideElement");
  }
}

// THis is for the main display
const cardContainer = document.querySelector(".card-cardSection");
// get input data
let inputData = "";

fetch("./database.json")
  .then((response) => response.json())
  .then((data) => {
    inputData = data;
    displayCards(inputData);
  })
  .catch((error) => console.error(error));

// display cards
function displayCards(inputArray) {
  let newElement = "";
  inputArray.forEach((item) => {
    newElement += `<div class="card-cardHolder">
    <div class="card-cardExceptIcon" onclick="openModel(this)" data-desc="${item.description}">
            <img
            class="card-image"
            src="${item.image}"
            />
            <div class="card-details">
            <h4 class="card-itemPriceSec">₹ ${item.price}</h4>
            <h4 class="card-itemTitle">${item.title}</h4>
            <!-- <h4 class="card-itemDesc">${item.description}</h4> -->
            </div>
        </div>
        <i onclick="updateWatchlistIcon(this)" data-watchListAdded="false" class="card-icon card-addToWatchList-notAdded fa-solid fa-apple-whole"></i>
        <div class ="card-info" style="display: none">${item.description}</div>
      </div>
      `;
  });
  if (newElement === "") {
    cardContainer.innerHTML = `<div class="DataNotExist"><img src="https://cdn.dribbble.com/users/308895/screenshots/2598725/no-results.gif"></div>`;
  } else {
    cardContainer.innerHTML = newElement;
  }
}

// updating the watchlist icon
function updateWatchlistIcon(e) {
  console.log("icon");
  watchListAdded = e.getAttribute("data-watchListAdded");

  if (watchListAdded === "true") {
    e.setAttribute(
      "class",
      "card-icon card-addToWatchList-notAdded fa-solid fa-apple-whole"
    );
    e.setAttribute("data-watchListAdded", "false");
  } else {
    e.setAttribute(
      "class",
      "card-icon card-addToWatchList-added fa-brands fa-apple"
    );
    e.setAttribute("data-watchListAdded", "true");
  }
}

//opening the modal
function openModel(e) {
  console.log("openModel");
  blurBgDiv.classList.add("component-show");
  modalContainerDiv.classList.add("component-show");
  blurBgDiv.classList.remove("component-hide");
  modalContainerDiv.classList.remove("component-hide");

  const price = e.querySelector(".card-itemPriceSec").textContent;
  const name = e.querySelector(".card-itemTitle").textContent;
  const imgSrc = e.querySelector(".card-image").getAttribute("src");
  //   const description = e.querySelector(".card-info").textContent;
  const description = e.getAttribute("data-desc");
  console.log(price);
  console.log(name);
  console.log(imgSrc);
  console.log(description);
  document.querySelector(".modal-price").innerHTML = price;
  document.querySelector(".modal-title").innerHTML = name;
  document.querySelector(".modal-image").setAttribute("src", imgSrc);
  document.querySelector(".modal-description").innerHTML = description;
}

//open close contact
const contactInfoDiv = document.querySelector(".modal-contactInfo");
function openCloseContact() {
  if (contactInfoDiv.classList.contains("modal-cI-close")) {
    contactInfoDiv.classList.remove("modal-cI-close");
    contactInfoDiv.classList.add("modal-cI-open");
    // clearInterval(myInterval);

    const myInterval = setInterval(() => {
      contactInfoDiv.classList.add("modal-cI-close");
      contactInfoDiv.classList.remove("modal-cI-open");
    }, 3000);
  }
  // else{
  //     // clearInterval(myInterval);
  //     contactInfoDiv.classList.add("modal-cI-close");
  //     contactInfoDiv.classList.remove("modal-cI-open");
  // }
}

//closing modal
const blurBgDiv = document.querySelector(".blur-bg");
const modalContainerDiv = document.querySelector(".modal-container");
function closeModal() {
  console.log(blurBgDiv);
  console.log(modalContainerDiv);
  blurBgDiv.classList.remove("component-show");
  modalContainerDiv.classList.remove("component-show");
  blurBgDiv.classList.add("component-hide");
  modalContainerDiv.classList.add("component-hide");
}

//Redirecting to selling page
document.getElementById("sell").addEventListener("click", function () {
  location.replace("./Sell/sellform.html");
});
