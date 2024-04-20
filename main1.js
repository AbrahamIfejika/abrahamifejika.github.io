const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Declaring the array of image filenames
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Declaring the alternative text for each image file with new descriptions
const imageAltText = {
    'pic1.jpg': 'Closeup of a human eye',
    'pic2.jpg': 'Wind-eroded sandstone',
    'pic3.jpg': 'Purple flowers',
    'pic4.jpg': 'Egyptian art with Anubis',
    'pic5.jpg': 'Butterfly on leaf'
};

// Looping through images
imageFilenames.forEach(filename => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/${filename}');
    newImage.setAttribute('alt', imageAltText[filename]);
    thumbBar.appendChild(newImage);

    // Adding click event listener to each thumbnail
    newImage.addEventListener('click', () => {
        displayedImage.src = newImage.src;
        displayedImage.alt = newImage.alt;
    });
});

// Wiring up the Darken/Lighten button
btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');

    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});

