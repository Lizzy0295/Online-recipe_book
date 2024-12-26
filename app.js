document.addEventListener("DOMContentLoaded", function () {
  const recipesContainer = document.getElementById("recipesContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  const yearSpan = document.getElementById("year");
  yearSpan.textContent = new Date().getFullYear(); // Display current year in footer

  // Fetch recipes from JSON
  fetch("recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      loadingMessage.style.display = "none"; // Hide loading message
      displayRecipes(recipes);
    })
    .catch((error) => {
      loadingMessage.textContent = "Failed to load recipes.";
      console.error("Error fetching recipes:", error);
    });

  // Display recipes
  function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");

      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.name;

      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = recipe.name;

      const recipeDescription = document.createElement("p");
      recipeDescription.textContent = recipe.description;

      const recipeInstructions = document.createElement("p");
      recipeInstructions.classList.add("instructions");
      recipeInstructions.textContent = `Instructions: ${recipe.instructions}`;

      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(recipeTitle);
      recipeCard.appendChild(recipeDescription);
      recipeCard.appendChild(recipeInstructions);

      recipesContainer.appendChild(recipeCard);
    });
  }

  // Search functionality
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    filterRecipes(searchTerm);
  });

  function filterRecipes(searchTerm) {
    const recipeCards = document.querySelectorAll(".recipe-card");
    recipeCards.forEach((card) => {
      const title = card.querySelector("h2").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }
});
