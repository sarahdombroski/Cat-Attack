import { getAllBreeds, getInformation, saveCat } from "./getinformation.js";

const catsList = document.querySelector('.cats-list');
const breedSelect = document.createElement('select');
breedSelect.innerHTML = `<option value="">-- Select Breed --</option>`;
document.querySelector('.breed-select-container').prepend(breedSelect);

// URL parameters
const params = new URLSearchParams(window.location.search);
const breedIndex = params.get('breed');

// Show 12 cats for a specific breed
function showCatsByBreed(index) {
    catsList.innerHTML = ''; // clear previous

    getInformation(index).then(breed => {
        fetch(`https://api.thecatapi.com/v1/images/search?limit=12&breed_ids=${breed.id}`)
            .then(res => res.json())
            .then(cats => {
                cats.forEach(cat => {
                    const catDiv = document.createElement('div');
                    catDiv.classList.add('cat-item');
                    catDiv.innerHTML = `
                        <img src="${cat.url}" alt="${breed.name}">
                        <h2 class="cat-name">${breed.name}</h2>
                        <div class="cat-info">
                            <p class="description" style="display:none;">${breed.description}</p>
                            <button class="saveCatBtn">Add to My Cats</button>
                            <button class="aboutBtn">About</button>
                        </div>
                    `;
                    catsList.appendChild(catDiv);

                    // Add save functionality
                    const saveBtn = catDiv.querySelector('.saveCatBtn');
                    saveBtn.addEventListener('click', () => saveCat(cat.id));


                    // Add toggle for About dropdown
                    const aboutBtn = catDiv.querySelector('.aboutBtn');
                    const description = catDiv.querySelector('.description');
                    aboutBtn.addEventListener('click', () => {
                        if (description.style.display === 'none') {
                            description.style.display = 'block';
                            aboutBtn.textContent = 'Hide Info';
                        } else {
                            description.style.display = 'none';
                            aboutBtn.textContent = 'About';
                        }
                    });
                });
            });
    });
}

// Load all breeds into dropdown
getAllBreeds().then(breeds => {
    breeds.forEach((breed, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });

    // If there is a URL parameter
    if (breedIndex !== null) {
        breedSelect.value = breedIndex;
        showCatsByBreed(breedIndex);
    } else {
        showCatsByBreed(0);
    }
});

// When dropdown changes
breedSelect.addEventListener('change', (e) => {
    //if (breedSelect.value !== "") showCatsByBreed(breedSelect.value);
    const selected = e.target.value;
    window.location.search = `?breed=${selected}`;
});
