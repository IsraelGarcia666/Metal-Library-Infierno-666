# Metal Library Infierno 666 🤘🔥

**Artist Explorer & Music Discovery Application**

**Web Development 1 – Front End | Project 2a: AJAX Application Using a REST API**

**Developer:** Israel Garcia Real  
**Laurea University of Applied Sciences**

**Live website:** https://www.israelgarciareal.dev/Metal-Library-Infierno-666/  
**GitHub repository:** https://github.com/IsraelGarcia666/Metal-Library-Infierno-666

## 1. Project Overview

Metal Library Infierno 666 is an interactive website for exploring heavy metal artists, albums, and music.

The application allows visitors to search for artists, read information about them, explore available discographies, and select albums to discover their track listings. It combines information from two external music APIs.

The idea originated from an earlier HTML and CSS assignment, where I created a fictional gothic metal-library website. Instead of abandoning that project, I decided to recycle it and transform it into a functional JavaScript application.

I wanted to preserve its original heavy-metal atmosphere while giving it a real purpose.

One of the challenges was finding a suitable API specifically dedicated to heavy metal music. Since the available options were limited or did not work reliably for our purposes, I decided to use two general music APIs: TheAudioDB and Apple's iTunes Search API.

The main idea is to explore heavy metal artists and their music, but the application is not restricted to this genre. Users can also search for artists from other musical styles, depending on the information available in these databases.

## 2. Main Features

- **Artist Explorer:** Search for an artist by entering a name or selecting one from a dropdown menu.
- **Artist information:** Display available photographs, genres, origins, and biographies.
- **Automatic discography:** Retrieve available releases from Apple's music catalog.
- **Artist selection:** When several artists share the same name, visitors can select the appropriate artist.
- **Interactive album browsing:** Click an album to display its cover, release year, and track listing.
- **Track information:** Display available song titles and durations.
- **Apple Music links:** Open the selected album edition in Apple Music.
- **Album details:** Search for additional album information through TheAudioDB.
- **Error handling:** Display messages when information is missing or an API request fails.
- **Responsive design:** Adapt the interface to desktop and mobile screens.
- **Section navigation:** Navigate between the Artist Explorer, Discography, and Album Details.

## 3. Technologies Used

- HTML5: Website structure and content.
- CSS3: Gothic visual design, layout, and responsive styling.
- JavaScript (vanilla JS): User interaction, event handling, and dynamic content.
- AJAX (Asynchronous JavaScript and XML): Asynchronous communication with live REST APIs without reloading the webpage.
- Fetch API: Sending HTTP requests to TheAudioDB and Apple's iTunes Search API.
- JSON: Receiving and processing information returned by the APIs.
- DOM manipulation: Dynamically displaying artist profiles, albums, photographs, and track listings.
- Git and GitHub: Version control and source-code management.
- GitHub Pages: Publishing the application online.

The application uses native JavaScript without external JavaScript libraries or frameworks.

## 4. REST APIs

### TheAudioDB

Website: https://www.theaudiodb.com/

Used to retrieve artist information, photographs, biographies, and album descriptions where available.

### Apple iTunes Search API

Documentation: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/

Used to search for artists, retrieve available album releases, and display track listings.

Using both APIs allows the application to combine different types of music information. However, their catalogs do not always contain the same artists or albums.

## 5. How to Use the Application

1. Open the website.
2. Select an artist or enter an artist's name.
3. Click **Search the Archives**.
4. Read the artist information.
5. Explore the available discography.
6. If multiple artists have the same name, choose the correct one.
7. Click an album to view its cover and track listing.
8. Follow the Apple Music link if you want to explore that album edition.
9. Alternatively, enter an album title and click **Find Album** to request additional album information from TheAudioDB.

## 6. Testing

The application has been developed and tested progressively, using browser developer tools and manual interaction.

The testing process includes:

- Searching for well-known and less familiar metal artists.
- Testing artists with identical names, such as Riot.
- Retrieving albums and their track listings.
- Checking how the application responds to missing information.
- Testing the navigation links.
- Reviewing the layout on different screen sizes.
- Publishing the website through GitHub Pages.
- Running Chrome Lighthouse to evaluate accessibility, SEO, best practices, and performance.

## 7. Limitations and Future Improvements

The application depends on external music databases, so information may occasionally be incomplete, unavailable, or inconsistent.

Apple's catalog includes different releases, remasters, compilations, and editions, meaning the discography is not necessarily a complete historical record of an artist's work.

Some artists may also share identical names or genres, making identification more difficult.

Future improvements could include better artist identification, additional music databases, improved search functionality, and performance optimization.

## 8. Artwork and Credits

The website preserves the gothic and infernal visual concept of my original project.

- **Fantasy background:** Adapted from artwork sourced through Magnific: https://www.magnific.com/free-photos-vectors/underground-fantasy-concept-art/2
- **Logo and banner:** AI-generated with ChatGPT in 2025.
- **Artist photographs and album artwork:** Retrieved through the music APIs and remain the property of their respective rights holders.
- **Music information:** TheAudioDB and Apple's iTunes Search API.

The website is an educational project and is not affiliated with or endorsed by these music services.

## 9. AI Use Disclosure

I used ChatGPT as a learning and development assistant throughout this project, especially when working with JavaScript, AJAX, and REST APIs.

ChatGPT helped me research, compare, and test different music APIs to find suitable sources for the application. Since finding a reliable API specifically dedicated to heavy metal music proved challenging, we explored several alternatives before deciding to combine TheAudioDB and Apple's iTunes Search API.

ChatGPT also helped me understand programming concepts, suggested code snippets and solutions, and assisted with troubleshooting errors, testing functionality, and improving the website's responsive design.

I developed the application directly in VS Code, integrating and adapting the suggested code, testing its functionality, and making changes according to my own ideas and requirements.

The original website was created by me during a previous HTML and CSS course. For this assignment, I decided to recycle it and transform it into an interactive music application.

The project's concept, visual identity, functionality, and development decisions were guided by my own interests and objectives. AI significantly accelerated the development process, but I remained actively involved in the implementation, testing, and decisions throughout the project.

This collaboration also helped me better understand JavaScript, AJAX, REST APIs, JSON, and DOM manipulation.

## 10. Self-Evaluation

My main objective was to transform a static HTML/CSS website into an interactive application that uses real information from external APIs.

Although I had already worked with JavaScript and REST APIs in previous coursework, this project allowed me to take that knowledge further. The main challenge was not simply retrieving JSON data, but finding suitable APIs, combining information from two different sources, and handling the limitations of their catalogs.

One interesting example was discovering that several artists share the same name. For instance, searching for Riot, the application initially displayed albums from a completely different artist. Solving this problem helped me understand the importance of checking, filtering, and validating API responses instead of assuming that the first result is always correct.

One thing that became clear during development was that working with live APIs involves much more than writing a successful `fetch()` request. The quality, availability, and organization of the data can significantly affect how an application works.

Another important part of this project was improving the CSS and responsive layout, which took considerable time. Although the main assignment focuses on JavaScript, I wanted to preserve the personality of my original website and make the application enjoyable to use.

I am satisfied with the result because I managed to recycle an earlier project, learn new programming concepts, and turn a creative idea into a working music-discovery application.

There is still room for improvement, particularly in performance and the completeness of music information, but the project represents meaningful progress in my front-end development skills.
