import { fetchBooks, analyzeMood } from "./api.js";
import { renderBooks, showPlaylist } from "./ui.js";
import { renderFavorites } from "./favorites.js";

// RapidAPI Emotion Analysis key
const API_KEY = "77307ca17bmsh7c39ba8ac0ac98fp149f9ejsn7f82ade9b83c";

// DOM elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const favoritesPanel = document.getElementById("favoritesPanel");
const toggleFavoritesBtn = document.getElementById("toggleFavoritesBtn");

// Handles book search when the user clicks the search button
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const books = await fetchBooks(query);

  renderBooks(books, async (description, title, thumbnail) => {
    // Combine title and description to enhance mood detection
    const combinedText = `${title}. ${description}`;
    const mood = await analyzeMood(combinedText, API_KEY);
    showPlaylist(title, thumbnail, mood);
  });
});

// On initial page load:
// Fetches a list of default books
// Renders the book cards
// Loads and displays favorites from localStorage
window.addEventListener("load", async () => {
  const books = await fetchBooks("bestselling fiction");

  renderBooks(books, async (description, title, thumbnail) => {
    const combinedText = `${title}. ${description}`;
    const mood = await analyzeMood(combinedText, API_KEY);
    showPlaylist(title, thumbnail, mood);
  });

  renderFavorites(); // Restore favorites from localStorage
});

// Toggles the visibility of the Favorites panel
toggleFavoritesBtn.addEventListener("click", () => {
  const isVisible = favoritesPanel.classList.contains("visible");
  favoritesPanel.classList.toggle("visible");
  toggleFavoritesBtn.textContent = isVisible ? "Show Favorites" : "Hide Favorites";
});