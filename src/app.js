document.addEventListener("DOMContentLoaded", function () {
  const recipesContainer = document.getElementById("recipesContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  const yearSpan = document.getElementById("year");
  yearSpan.textContent = new Date().getFullYear();

  fetch("data/recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      loadingMessage.style.display = "none";
      displayRecipes(recipes);
    })
    .catch((error) => {
      loadingMessage.textContent =
        "Failed to load recipes. Please try again later.";
      console.error("Error fetching recipes:", error);
    });

  function displayRecipes(recipes) {
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe, index) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      recipeCard.setAttribute("data-index", index); // Store the index for later use

      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.name;

      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = recipe.name;

      const recipeDescription = document.createElement("p");
      recipeDescription.textContent = recipe.description;

      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(recipeTitle);
      recipeCard.appendChild(recipeDescription);

      recipesContainer.appendChild(recipeCard);

      // Add click event listener to each card
      recipeCard.addEventListener("click", () => {
        showRecipeDetails(recipe);
      });
    });
  }

  // Function to display detailed view of the recipe
  function showRecipeDetails(recipe) {
    // Hide recipe list
    recipesContainer.style.display = "none";
    // Create the recipe detail container
    const recipeDetailSection = document.createElement("section");
    recipeDetailSection.id = "recipeDetail";

    const goBackButton = document.createElement("button");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", goBack);

    const recipeTitle = document.createElement("h2");
    recipeTitle.textContent = recipe.name;

    const recipeDescription = document.createElement("p");
    recipeDescription.textContent = recipe.description;

    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = "Ingredients:";

    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    });

    const instructionsTitle = document.createElement("h3");
    instructionsTitle.textContent = "Instructions:";

    const recipeInstructions = document.createElement("p");
    recipeInstructions.textContent = recipe.instructions;

    const showIngredientsButton = document.createElement("button");
    showIngredientsButton.textContent = "Show Ingredients";
    showIngredientsButton.addEventListener("click", () => {
      ingredientsList.style.display =
        ingredientsList.style.display === "none" ? "block" : "none";
    });

    // Append elements to the recipe detail section
    recipeDetailSection.appendChild(goBackButton);
    recipeDetailSection.appendChild(recipeTitle);
    recipeDetailSection.appendChild(recipeDescription);
    recipeDetailSection.appendChild(ingredientsTitle);
    recipeDetailSection.appendChild(showIngredientsButton);
    recipeDetailSection.appendChild(ingredientsList);
    recipeDetailSection.appendChild(instructionsTitle);
    recipeDetailSection.appendChild(recipeInstructions);

    document.body.appendChild(recipeDetailSection);
  }

  // Go back to the recipe list
  function goBack() {
    // Show recipe list again
    recipesContainer.style.display = "block";
    // Remove the recipe detail section
    const recipeDetailSection = document.getElementById("recipeDetail");
    if (recipeDetailSection) {
      recipeDetailSection.remove();
    }
  }

  // Search functionality
  document.getElementById("searchContainer").addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    filterRecipes(searchTerm);
  });

  function filterRecipes(searchTerm) {
    const recipeCards = document.querySelectorAll(".recipe-card");
    let hasResults = false;

    recipeCards.forEach((card) => {
      const title = card.querySelector("h2").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "";
        card.classList.add("highlight");
        hasResults = true;
      } else {
        card.style.display = "none";
        card.classList.remove("highlight");
      }
    });

    if (!hasResults) {
      loadingMessage.textContent = "No results found for your search.";
      loadingMessage.style.display = "block";
    } else {
      loadingMessage.style.display = "none";
    }
  }
});
