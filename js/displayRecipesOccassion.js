function loadRecipes(){
    fetch('data/recipes.json')
        .then(response => response.json())
        .then(data => {
            const filteredRecipes = data.recipes.filter(recipe => recipe.occasion === occasion);

            displayTopRatedRecipes(data.recipes);
            filteredRecipes.forEach(displayRecipe);

        })
        .catch(error => {
            console.error('Error loading recipes:', error);
        });
}


window.addEventListener('DOMContentLoaded', loadRecipes);
