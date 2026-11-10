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

    // Clear previous search results.
    artistResults.replaceChildren();

    // Display the artist's name.
    const artistNameHeading = document.createElement("h3");
    artistNameHeading.className = "artist-name";
    artistNameHeading.textContent = artist.strArtist;
    artistResults.appendChild(artistNameHeading);

    // Display genre and origin.
    const artistDetails = document.createElement("p");
    artistDetails.className = "artist-details";
    artistDetails.textContent =
      `Genre: ${artist.strGenre || "Unknown"} | ` +
      `Origin: ${artist.strCountry || "Unknown"}`;
    artistResults.appendChild(artistDetails);

    // Display artist artwork if available.
    if (artist.strArtistThumb) {
      const artistImage = document.createElement("img");
      artistImage.className = "artist-photo";
      artistImage.src = artist.strArtistThumb;
      artistImage.alt = `${artist.strArtist} artwork`;
      artistImage.loading = "lazy";

      artistResults.appendChild(artistImage);
    }

    // Display the artist's biography.
    const artistBiography = document.createElement("p");
    artistBiography.className = "artist-biography";
    artistBiography.textContent =
      artist.strBiographyEN || "No biography available.";

    artistResults.appendChild(artistBiography);
  } catch (error) {
    console.error("API request failed:", error);
    artistResults.textContent = "Unable to retrieve artist information.";
  }
}

/* ===== Album Explorer - REST API ===== */

// Connect JavaScript to the album search elements.
const albumSearch = document.getElementById("album-search");
const albumSearchButton = document.getElementById("album-search-button");
const albumResults = document.getElementById("album-results");

// Listen for the Find Album button click.
albumSearchButton.addEventListener("click", searchAlbum);

// Request album information from TheAudioDB.
async function searchAlbum() {
  const artistName = artistSearch.value.trim() || artistSelect.value;
  const albumName = albumSearch.value.trim();

  // Check that both fields contain information.
  if (!artistName || !albumName) {
    albumResults.textContent =
      "Please select an artist and enter an album title.";
    return;
  }

  albumResults.textContent = "Searching for album...";

  const url =
    "https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=" +
    encodeURIComponent(artistName) +
    "&a=" +
    encodeURIComponent(albumName);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Album API response:", data);

    if (!data.album || data.album.length === 0) {
      albumResults.textContent = "Album not found.";
      return;
    }

    const album = data.album[0];

    // Clear previous album results.
    albumResults.replaceChildren();

    // Display the album title.
    const albumHeading = document.createElement("h3");
    albumHeading.className = "album-name";
    albumHeading.textContent = album.strAlbum;
    albumResults.appendChild(albumHeading);

    // Display artist name and release year.
    const albumDetails = document.createElement("p");
    albumDetails.className = "album-details";
    albumDetails.textContent = `${album.strArtist} | Released: ${album.intYearReleased || "Unknown"}`;
    albumResults.appendChild(albumDetails);

    // Display the album cover if available.
    if (album.strAlbumThumb) {
      const albumImage = document.createElement("img");
      albumImage.className = "album-cover";
      albumImage.src = album.strAlbumThumb;
      albumImage.alt = `${album.strAlbum} album cover`;
      albumImage.loading = "lazy";

      albumResults.appendChild(albumImage);
    }

    // Display the album description.
    const albumDescription = document.createElement("p");
    albumDescription.className = "album-description";
    albumDescription.textContent =
      album.strDescription || "No album description available.";

    albumResults.appendChild(albumDescription);
  } catch (error) {
    console.error("Album search failed:", error);
    albumResults.textContent = "Unable to retrieve album information.";
  }
}
