let name = document.getElementById("name");
let Ingridients = document.getElementById("Ingridients");
let img = document.getElementById("img");
let linkButton=document.getElementById("linkButton");
let btn=document.getElementById("btn");
//Key For API
const API_KEY = "275d58779ccf4e22af03e792e8819fff";

async function getRecipes() {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );

    const data = await response.json();
    return data.recipes;
}

async function displayRecipe() {
    //Here an arry of objects will come
    const recipe = await getRecipes();
    name.innerText=recipe[0].title;
    img.src = recipe[0].image;
    Ingridients.innerHTML = `
<strong>Ingredients:</strong> ${recipe[0].extendedIngredients.map((ingredient) => ingredient.original)
            .join(", ")}`;
            linkButton.href=recipe[0].sourceUrl;
};

btn.addEventListener('click',()=>{
    displayRecipe();
})
displayRecipe();