const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const imageAltText = {
    'pic1.jpg': 'Closeup of a human eye',
    'pic2.jpg': 'Closeup of the inside of a canyon',
    'pic3.jpg': 'Closeup of purple flowers',
    'pic4.jpg': 'Closeup of an Egyptian tomb painiting',
    'pic5.jpg': 'Closeup of a butterfly on a leaf'
};

/* Looping through images */
imageFilenames.forEach(filename => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/${filename}');
    newImage.setAttribute('alt', imageAltText[filename]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', () => {
        displayedImage.src = newImage.src;
        displayedImage.alt = newImage.alt;
    });
});

/* Wiring up the Darken/Lighten button */

