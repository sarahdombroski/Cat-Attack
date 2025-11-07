// const apiKey = import.meta.env.api_key;
const breedUrl = "https://api.thecatapi.com/v1/breeds";
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

async function getInformation(index) {
    try {
        const response = await fetch(breedUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const array = await response.json();
        console.log(array);

        const element = array[index]; //object with all information for that breed

        console.log(element)

        setPicture(element.reference_image_id); // set the image on the main screen with the image id from the element
    } catch(error) {
        console.error('There was an error:', error);
    }
}

getInformation(index);

const forward = document.querySelector("#nextPicture");
const backward = document.querySelector("#previousPicture");

forward.addEventListener("click", () => {
    if (index != 66) {
        index += 1; 
    }
    getInformation(index);
})

backward.addEventListener("click", () => {
    if (index != 0) {
        index -= 1;
    }
    getInformation(index);
})