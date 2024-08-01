// let item = localStorage.getItem('ViewItemId');
// console.log(item);
async function showDetails(){
  let cardImg = document.querySelector('.card-img');
  let cardP = document.querySelector('.details-section-h2');
  let item =  localStorage.getItem('ViewItemId');
  let cardUl = document.querySelector('.right-ul');
  let recipeLine = document.querySelector('.recipe-line');
  // console.log(item);
  let res = await fetch( `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
  let data = await res.json();
  // console.log(data.meals[0]);
  data = data.meals[0];
  cardImg.src = data.strMealThumb;
  cardP.textContent = `${data.strMeal} , Category: ${data.strCategory} , Area: ${data.strArea}`;
  let ingredients = [data.strIngredient1,data.strIngredient2,data.strIngredient3,data.strIngredient4,data.strIngredient4,data.strIngredient5,data.strIngredient6,data.strIngredient7,data.strIngredient8,data.strIngredient9,data.strIngredient10,data.strIngredient11,data.strIngredient12,data.strIngredient13,data.strIngredient14,data.strIngredient15,data.strIngredient16,];
  cardUl.innerHTML = '';
  ingredients.forEach((item)=>{
    if(item!==null){
      let cardli = document.createElement('li');
      cardli.classList.add('card-li');
      cardli.textContent = item;
      cardUl.appendChild(cardli);
    }
  })
  recipeLine.textContent = data.strInstructions;
}
showDetails()