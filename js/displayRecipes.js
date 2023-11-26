  
function displayRecipe(recipe, index) {
     // Create a div for each recipe
     const recipeContainer = document.createElement("div");
     recipeContainer.classList.add("recipe-container"); // You can style this class as needed
 
     recipeContainer.addEventListener('click', function() {
        // Navigate to the recipe details page with the recipe ID as a query parameter
        window.location.href = `../recipes/recipeDetails.html?id=${recipe.id}`; // Use the actual ID field from your JSON
    });
 
     // Create a div for the recipe image (on the left)
     const recipeImage = document.createElement("div");
     recipeImage.classList.add("recipe-image"); // You can style this class as needed
 
     // Create an img element for the recipe image
     const imageElement = document.createElement("img");
     imageElement.src = recipe.image;
     imageElement.alt = recipe.title;
 
     // Append the image element to the recipe image div
     recipeImage.appendChild(imageElement);
 
     // Create a div for the recipe details (on the right)
     const recipeDetails = document.createElement("div");
     recipeDetails.classList.add("recipe-details"); // You can style this class as needed
 
     // Add the recipe name to the details
     const recipeName = document.createElement("h2");
     recipeName.textContent = recipe.title;
 
     const recipeOccasion = document.createElement("div");
     recipeOccasion.classList.add("recipe-occasion");
     recipeOccasion.innerHTML = `<i class="fas fa-calendar"></i> <b>Occasion:</b>  ${recipe.occasion}`;
     
     // Create a div for the total cooking time
     const totalCookingTime = document.createElement("div");
     totalCookingTime.classList.add("total-cooking-time");
     totalCookingTime.innerHTML = `<i class="fas fa-clock"></i> <b>Total Cooking Time:</b> ${recipe.totalTime}`;
     
     // Append the recipe name, occasion, and cooking time to the recipe details div
     recipeDetails.appendChild(recipeName);
     recipeDetails.appendChild(recipeOccasion);
     recipeDetails.appendChild(totalCookingTime);
     // Append the recipe image div and recipe details div to the recipe container
     recipeContainer.appendChild(recipeImage);
     recipeContainer.appendChild(recipeDetails);
     
 
     // Append the recipe container to the main container (where you want to display the recipes)
     const mainContainer = document.getElementById("most-recent-recipes"); // Replace with your container selector
     mainContainer.appendChild(recipeContainer);
  }

  function displayTopRatedRecipes(recipes) {
    const topRated = recipes.sort((a, b) => b.rating - a.rating).slice(0, 2);

    const favoritesContainer = document.getElementById('favorites');

    favoritesContainer.innerHTML = '';

    topRated.forEach(recipe => {
        const listItem = document.createElement('li');
        listItem.className = 'favorite-item';
        listItem.addEventListener('click', function() {
            // Navigate to the recipe details page with the recipe ID as a query parameter
            window.location.href = `../recipes/recipeDetails.html?id=${recipe.id}`; // Use the actual ID field from your JSON
        });
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';

        const titleElement = document.createElement('h3');
        titleElement.textContent = recipe.title;
        textContainer.appendChild(titleElement);

        const ratingElement = document.createElement('p');
        ratingElement.textContent = `Rating: ${recipe.rating}`;
        textContainer.appendChild(ratingElement);

        // Append the text container to the list item
        listItem.appendChild(textContainer);

        // Create and append the image
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;
        image.className = 'favorite-image'; // Add a class for styling

        listItem.appendChild(image);

        favoritesContainer.appendChild(listItem);
    });
}




function loadRecipes(){
    fetch('../data/recipes.json')
        .then(response => response.json())
        .then(data => {
            displayTopRatedRecipes(data.recipes);
            data.recipes.forEach(displayRecipe);
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');
  
    imageContainers.forEach(container => {
      container.addEventListener('click', function() {
        const occasion = this.id; 
        window.location.href = `../recipes/occassion.html?occasion=${occasion}`;
      });
    });
  });

function callOccasionRecipes(occasion) {
    fetch('../data/recipes.json')
      .then(response => response.json())
      .then(data => {
        const filteredRecipes = data.recipes.filter(recipe => recipe.occasion === occasion);
        filteredRecipes.forEach(displayRecipe);
        displayTopRatedRecipes(data.recipes);

      })
      .catch(error => {
        console.error('Error loading recipes:', error);
      });
  }
  window.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const occasion = params.get('occasion');
  
    if (occasion) {
        document.querySelector('h2').textContent = `Recipes for ${occasion.charAt(0).toUpperCase() + occasion.slice(1)}`;
        callOccasionRecipes(occasion);
    } else {
        loadRecipes();
    }
    
  });


