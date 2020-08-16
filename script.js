
const imageConstainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

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

// Check is all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function dispalyPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to Unslash 
        const anhor = document.createElement('a');
        setAttributes(anhor, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded());

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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotoFromApi();
    }
})

// On load
getPhotoFromApi()