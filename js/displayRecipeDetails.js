document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const recipeId = queryParams.get('id');

    // Fetch the JSON and find the recipe with the given ID
    fetch('../data/recipes.json')
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes.find(r => r.id == recipeId);
            if (recipe) {
                displayRecipeDetails(recipe);
            } else {
                console.error('Recipe not found');
            }
        })
        .catch(error => console.error('Error loading recipe:', error));
});

function displayRecipeDetails(recipe) {
    const container = document.getElementById('recipe-detail-container');

    

    const recipeName = document.createElement('h1');
    recipeName.textContent = recipe.title;
    container.appendChild(recipeName);

    const timesDiv = document.createElement('div');
    timesDiv.className = 'times';
    timesDiv.innerHTML = `
        <div><strong>Prep Time:</strong> ${recipe.prepTime}</div>
        <div><strong>Cook Time:</strong> ${recipe.cookTime}</div>
        <div><strong>Total Time:</strong> ${recipe.totalTime}</div>
        <div><strong>Servings:</strong> ${recipe.servings}
    `;
    container.appendChild(timesDiv);

    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.className = 'ingredients';
    const ingredientsHeader = document.createElement('h2');
    ingredientsHeader.textContent = 'Ingredients';
    ingredientsDiv.appendChild(ingredientsHeader);

    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    ingredientsDiv.appendChild(ingredientsList);
    container.appendChild(ingredientsDiv);

    // const imageDiv = document.createElement('div')
    // imageDiv.className  = 'imageDiv'
    // const image = document.createElement('img');
    // image.src = recipe.image;
    // image.alt = recipe.title;
    // imageDiv.appendChild(image)
    // container.appendChild(imageDiv);

    // Create the directions section
    const directionsDiv = document.createElement('div');
    directionsDiv.className = 'directions';
    const directionsHeader = document.createElement('h2');
    directionsHeader.textContent = 'Directions';
    directionsDiv.appendChild(directionsHeader);

    recipe.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        const stepHeader = document.createElement('h3');
        stepHeader.className = 'step-header';
        stepHeader.textContent = `Step ${index + 1}`;
        const stepText = document.createElement('p');
        stepText.textContent = step;
        stepDiv.appendChild(stepHeader);
        stepDiv.appendChild(stepText);
        directionsDiv.appendChild(stepDiv);
    });
    container.appendChild(directionsDiv);
    // container.appendChild(imageDiv);
}