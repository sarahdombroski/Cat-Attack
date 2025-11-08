const breedUrl = "https://api.thecatapi.com/v1/breeds";

export async function getInformation(index) {
    try {
        const response = await fetch(breedUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const array = await response.json();
        console.log(array);

        return array[index]; //object with all information for that breed

    } catch(error) {
        console.error('There was an error:', error);
    }
}

// NEW function: fetch all breeds as an array
export async function getAllBreeds() {
    try {
        const response = await fetch(breedUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const array = await response.json();
        return array; // return full array of all breeds
    } catch(error) {
        console.error('There was an error fetching all breeds:', error);
        return [];
    }
}

function catInformation(object) {
    return `<h1>Name: ${object.name}</h1>
    <p>Description: ${object.description}</p>
    <p>Temperment: ${object.temperament}</p>
    <p>Life Span: ${object.life_span}</p>
    <p>Origin: ${object.origin}</p>
    <p>Wikipedia: ${object.wikipedia_url}</p>`;
}

export async function showModal(index) {
    const modal = document.querySelector("#about-cat");
    modal.classList.remove('hidden');

    const modalContent = document.querySelector(".modal-div");
    let element = await getInformation(index);
    modalContent.innerHTML = catInformation(element);

    document.querySelector(".close").addEventListener("click", () => {
        modal.classList.add('hidden');
    })
}

export function saveCat(uniqueId) {
    // get existing saved cats (if any)
    const savedCats = JSON.parse(localStorage.getItem('savedCats')) || [];

    // check if it’s already saved
    if (!savedCats.includes(uniqueId)) {
        savedCats.push(uniqueId); // add it!
        localStorage.setItem('savedCats', JSON.stringify(savedCats)); // save it back
        console.log('Cat saved! 🐱', savedCats);
    } else {
        console.log('Already saved this kitty 😸');
    }
}
