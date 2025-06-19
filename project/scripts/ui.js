import { renderFavorites } from "./favorites.js";

// Mapping of detected emotions to Spotify playlist IDs
const emotionPlaylists = {
  joy: "37i9dQZF1DX3rxVfibe1L0",        // Happy Vibes
  anger: "37i9dQZF1DWZLcGGC0HJbc",      // Rage Beats
  sadness: "37i9dQZF1DX7qK8ma5wgG1",    // Sad Indie
  fear: "37i9dQZF1DWZwtERXCS82H",       // Dark & Scary
  surprise: "37i9dQZF1DX2sUQwD7tbmL",   // Chill Tracks
  disgust: "37i9dQZF1DX4E3UdUs7fUx",    // Moody Alternative
  neutral: "37i9dQZF1DX4WYpdgoIcn6"     // Reading Soundtrack
};

const moodColors = {
  joy: "#FCEAC3",       // light warm yellow
  anger: "#F08080",     // light coral red
  sadness: "#A3C4F3",   // soft blue
  fear: "#7E8C9A",      // muted gray-blue
  surprise: "#FFECB3",  // pale yellow
  disgust: "#C3B1E1",   // soft lavender
  neutral: "#D3D3D3"    // light gray
};

// Renders book cards, with front and back flipping, and "Get Mood" button
export function renderBooks(books, onMoodClick) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  books.forEach(book => {
    const info = book.volumeInfo;
    const card = document.createElement("div");
    card.classList.add("book-card");

    const title = info.title || "Untitled";
    const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
    const thumbnail = info.imageLinks?.thumbnail || "/images/no-cover.jpg";
    const description = info.description || "";

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
            <img src="${thumbnail}" alt="${title} cover" class="book-cover">
            <h3>${title}</h3>
            <p class="author">${authors}</p>
            <p class="rating">Rating: ${info.averageRating || "N/A"}⭐</p>
            </div>
            <div class="card-back">
            <p><strong>Pages:</strong> ${info.pageCount || "?"}📄</p>
            <p><strong>Genre:</strong> ${info.categories ? info.categories.join(", ") : "Unknown"}</p>
            <p><strong>Published:</strong> ${info.publishedDate || "N/A"}</p>
            <p class="description">${info.description ? info.description.substring(0, 350) + "..." : "No description available."}</p>
            <button class="mood-btn" data-description="${encodeURIComponent(info.description || "")}" data-title="${title}" data-thumbnail="${thumbnail}" data-authors="${encodeURIComponent(authors)}" data-genres="${encodeURIComponent(info.categories ? info.categories.join(", ") : "")}" data-published="${info.publishedDate || ""}">Get Mood</button>
            </div>
        </div>
    `;

    container.appendChild(card);

    // Attach click event to the "Get Mood" button
    card.querySelector(".mood-btn").addEventListener("click", () => {
      onMoodClick(description, title, thumbnail);
    });

    // Flip card on click, but avoid flipping if the button itself was clicked
    card.addEventListener("click", (e) => {
    if (!e.target.classList.contains("mood-btn")) {
        card.classList.toggle("flipped");
    }
    });
  });
}

// Show playlist modal with book and mood info, plus "Save to Favorites"
export function showPlaylist(title, thumbnail, mood) {
  const playlistId = emotionPlaylists[mood] || emotionPlaylists.neutral;

  const modal = document.getElementById("playlistModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="top-mod">
        <img src="${thumbnail}" alt="${title} cover">
        <section class="details">
            <h3>“${title}”</h3>
            <p>The mood that matches this book is:</p>
            <p class="moodName">${mood}</p>
            <p>Here's a playlist we think you may enjoy while you read!</p>
        </section>
    </div>
    <div class="bottom-mod">
        <iframe style="border-radius:12px; margin-top:1rem;" 
        src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0" 
        width="100%" height="152" frameborder="0" allowfullscreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
        </iframe>
        <button id="saveToFavoritesBtn">Save to Favorites</button>
    </div>
  `;

  // Modal background color changes by mood
  modalContent.style.backgroundColor = moodColors[mood] || moodColors.neutral;

  modal.style.display = "block";

  document.getElementById("modalClose").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  document.getElementById("saveToFavoritesBtn").addEventListener("click", () => {
    const favorite = { title, thumbnail, mood };
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadySaved = favorites.some(fav => fav.title === favorite.title);

    if (!alreadySaved) {
      favorites.push(favorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("✅Saved to favorites!");
      renderFavorites();
    } else {
      alert("⚠️This book is already in your favorites.");
    }
  });
}