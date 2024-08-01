function output() {
  let data = JSON.parse(localStorage.getItem("favoriteList"));
  let clearBtn = document.querySelector(".clear-btn");
  let favoriteList = document.querySelector(".Favorite-Cards");

  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    console.log(data);
    favoriteList.innerHTML = "";
    data = [];
  });
  // favoriteList.innerHTML = '';
  favoriteList.innerHTML = "";
  data.forEach((item) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
      .then((res) => res.json())
      .then((cardData) => {
        cardData = cardData.meals[0];
        let card = document.createElement("div");
        card.classList.add("main-card1");
        let cardImg = document.createElement("div");
        cardImg.classList.add("card-img");
        let cardP = document.createElement("h5");
        cardP.classList.add("card-p");
        let viewBtn = document.createElement("button");
        viewBtn.classList.add("view-btn");
        viewBtn.id = cardData.idMeal;
        viewBtn.innerText = "View Item";

        let removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.id = cardData.idMeal;
        removeBtn.innerText = "Remove Item";

        cardImg.innerHTML = `<img src="${cardData.strMealThumb}" alt="meal-img" />`;
        cardP.innerHTML = `<p>${cardData.strMeal}</p>`;
        card.appendChild(cardImg);
        card.appendChild(cardP);
        card.appendChild(viewBtn);
        card.appendChild(removeBtn);
        favoriteList.appendChild(card);
        // console.log(cardData);

        removeBtn.addEventListener("click", (e) => {
          console.log(e.target.id);
          let cardToRemove = e.target.closest(".main-card1"); // Find the card to remove
          favoriteList.removeChild(cardToRemove);
          let currentData = data;
          let index = currentData.indexOf(e.target.id);
          currentData.splice(index, 1);
          localStorage.setItem("favoriteList", JSON.stringify(currentData));
          data = JSON.parse(localStorage.getItem("favoriteList"));
        });

        let vBtn = document.querySelectorAll(".view-btn");
        vBtn.forEach((item, index) => {
          console.log("clicked");
          item.addEventListener("click", (e) => {
            console.log(e.target.id, index);
            localStorage.removeItem("ViewItemId");
            localStorage.setItem("ViewItemId", e.target.id);
            window.location.href = "details.html";
          });
        });
      });
  });
}

output();
