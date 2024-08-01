let cardSection = document.querySelector(".All-Cards");
let searchInput = document.querySelector(".search-input");
let searchSection = document.querySelector(".Searched-Cards");
let srchSech2 = document.querySelector(".search-section-h2");
let localStorageList = JSON.parse(localStorage.getItem("favoriteList"));
let favoriteList = localStorageList || [];
// Printing search items
// console.log(searchInput.value,"ok");
if (searchInput.value === "") {
  srchSech2.classList.add("Searched-Cards-none");
  searchSection.classList.remove("search-section-h2");
}
let input1;
searchInput.addEventListener("input", () => {
  input1 = searchInput.value;
  if (input1 === "") {
    srchSech2.classList.add("Searched-Cards-none");
    searchSection.classList.remove("search-section-h2");
    console.log(searchSection.classList, "ok empty");
    searchSection.innerHTML = "";
    searchSection.style.display = "none";
  } else if (input1 != "") {
    srchSech2.classList.remove("Searched-Cards-none");
    searchSection.style.display = "flex";
  }
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input1}`;
  SearchedItem(url);
});

// Searching Items
async function SearchedItem(url) {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    let data = await res.json();
    if (!data.meals) {
      throw new Error("No meals found");
    }
    searchSection.innerHTML = "";
    // console.log(data);
    data.meals.map((item) => {
      let card = document.createElement("div");
      card.classList.add("main-card1");
      let cardImg = document.createElement("div");
      cardImg.classList.add("card-img1");
      let cardP = document.createElement("h5");
      cardP.classList.add("card-p1");
      let viewBtn = document.createElement("button");
      viewBtn.classList.add("view-btn");
      viewBtn.innerText = "View";
      viewBtn.id = item.idMeal;
      cardImg.innerHTML = `<img src="${item.strMealThumb}" alt="meal-img" />`;
      // console.log(item.idMeal);
      cardP.innerHTML = `<p>${item.strMeal}</p><p id=${item.idMeal} class="favorite-emoji1">🖤</p>`;
      card.appendChild(cardImg);
      card.appendChild(cardP);
      card.appendChild(viewBtn);
      searchSection.appendChild(card);
    });
    // Favorite button Logic
    let favoriteBtn = document.querySelectorAll(".favorite-emoji1");
    favoriteBtn.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        console.log(e.target.id);
        if (e.target.textContent === "🖤") {
          e.target.textContent = "🧡";
          favoriteList.push(e.target.id);
          console.log(favoriteList);
          localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
          // let nnw = localStorage.getItem("favoriteList");
        } else {
          e.target.textContent = "🖤";
          let indx = favoriteList.indexOf(e.target.id);
          favoriteList.splice(indx, 1);
          // console.log(favoriteList.toString());
          // localStorage.clear();
          localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        }
      });
    });

    // View button Logic
    let vBtn = document.querySelectorAll(".view-btn");
    vBtn.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        // console.log(e.target.id)
        localStorage.removeItem("ViewItemId");
        localStorage.setItem("ViewItemId", e.target.id);
        window.location.href = "details.html";
      });
    });
  } catch (err) {
    console.log(err);
  }
}
// SearchedItem();
// Printing all items
async function allItems() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );
  let data = await res.json();
  // console.log(data.categories);
  data.categories.map((item) => {
    // console.log(item)
    let card = document.createElement("div");
    card.classList.add("main-card");
    let cardImg = document.createElement("div");
    card.classList.add("card-img");
    let cardP = document.createElement("h5");
    card.classList.add("card-p");
    let viewBtn = document.createElement("button");
    viewBtn.classList.add("view-btn");
    viewBtn.id = item.idCategory;
    viewBtn.innerText = "View";
    cardImg.innerHTML = `<img src="${item.strCategoryThumb}" alt="meal-img" />`;
    cardP.innerHTML = `<p>${item.strCategory}</p><p id=${item.idCategory} class="favorite-emoji">🖤</p>`;
    card.appendChild(cardImg);
    card.appendChild(cardP);
    // card.appendChild(viewBtn);
    cardSection.appendChild(card);
  });

  //Favorite button logic
  let favoriteBtn = document.querySelectorAll(".favorite-emoji");
  favoriteBtn.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      console.log(index, e.target.textContent);
      if (e.target.textContent === "🖤") {
        e.target.textContent = "🧡";
        favoriteList.push(e.target.id);
        // localStorage.clear();
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        console.log(favoriteList);
      } else {
        e.target.textContent = "🖤";
        let indx = favoriteList.indexOf(e.target.id);
        favoriteList.splice(indx, 1);
        console.log(favoriteList);
        // localStorage.clear();
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        let nww = localStorage.getItem("favoriteList");
        console.log(JSON.parse(nww));
      }
    });
  });

  // View button Logic
  let vBtn = document.querySelectorAll(".view-btn");
  vBtn.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      console.log(e.target.id, index);
      localStorage.removeItem("ViewItemId");
      localStorage.setItem("ViewItemId", e.target.id);
      window.location.href = "details.html";
    });
  });
}
allItems();
