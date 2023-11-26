function searchRecipes() {
    // Get the search query
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  
    // Fetch the recipes JSON file
    fetch('../data/recipes.json')
      .then(response => response.json())
      .then(data => {
        // Filter the recipes based on the search query
        const searchResults = data.recipes.filter(recipe => {
          // Check if the search query is included in the title, ingredients, or occasion
          return recipe.title.toLowerCase().includes(searchQuery) ||
                 recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery)) ||
                 recipe.occasion.toLowerCase().includes(searchQuery);
        });
  
        // Now you can display these search results
        // For example, clear the current list and append the new results
        const resultsContainer = document.getElementById('most-recent-recipes');
        resultsContainer.replaceChildren();
  
        searchResults.forEach(recipe => {
          // Call a function to display each recipe in the results
          displayRecipe(recipe);
        });
      })
      .catch(error => {
        console.error('Error loading recipes:', error);
      });
  }
  

  document.getElementById('search-bar').addEventListener('keyup', function(event) {
    // Check if the key pressed was 'Enter'
    if (event.key === 'Enter') {
      searchRecipes();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Optionally set a default search query or leave the search bar empty to show all recipes
    document.getElementById('search-bar').value = ''; // Set to a default search term if needed
    searchRecipes(); // Perform the search
  });

  document.getElementById('search-bar').addEventListener('input', searchRecipes);