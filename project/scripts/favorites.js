// Renders the list of favorite book + mood combinations
// from localStorage into the favorites panel.

export function renderFavorites() {
  const container = document.getElementById("favoritesContainer");

  // Retrieve favorites from localStorage or fallback to an empty array
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Clear any previous content
  container.innerHTML = "";

  // Create and append each favorite item
  favorites.forEach(({ title, thumbnail, mood }) => {
    const div = document.createElement("div");
    div.classList.add("favorite-item");

    div.innerHTML = `
      <img src="${thumbnail}" alt="${title} cover">
      <div>
        <p><strong>${title}</strong></p>
        <p>Mood: ${mood}</p>
      </div>
    `;

    container.appendChild(div);
  });
}