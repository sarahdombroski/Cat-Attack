import { getInformation } from "./getinformation.js";

let savedItems = JSON.parse(localStorage.getItem('savedCats')) || [];
const catsList = document.querySelector('.cats-list');
const imgUrl = "https://api.thecatapi.com/v1/images/";

console.log(savedItems);

async function getPicture(id) {
    try {
        const response = await fetch(imgUrl + id);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.url;
    } catch(error) {
        console.error('There was an error:', error);
    }
}

function template(object, imageUrl, index) {
    return `
    <div class="cat-item" data-index="${index}">
      <h2 class="cat-name">${object.name}</h2>
      <div class="cat-image">
        <button class="removeCat">Remove Favorite</button>
        <img class="cat-picture" src="${imageUrl}" alt="${object.name}">
      </div>
    </div>`;
}

async function renderCats() {
    catsList.innerHTML = '';

    for (const i of savedItems) {
    const allInfo = await getInformation(i);
    const imageUrl = await getPicture(allInfo.reference_image_id);
    catsList.innerHTML += template(allInfo, imageUrl, i);
    }

    document.querySelectorAll('.removeCat').forEach(btn => {
        btn.addEventListener('click', e => {
            const parent = e.target.closest('.cat-item');
            const idToRemove = Number(parent.dataset.index);
            removeCat(idToRemove);
            parent.remove();
        })
    })
}

function removeCat(id) {
    localStorage.removeItem('savedCats');
    console.log("Before " + savedItems);
    console.log("Trying to remove id:", id);
    savedItems = savedItems.filter(catId => catId !== id);
    console.log("after " + savedItems);
    localStorage.setItem('savedCats', JSON.stringify(savedItems));
}

renderCats();