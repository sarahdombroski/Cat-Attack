// const apiKey = import.meta.env.api_key;
const breedUrl = "https://api.thecatapi.com/v1/breeds";
const imgUrl = "https://api.thecatapi.com/v1/images/"

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

async function getInformation() {
    try {
        const response = await fetch(breedUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const array = await response.json();

        // get random breed
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomElement = array[randomIndex]; //object with all information for that breed

        console.log(randomElement)

        setPicture(randomElement.reference_image_id); // set the image on the main screen with the image id from the element
    } catch(error) {
        console.error('There was an error:', error);
    }
}


getInformation();