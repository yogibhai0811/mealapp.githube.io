
const container = document.getElementById('info-container');

const header = document.getElementById('header');

const instructions = document.getElementById('instructions');

const thumb = document.getElementById('thumb');

const ingredients = document.getElementById('ingredients');

const area = document.getElementById('area');



fetchMeal();

  // Fetches the Meal based on the ID associated with it
  async function getMealById(id) {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await resp.json();
    const meal = data.meals;
    // console.log(meal)  
    return meal;
  }

  // It Performs Operation to fetch Meal

  async function fetchMeal() {
    
    const id = getMeal();
    const meals = [];
    for (let i = 0; i < id.length; i++) {
      const mealID = id[i];
      let meal;
      if(i==id.length-1){ 
      meal = await getMealById(mealID);
      }
    //   addMealToFav(meal);
      meals.push(meal);//add the new item to the start always
      // meals[0]=meal;
      if(meals.length==2){
        removeMeal();   
      }
    }
    // console.log(meals);

    // creating HTML part  and appending
    header.innerHTML = `${ meals[meals.length-1][0].strMeal}`;     

    area.innerHTML= `${ meals[meals.length-1][0].strArea}`;
    thumb.src=meals[meals.length-1][0].strMealThumb;
    instructions.innerHTML=meals[meals.length-1][0].strInstructions;

    document.getElementById('ingredients-info').innerText='Ingredients';


    for(let i=1;i<=20;i++){
      const ingredient= document.createElement('li');
      ingredient.classList.add('ingredient')
      const m=meals[meals.length-1][0];
      // ingredient.innerHTML=m[`strIngredient${i}`];
      if(m[`strIngredient${i}`] !=="" ){
        ingredient.innerHTML=`${m[`strIngredient${i}`]} - ${m[`strMeasure${i}`]}`;
        ingredients.appendChild(ingredient); 

        if(ingredient.innerText.includes("null")){
          ingredients.removeChild(ingredient);
        }
      }   
    }

   

  }


// local storage 
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
  function removeMeal() {
    const id = getMeal();
    localStorage.setItem(
      'id',
      JSON.stringify(id.slice(1))
    );
  }


  