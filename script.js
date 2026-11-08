/* Metal Library Infierno 666
   Version 0.2.0 - Artist search using a REST API
*/

// Connect JavaScript to our HTML elements.
const artistSelect = document.getElementById("artist-select");
const artistSearch = document.getElementById("artist-search");
const searchButton = document.getElementById("search-button");
const artistResults = document.getElementById("artist-results");

// Listen for the search button click.
searchButton.addEventListener("click", searchArtist);

// Request artist information from TheAudioDB.
async function searchArtist() {
  const artistName = artistSearch.value.trim() || artistSelect.value;

  if (!artistName) {
    artistResults.textContent = "Please choose or enter an artist.";
    return;
  }

  artistResults.textContent = "Searching the archives...";

  const url =
    "https://www.theaudiodb.com/api/v1/json/123/search.php?s=" +
    encodeURIComponent(artistName);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("API response:", data);

    if (!data.artists || data.artists.length === 0) {
      artistResults.textContent = "Artist not found.";
      return;
    }

    const artist = data.artists[0];

    artistResults.textContent =
      `${artist.strArtist} | ` +
      `Genre: ${artist.strGenre || "Unknown"} | ` +
      `Origin: ${artist.strCountry || "Unknown"}`;
  } catch (error) {
    console.error("API request failed:", error);
    artistResults.textContent = "Unable to retrieve artist information.";
  }
}
