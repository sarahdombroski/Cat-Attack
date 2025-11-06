// const apiKey = import.meta.env.api_key;
const baseUrl = "https://api.thecatapi.com/v1/images/search";

async function getPicture() {
    try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const image = document.querySelector("#mainImg");
        image.src = data[0].url;

        console.log(data);
    } catch(error) {
        console.error('There was an error:', error);
    }
}

getPicture();
