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
      albumResults.textContent =
        "Sorry, nothing in our archives! Dust off the physical album, " +
        "put it on, and let the music do the talking. 🤘";
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
      album.strDescription ||
      "No story in our archives! Sometimes the music speaks louder than words. 🤘";

    albumResults.appendChild(albumDescription);
  } catch (error) {
    console.error("Album search failed:", error);
    albumResults.textContent = "Unable to retrieve album information.";
  }
}

/* ===== Artist Discography - Apple iTunes API ===== */

// Connect JavaScript to the discography results container.
const discographyResults = document.getElementById("discography-results");

// Run the discography search when the artist search button is clicked.
searchButton.addEventListener("click", () => searchDiscography());

async function searchDiscography(selectedArtistId = null) {
  const artistName = artistSearch.value.trim() || artistSelect.value;

  if (!artistName) {
    discographyResults.textContent = "Please select or enter an artist.";
    return;
  }

  discographyResults.textContent = "Searching Apple's album catalog...";

  try {
    // Step 1: Identify the correct artist.
    let artist;

    if (selectedArtistId !== null) {
      // The visitor already selected an Apple artist.
      artist = { artistId: selectedArtistId };
    } else {
      const artistUrl =
        "https://itunes.apple.com/search?term=" +
        encodeURIComponent(artistName) +
        "&media=music&entity=musicArtist&limit=200";

      const artistResponse = await fetch(artistUrl);

      if (!artistResponse.ok) {
        throw new Error(`Artist search failed: ${artistResponse.status}`);
      }

      const artistData = await artistResponse.json();

      // Find every artist with the exact requested name.
      const matches = artistData.results.filter(
        (item) =>
          item.wrapperType === "artist" &&
          item.artistName.toLowerCase() === artistName.toLowerCase(),
      );

      if (matches.length === 0) {
        discographyResults.textContent =
          "Artist not found in Apple's music catalog.";
        return;
      }

      if (matches.length > 1) {
        // Put Rock and Metal artists first, without excluding others.
        matches.sort((a, b) => {
          const isRockOrMetal = (genre) =>
            /rock|metal|hardcore/i.test(genre || "");

          return (
            Number(isRockOrMetal(b.primaryGenreName)) -
            Number(isRockOrMetal(a.primaryGenreName))
          );
        });

        const label = document.createElement("label");
        label.htmlFor = "apple-artist-choice";
        label.textContent = `Multiple artists named ${artistName} found. Choose the correct one:`;

        const select = document.createElement("select");
        select.id = "apple-artist-choice";

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Choose an artist...";
        select.appendChild(placeholder);

        matches.forEach((match) => {
          const option = document.createElement("option");
          option.value = match.artistId;
          option.textContent =
            `${match.artistName} — ${match.primaryGenreName || "Unknown genre"} ` +
            `(ID: ${match.artistId})`;

          select.appendChild(option);
        });

        // Load albums only after the visitor makes a choice.
        select.addEventListener("change", () => {
          if (select.value) {
            searchDiscography(Number(select.value));
          }
        });

        discographyResults.replaceChildren(label, select);
        return;
      }

      // Only one artist matched; continue automatically.
      artist = matches[0];
    }

    // Step 2: Retrieve albums using the artist's Apple ID.
    const albumUrl =
      "https://itunes.apple.com/lookup?id=" +
      artist.artistId +
      "&entity=album&limit=200";

    const albumResponse = await fetch(albumUrl);

    if (!albumResponse.ok) {
      throw new Error(`Album lookup failed: ${albumResponse.status}`);
    }

    const albumData = await albumResponse.json();

    // Keep album records belonging to the selected artist.
    const albums = albumData.results
      .filter(
        (item) =>
          item.wrapperType === "collection" &&
          item.collectionType === "Album" &&
          item.artistId === artist.artistId,
      )
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));

    if (albums.length === 0) {
      discographyResults.textContent =
        "No available releases found for this artist.";
      return;
    }

    // Step 3: Create an expandable album list.
    const details = document.createElement("details");

    const summary = document.createElement("summary");
    summary.textContent = `${albums.length} available releases — click to explore`;
    details.appendChild(summary);

    const albumList = document.createElement("ul");
    albumList.className = "discography-list";

    albums.forEach((album) => {
      const item = document.createElement("li");

      const year = album.releaseDate
        ? album.releaseDate.slice(0, 4)
        : "Unknown";

      // Make each album selectable.
      const albumButton = document.createElement("button");
      albumButton.type = "button";
      albumButton.className = "discography-album";

      albumButton.textContent =
        `${album.collectionName} (${year}) — ` +
        `${album.trackCount ?? "Unknown"} tracks`;

      // Pass the selected album, including its Apple collection ID.
      albumButton.addEventListener("click", () => {
        showAppleAlbum(album);
      });

      item.appendChild(albumButton);
      albumList.appendChild(item);
    });

    details.appendChild(albumList);
    discographyResults.replaceChildren(details);

    console.log("Apple catalog entries:", albums.length);
  } catch (error) {
    console.error("Discography API error:", error);
    discographyResults.textContent =
      "Unable to retrieve the artist's album catalog.";
  }
}

/* ===== Selected Album - Apple Track Listing ===== */

async function showAppleAlbum(album) {
  albumResults.textContent = `Loading tracks for ${album.collectionName}...`;

  const url =
    "https://itunes.apple.com/lookup?id=" +
    encodeURIComponent(album.collectionId) +
    "&entity=song&limit=200";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Track lookup failed: ${response.status}`);
    }

    const data = await response.json();

    // Keep only the tracks belonging to this album edition.
    const tracks = data.results
      .filter(
        (item) =>
          item.wrapperType === "track" &&
          item.collectionId === album.collectionId,
      )
      .sort(
        (a, b) =>
          (a.discNumber || 1) - (b.discNumber || 1) ||
          (a.trackNumber || 0) - (b.trackNumber || 0),
      );

    // Album title.
    const heading = document.createElement("h3");
    heading.className = "album-name";
    heading.textContent = album.collectionName;

    // Artist, year, and track count.
    const details = document.createElement("p");
    details.className = "album-details";
    details.textContent =
      `${album.artistName} | ` +
      `${album.releaseDate?.slice(0, 4) || "Unknown"} | ` +
      `${tracks.length} tracks`;

    albumResults.replaceChildren(heading, details);

    // Album artwork.
    if (album.artworkUrl100) {
      const cover = document.createElement("img");
      cover.className = "album-cover";
      cover.src = album.artworkUrl100.replace("100x100bb", "400x400bb");
      cover.alt = `${album.collectionName} album cover`;
      cover.loading = "lazy";

      albumResults.appendChild(cover);
    }

    // Track-list heading.
    const trackHeading = document.createElement("h4");
    trackHeading.textContent = "Track Listing";
    albumResults.appendChild(trackHeading);

    if (tracks.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No tracks available for this edition.";
      albumResults.appendChild(message);
    } else {
      const trackList = document.createElement("ol");
      trackList.className = "apple-track-list";

      tracks.forEach((track) => {
        const item = document.createElement("li");

        // Convert milliseconds into minutes and seconds.
        const totalSeconds = Math.floor((track.trackTimeMillis || 0) / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = String(totalSeconds % 60).padStart(2, "0");

        item.textContent = `${track.trackName} — ${minutes}:${seconds}`;

        trackList.appendChild(item);
      });

      albumResults.appendChild(trackList);
    }

    // Link to the actual album edition.
    if (album.collectionViewUrl) {
      const appleLink = document.createElement("a");
      appleLink.href = album.collectionViewUrl;
      appleLink.textContent = "View this edition on Apple Music";
      appleLink.target = "_blank";
      appleLink.rel = "noopener noreferrer";

      albumResults.appendChild(appleLink);
    }

    // Bring the selected album into view.
    albumResults.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } catch (error) {
    console.error("Apple track lookup failed:", error);
    albumResults.textContent =
      "Unable to retrieve the selected album's tracks.";
  }
}
