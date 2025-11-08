// Retrieve saved cats from localStorage
// If there are no saved cats, default to an empty array
let savedItems = JSON.parse(localStorage.getItem('savedCats')) || [];

// Select the container element in the HTML where cat cards will be displayed
const catsList = document.querySelector('.cats-list');

// Log savedItems to the console for debugging purposes
console.log(savedItems);

// Function to fetch cat data from TheCatAPI using the cat's image ID
async function getCatData(id) {
    try {
        // Fetch the image data from TheCatAPI endpoint using the image ID
        const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);

        // If the response is not OK (e.g., 404 or 500), throw an error
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        // Parse the JSON response into a JavaScript object
        const data = await response.json();

        // Return the data object (contains image URL and breed info)
        return data;
    } catch (error) {
        // If any error occurs (network or parsing), log it to the console
        console.error('There was an error:', error);
    }
}

// Function to generate HTML for a single cat card
// catData is the object returned from getCatData()
function template(catData) {
    // Each catData may have multiple breeds, we take the first one
    const breed = catData.breeds[0];

    // Return a string of HTML for the cat card
    // Includes the image, name, and a "Remove Favorite" button
    return `
    <div class="cat-item" data-id="${catData.id}">
        <h2 class="cat-name">${breed ? breed.name : 'Unknown Breed'}</h2>
        <div class="cat-image">
            <button class="removeCat">Remove Favorite</button>
            <img class="cat-picture" src="${catData.url}" alt="${breed ? breed.name : 'Cat'}">
        </div>
    </div>`;
}

// Function to render all saved cats on the page
async function renderCats() {
    // Clear any existing cat cards in the container
    catsList.innerHTML = '';

    // Loop through all saved cat image IDs
    for (const catId of savedItems) {
        // Fetch the cat data for this ID
        const catData = await getCatData(catId);

        // If fetch failed or returned invalid data, skip this cat
        if (!catData) continue;

        // Append the cat card HTML to the container
        catsList.innerHTML += template(catData);
    }

    // After all cat cards are added, attach event listeners to the "Remove Favorite" buttons
    document.querySelectorAll('.removeCat').forEach(btn => {
        btn.addEventListener('click', e => {
            // Find the parent cat card of the clicked button
            const parent = e.target.closest('.cat-item');

            // Get the cat ID from the parent element's data attribute
            const idToRemove = parent.dataset.id;

            // Remove the cat from localStorage and savedItems array
            removeCat(idToRemove);

            // Remove the cat card from the DOM immediately
            parent.remove();
        });
    });
}

// Function to remove a cat from savedItems and localStorage
function removeCat(id) {
    // Log savedItems before removing the cat (for debugging)
    console.log("Before remove:", savedItems);

    // Filter out the cat with the specified ID
    savedItems = savedItems.filter(catId => catId !== id);

    // Log savedItems after removal (for debugging)
    console.log("After remove:", savedItems);

    // Update localStorage with the new savedItems array
    localStorage.setItem('savedCats', JSON.stringify(savedItems));
}

// Call renderCats() on page load to display all saved cats
renderCats();
