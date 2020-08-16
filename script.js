
const imageConstainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];

// Unslash API
const count = 10;
const apiKey = 'DHVwF4XWtUpRnxU-AQi4dBzJKnQ3Ar7Oxaw0AqYTB0Y';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on DOM element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function dispalyPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> to link to Unslash 
        const anhor = document.createElement('a');
        // anhor.setAttribute('href', photo.links.html)
        // anhor.setAttribute('target', '_blank');

        // Set <a> attributes with helper function
        setAttributes(anhor, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description)

        // Set <img> attributes with helper function
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Put <img> inside <a>, then put both inside imageContainer element
        anhor.appendChild(img);
        imageConstainer.appendChild(anhor);
    })
}

async function getPhotoFromApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        dispalyPhotos()
    } catch(error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, load more photo
window.addEventListener('scroll', () => {
    console.log('scrolled')
})

// On load
getPhotoFromApi()