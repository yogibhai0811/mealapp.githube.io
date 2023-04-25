const input = document.querySelector('#search-input');

const randomBtn = document.querySelector('#random');

const submitBtn = document.querySelector('#search-btn');

const recipes = document.getElementById('recipes');

const result = document.getElementById('results');

const randomMeal = document.querySelector('#random-meal');


randomBtn.addEventListener('click',randomRecipe);


// random meal 
async function randomRecipe(){
    recipes.innerHTML="";
    randomMeal.innerHTML="";

    await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).
    then(res => res.json()).then(data =>{
        const meal=data.meals[0];
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.setAttribute('id', meal.idMeal);
        mealDiv.classList.add('recipe');

        // create image tag for thumbnail
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
        // if(favBtn.id==`${meal.idMeal}`){
        //     favBtn.style.color="red";
        // }else{
        //     favBtn.style.color="black";                    
        // }
        
        // append fav btn
        mealDiv.appendChild(favBtn);

        favBtn.addEventListener('click',()=>{
            console.log("clicked");
            if (favBtn.value =='add') {
                favBtn.setAttribute('value', 'remove');
                favBtn.style.color="red";                                                
                addMealLS(meal.idMeal);
              } else {
                favBtn.setAttribute('value', 'add');
                favBtn.style.color="black";
                removeMealLS(meal.idMeal);
              }
        })

        // finally append the mealDiv to the recipes div in index html 

        recipes.appendChild(mealDiv);
    }) 
}


submitBtn.addEventListener('click', searchRecipe);


// creating the array for autofill feature 
let mealArr=['Apple Frangipan Tart', 'Apple & Blackberry Crumble', 'Apam balik', 'Ayam Percik', 'Bakewell tart', 'Bread and Butter Pudding', 'Beef Wellington', 'Baingan Bharta', 'Beef Brisket Pot Roast', 'Beef Sunday Roast', 'Braised Beef Chilli', 'Beef stroganoff', 'Broccoli & Stilton soup', 'Bean & Sausage Hotpot', 'Banana Pancakes', 'Beef Dumpling Stew', 'Beef and Mustard Pie', 'Beef and Oyster pie', 'Blackberry Fool', 'Battenberg Cake', 'Beef Bourguignon', 'Brie wrapped in prosciutto & brioche', 'Boulangère Potatoes', 'BeaverTails', 'Brown Stew Chicken', 'Beef Lo Mein', 'Baked salmon with fennel & tomatoes', 'Budino Di Ricotta', 'Breakfast Potatoes', 'Bitterballen (Dutch meatballs)', 'BBQ Pork Sloppy Joes', 'Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber', 'Big Mac', 'Bigos (Hunters Stew)', 'Boxty Breakfast', 'Beef Rendang', 'Burek', 'Chocolate Gateau', 'Chicken Enchilada Casserole', 'Cream Cheese Tart', 'Christmas Pudding Flapjack', 'Chicken Handi', 'Chicken Alfredo Primavera', 'Chicken Fajita Mac and Cheese', 'Cajun spiced fish tacos', 'Crock Pot Chicken Baked Tacos', 'Chicken Karaage', 'Coq au vin', 'Chilli prawn linguine', 'Clam chowder', 'Creamy Tomato Soup', 'Chicken & mushroom Hotpot', 'Chicken Couscous', 'Chocolate Avocado Mousse', 'Choc Chip Pecan Pie', 'Chocolate Raspberry Brownies', 'Chickpea Fajitas', 'Chicken Ham and Leek Pie', 'Chicken Parmentier', 'Carrot Cake', 'Chelsea Buns', 'Chocolate Souffle', 'Chinon Apple Tarts', 'Chicken Marengo', 'Canadian Butter Tarts', 'Chicken Basquaise', 'Callaloo Jamaican Style', 'Chicken Congee', 'Chocolate Caramel Crispy', 'Chakchouka ', 'Cashew Ghoriba Biscuits', 'Corba', 'Christmas Pudding Trifle', 'Classic Christmas pudding', 'Christmas cake', 'Corned Beef and Cabbage', 'Crispy Sausages and Greens', 'Chicken Quinoa Greek Salad', 'Chick-Fil-A Sandwich', 'Coddled pork with cider', 'Cevapi Sausages', 'Croatian lamb peka', 'Croatian Bean Stew', 'Chivito uruguayo', 'Dal fry', 'Dundee cake', 'Duck Confit', 'Eton Mess', 'Eccles Cakes', 'English Breakfast', 'Escovitch Fish', 'Egg Drop Soup', 'Egyptian Fatteh','Fish pie', 'French Lentils With Garlic and Thyme', 'Fettucine alfredo', 'Full English Breakfast', 'French Onion Soup', 'Flamiche', 'French Omelette', 'Fish Stew with Rouille', 'Fennel Dauphinoise', 'Fruit and Cream Cheese Breakfast Pastries', 'French Onion Chicken with Roasted Carrots & Mashed Potatoes', 'Ful Medames', 'Feteer Meshaltet', 'Fish fofos', 'Fresh sardines', 'Fettuccine Alfredo', 'Garides Saganaki', 'Grilled Mac and Cheese Sandwich', "General Tso's Chicken", 'Gigantes Plaki', 'Gołąbki (cabbage roll)', 'Grilled Portuguese sardines', 'Honey Teriyaki Salmon', 'Hot Chocolate Fudge', 'Hot and Sour Soup', 'Home-made Mandazi', 'Honey Balsamic Chicken with Crispy Broccoli & Potatoes', 'Honey Yogurt Cheesecake', 'Ham hock colcannon', 'Irish stew', 'Jam Roly-Poly', 'Jerk chicken with rice & peas', 'Jamaican Beef Patties', 'Japanese gohan rice', 'Japanese Katsudon', 'Kapsalon', 'Kentucky Fried Chicken', 'Katsu Chicken curry', 'Key Lime Pie', 'Kidney Bean Curry', 'Kedgeree', 'Kung Pao Chicken', 'Kung Po Prawns', 'Kafteji', 'Keleya Zaara', 'Kumpir', 'Krispy Kreme Donut', 'Koshari', 'Lamb tomato and sweet spices', 'Lamb Biryani', 'Lamb Rogan josh', 'Laksa King Prawn Noodles', 'Lamb Tagine', 'Lasagne', 'Lamb and Potato pie', 'Lancashire hotpot', 'Leblebi Soup', 'Lasagna Sandwiches', 'Lamb and Lemon Souvlaki', 'Lamb Tzatziki Burgers','Mediterranean Pasta Salad', 'Massaman Beef curry', 'Mushroom & Chestnut Rotolo', 'Matar Paneer', 'Minced Beef Pie', 'McSinghs Scotch pie', 'Madeira Cake', 'Montreal Smoked Meat', 'Ma Po Tofu', 'Mbuzi Choma (Roasted Goat)', 'Mince Pies', 'Moussaka', 'Mulukhiyah', 'Mustard champ', 'Moroccan Carrot Soup', 'Mee goreng mamak', 'Mushroom soup with buckwheat', 'Nutty Chicken Curry', 'New York cheesecake', 'Nanaimo Bars', 'Nasi lemak', 'Osso Buco alla Milanese', 'Oxtail with broad beans', 'Pad See Ew', 'Potato Gratin with Chicken', 'Poutine', 'Pilchard puttanesca', 'Pork Cassoulet', 'Pancakes', 'Pumpkin Pie', 'Peanut Butter Cheesecake', 'Peach & Blueberry Grunt', 'Parkin Cake', 'Pear Tarte Tatin', 'Provençal Omelette Cake', 'Prawn & Fennel Bisque', 'Pate Chinois', 'Pouding chomeur', 'Peanut Butter Cookies', 'Pizza Express Margherita', 'Paszteciki (Polish Pasties)', 'Pierogi (Polish Dumplings)', 'Polskie Naleśniki (Polish Pancakes)', 'Piri-piri chicken and slaw', 'Portuguese prego with green piri-piri', 'Portuguese barbecued pork (Febras assadas)', 'Portuguese fish stew (Caldeirada de peixe)', 'Portuguese custard tarts', 'Rigatoni with fennel sausage sauce', 'Rocky Road Fudge', 'Recheado Masala Fish', 'Ribollita', 'Roasted Eggplant With Tahini, Pine Nuts, and Lentils', 'Rock Cakes', 'Ratatouille', 'Rappie Pie', 'Red Peas Soup', 'Roast fennel and aubergine paella', 'Rosół (Polish Chicken Soup)', 'Rogaliki (Polish Croissant Cookies)', 'Roti john','Spaghetti Bolognese', 'Spicy Arrabiata Penne', 'Smoky Lentil Chili with Squash', 'Sticky Toffee Pudding Ultimate', 'Spicy North African Potato Salad', 'Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt', 'Salmon Prawn Risotto', 'Salted Caramel Cheescake', 'Seafood fideuà', 'Spinach & Ricotta Cannelloni', 'Squash linguine', 'Spanish Tortilla', 'Steak and Kidney Pie', 'Sticky Toffee Pudding', 'Spotted Dick', 'Summer Pudding', 'Summer Pistou', 'Split Pea Soup', 'Sugar Pie', 'Steak Diane', 'Saltfish and Ackee', 'Sweet and Sour Pork', 'Szechuan Beef', 'Shrimp Chow Fun', 'Salmon Avocado Salad', 'Salmon Eggs Eggs Benedict', 'Shakshuka', 'Smoked Haddock Kedgeree', 'Stamppot', 'Snert (Dutch Split Pea Soup)', 'Spaghetti alla Carbonara', 'Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots', 'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini', 'Strawberry Rhubarb Pie', 'Stuffed Lamb Tomatoes', 'Sledz w Oleju (Polish Herrings)', 'Shawarma', 'Spring onion and prawn empanadas', 'Seri muka kuih', 'Sushi','Teriyaki Chicken Casserole', 'Tandoori chicken', 'Thai Green Curry', 'Toad In The Hole', 'Turkey Meatloaf', 'Tuna Nicoise', 'Tahini Lentils', 'Three Fish Pie', 'Treacle Tart', 'Tarte Tatin', 'Three-cheese souffles', 'Tourtiere', 'Timbits', 'Tunisian Orange Cake', 'Tunisian Lamb Soup', 'Tuna and Egg Briks', 'Tamiya', 'Tonkatsu pork', 'Traditional Croatian Goulash','Vegan Lasagna', 'Vegan Chocolate Cake', 'Vietnamese Grilled Pork (bun-thit-nuong)', 'Venetian Duck Ragu', 'Vegetarian Casserole', 'Vegetarian Chilli', "Vegetable Shepherd's Pie", 'White chocolate creme brulee', 'Wontons', 'Walnut Roll Gužvara', 'Yaki Udon'];

// console.log(mealArr);


async function searchRecipe(event){

    // clearing the random meal
    randomMeal.innerHTML="";

    // randomMeal.style.display="none";

    // resetting the value if the user clicks again 
    recipes.innerHTML="";

    

    // check if input value is working
    //using trim to remove extra spaces in left and right
    const inputValue = input.value.trim();

    // console.log(inputValue.trim());
    // console.log(inputValue);

    // check if the value is empty if yes return

    if(!inputValue){
        alert("Cannot be Empty! Enter the Recipe Name");
        return;
    }

    
    if(inputValue){

       await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
        ).then((res) => res.json()
        ).then((data) => {
            // console.log(data)
            // console.log(data.meals[1])

        
            if(data.meals===null){
                result.innerHTML=`<h2>No meal found for ${inputValue}</h2>`
                return;
            }

                data.meals.map((meal) => { 
                //creating elements using create element


                // create meal div for each meal
                const mealDiv = document.createElement('div');
                mealDiv.setAttribute('id', meal.idMeal);
                mealDiv.classList.add('recipe');

                // create image tag for thumbnail
                const a = document.createElement('a');
                a.href = "meal.html";
                const thumb = document.createElement("img");
                thumb.src=meal.strMealThumb;
                //append thumbnail to meal div
                a.appendChild(thumb);
                mealDiv.appendChild(a);
                

               // adding the clicked recipe to the local storage for the meal.html page
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
               
                
                // append fav btn
                mealDiv.appendChild(favBtn);

                favBtn.addEventListener('click',()=>{
                    console.log("clicked");
                    if (favBtn.value =='add') {
                        favBtn.setAttribute('value', 'remove');
                        favBtn.style.color="red";                                                
                        addMealLS(meal.idMeal);
                      } else {
                        favBtn.setAttribute('value', 'add');
                        favBtn.style.color="black";
                        removeMealLS(meal.idMeal);
                      }
                })

                // finally append the mealDiv to the recipes div in index html 

                recipes.appendChild(mealDiv);

                input.value="";   
                

                //resetting the suggestions inner html to blank
                suggestions.style.display="none";
            })
             
        })
        }   
}



// local storage  for favourites page

// Fetches the Meal from the Local Storage
function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
  
    return mealIds === null ? [] : mealIds;
  }
  
  // Add Meal to the Local Storage
  function addMealLS(mealID) {
    const mealIds = getMealLS();
    // console.log(mealIds);

    // checking if meal already present in favourites if yes then we will return and do nothing
    for(let i=0;i<mealIds.length;i++){
      if(mealIds[i]==mealID){
        alert("Already Added to Favourites");
        return;
      }      
    }
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealID]));
  }

  
  // Remove Meal from Local Storage
  function removeMealLS(mealID) {
    const mealIds = getMealLS();
    localStorage.setItem(
      'mealIds',
      JSON.stringify(mealIds.filter((id) => id !== mealID))
    );
  }




// local storage for meal information page


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





//autocomplete feature

function autocomplete(input, list) {
    //Add an event listener to compare the input value with all countries
    input.addEventListener('input', function () {
        //Close the existing list if it is open
        closeList();

        //If the input is empty, exit the function
        if (!this.value)
            return;

        //Create a suggestions <div> and add it to the element containing the input field
        suggestions = document.createElement('div');
        suggestions.setAttribute('id', 'suggestions');
        input.parentNode.appendChild(suggestions);

        //Iterate through all entries in the list and find matches
        for (let i=0; i<list.length; i++) {
            if (list[i].substr(0, input.value.length).toUpperCase() == input.value.toUpperCase()) {
                //If a match is foundm create a suggestion <div> and add it to the suggestions <div>
                suggestion = document.createElement('div');
                suggestion.innerHTML = list[i];

                suggestion.addEventListener('click', function () {
                    input.value = this.innerHTML;
                    
                    closeList();
                });

                // add event listener for the suggestion list feature
                suggestion.addEventListener('click', searchRecipe);
                suggestion.style.cursor = 'pointer';

                suggestions.appendChild(suggestion);
            }
        }

    });

    

    function closeList() {
        let suggestions = document.getElementById('suggestions');
        if (suggestions)
            suggestions.parentNode.removeChild(suggestions);
    }

}

autocomplete(input, mealArr);






