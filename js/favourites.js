const favRecipes = document.getElementById('recipes');



fetchFavMeals();

// Fetches the Meal from Local Storage
function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
  
    return mealIds === null ? [] : mealIds;
  }


  function removeMealLS(mealID) {
    const mealIds = getMealLS();
    localStorage.setItem(
      'mealIds',
      JSON.stringify(mealIds.filter((id) => id !== mealID))
    );
  }

  // Fetches the Meal based on the ID associated with it
async function getMealById(id) {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await resp.json();
    const meal = data.meals[0];
  
    return meal;
  }

  // It Performs Operation to fetch favourite Meals
async function fetchFavMeals() {
    favRecipes.innerHTML = '';
    const mealIds = getMealLS();
    const meals = [];
    for (let i = 0; i < mealIds.length; i++) {
      const mealID = mealIds[i];
      let meal = await getMealById(mealID);
      addMealToFav(meal);
      meals.push(meal);
    }
  }


  // Function to add Meal to Favourites page
function addMealToFav(meal) {
    // const fav_meals = document.createElement('div');
    const mealDiv = document.createElement('div');
    mealDiv.setAttribute('id', meal.idMeal);
    mealDiv.classList.add('recipe');

    // create image tag for thumbnail
    // const thumb = document.createElement("img");
    // //append thumbnail to meal div
    // mealDiv.appendChild(thumb);
    // thumb.src=meal.strMealThumb;



    const a = document.createElement('a');
    a.href = "meal.html";
    const thumb = document.createElement("img");
    thumb.src=meal.strMealThumb;
    //append thumbnail to meal div
    a.appendChild(thumb);
    mealDiv.appendChild(a);
    


    a.addEventListener('click',()=>{

        addMeal(meal.idMeal);

    })

    // create h3  tag for recipe name
    const name=document.createElement('h3');
    name.classList.add("name");
    name.innerHTML=`${meal.strMeal}`;
    //append h3 to meal div  
    mealDiv.appendChild(name);  
    
    // create h4  tag for recipe name
    const mealRegion=document.createElement('h4');
    mealRegion.classList.add("region");
    mealRegion.innerHTML=`${meal.strArea}`;
    //append h4 to meal div
    mealDiv.appendChild(mealRegion);

    //create anchor tag for video link
    const video = document.createElement('a');
    video.target="blank";
    video.innerText="Recipe Video";
    video.href = meal.strYoutube;
    //append anchor tag meal div
    mealDiv.appendChild(video);

    //create add to favourites button

    const favBtn = document.createElement('button');
    favBtn.classList.add("add-fav");
    favBtn.setAttribute("value","add");
    favBtn.setAttribute("id",`${meal.idMeal}`);
    favBtn.innerHTML=`<i class="fa-solid fa-heart"></i>`;
    favBtn.style.color="red";
    
    // append fav btn
    mealDiv.appendChild(favBtn);

    favBtn.addEventListener('click',()=>{
        // console.log("clicked");
        if (favBtn.style.color=="red") {
            removeMealLS(meal.idMeal);
            fetchFavMeals();
          } 
    })
  
    favRecipes.appendChild(mealDiv);

  }



  // test 


  function getMeal() {
    const id = JSON.parse(localStorage.getItem('id'));
  
    return id === null ? [] : id;
  }
  
  // Add Meal to the Local Storage
  function addMeal(mealID) {
    const id = getMeal();
    localStorage.setItem('id', JSON.stringify([...id, mealID]));
  }
  
  // Remove Meal from Local Storage
  function removeMeal(mealID) {
    const id = getMeal();
    localStorage.setItem(
      'id',
      JSON.stringify(id.filter((id) => id !== mealID))
    );
  }
