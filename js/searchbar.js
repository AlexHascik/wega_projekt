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
  

        const resultsContainer = document.getElementById('most-recent-recipes');
        resultsContainer.replaceChildren();
  
        searchResults.forEach(recipe => {
          displayRecipe(recipe);
        });
      })
      .catch(error => {
        console.error('Error loading recipes:', error);
      });
  }
  

  document.getElementById('search-bar').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      searchRecipes();
    }
  });



  document.getElementById('search-bar').addEventListener('input', searchRecipes);