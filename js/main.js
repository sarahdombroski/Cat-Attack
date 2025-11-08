import { getInformation, showModal, saveCat } from "./getinformation.js";
// const apiKey = import.meta.env.api_key;
const imgUrl = "https://api.thecatapi.com/v1/images/";
let index = 0;

async function setPicture(id) {
    try {
        const response = await fetch(imgUrl + id);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // set image url
        const image = document.querySelector("#mainImg");
        image.src = data.url;
        
    } catch(error) {
        console.error('There was an error:', error);
    }
}

async function init() {
    let element = await getInformation(index);
    console.log(element);
    setPicture(element.reference_image_id); // set the image on the main screen with the image id from the element
}

init();

const forward = document.querySelector("#nextPicture");
const backward = document.querySelector("#previousPicture");

forward.addEventListener("click", () => {
    if (index != 66) {
        index += 1; 
    }
    init();
})

backward.addEventListener("click", () => {
    if (index != 0) {
        index -= 1;
    }
    init();
})

// About this cat popup
document.querySelector("#aboutbtn").addEventListener("click", () => {showModal(index)});

// Save to local storage
document.getElementById('saveCat').addEventListener('click', async () => {
    let saveElement = await getInformation(index);
    saveCat(saveElement.id);
});