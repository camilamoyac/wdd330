// Fetches a list of books from the Google Books API based on a search query.
export async function fetchBooks(query) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&langRestrict=en&maxResults=16`);
  const data = await response.json();
  console.log("Google Books API response:", data);
  return data.items || [];
}


// Sends text to Twinword Emotion Analysis API and returns the detected emotion.
export async function analyzeMood(text, apiKey) {
  const response = await fetch("https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "twinword-emotion-analysis-v1.p.rapidapi.com"
    },
    body: new URLSearchParams({ text })
  });
  const result = await response.json();
  console.log("Emotion analysis API response:", result);

  // Access the first detected emotion
  return result.emotions_detected[0] || "neutral";
}