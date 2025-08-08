let name = document.getElementById("name");
let Ingridients = document.getElementById("Ingridients");
let img = document.getElementById("img");
let linkButton = document.getElementById("linkButton");
let btn = document.getElementById("btn");
let container = document.querySelector(".container");

// API Key
const API_KEY = "275d58779ccf4e22af03e792e8819fff";

// Show loading message
function showLoading() {
    name.innerText = "Loading...";
    Ingridients.innerText = "";
    img.src = "https://i.gifer.com/ZZ5H.gif"; // Simple loading GIF
    linkButton.style.display = "none"; // Hide button during loading
}

// Hide loading and show the actual button
function showRecipeDetails(recipe) {
    name.innerText = recipe.title;
    img.src = recipe.image;
    Ingridients.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}`;
    linkButton.href = recipe.sourceUrl;
    linkButton.style.display = "inline-block"; // Show button again
}

// Fetch recipes
async function getRecipes() {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.recipes;
}

// Display one recipe
async function displayRecipe() {
    showLoading();
    try {
        const recipes = await getRecipes();
        showRecipeDetails(recipes[0]);
    } catch (error) {
        name.innerText = "Error loading recipe!";
        Ingridients.innerText = "";
        img.src = "";
        linkButton.style.display = "none";
        console.error("Error fetching recipe:", error);
    }
}

// Event listener
btn.addEventListener('click', () => {
    displayRecipe();
});

// Initial load
displayRecipe();
