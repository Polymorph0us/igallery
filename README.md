# Ex.08 Design of Interactive Image Gallery
## Date: 20.05.2025

## AIM:
To design a web application for an inteactive image gallery with minimum five images.

## DESIGN STEPS:

### Step 1:
Clone the github repository and create Django admin interface.

### Step 2:
Change settings.py file to allow request from all hosts.

### Step 3:
Use CSS for positioning and styling.

### Step 4:
Write JavaScript program for implementing interactivity.

### Step 5:
Validate the HTML and CSS code.

### Step 6:
Publish the website in the given URL.

## PROGRAM :
### HTML:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Interactive Photo Gallery</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <header>
        <h1>Cute Cats</h1>
        <p>Click on any photo to view it in detail</p>
    </header>
    <main>
        <div class="gallery">
            <img src="./images/edgar-nKC772R_qog-unsplash.jpg" alt="Nature Water" data-index="0" />
            <img src="./images/c2.png" data-index="1" />
            <img src="./images/c3.png" data-index="2" />
            <img src="./images/c4.png" data-index="3" />
            <img src="./images/c5.png" data-index="4" />
            <img src="./images/c7.png" data-index="5" />
            <img src="./images/c9.png" data-index="6" />
            <img src="./images/c8.png" data-index="7" />
        </div>
    </main>

    <!-- Lightbox overlay -->
    <div class="lightbox" id="lightbox">
        <button class="close-btn" id="closeBtn" aria-label="Close">&times;</button>
        <button class="nav-btn prev-btn" id="prevBtn" aria-label="Previous">&#10094;</button>
        <img class="lightbox-image" id="lightboxImage" src="" alt="" />
        <button class="nav-btn next-btn" id="nextBtn" aria-label="Next">&#10095;</button>
        <div class="caption" id="caption"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```
### CSS:
```

* {
    box-sizing: border-box;
}
body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f7fa;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
header {
    text-align: center;
    padding: 2rem 1rem 1rem;
    background-color: #333;
    color: white;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
}
header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.2rem;
}
header p {
    font-size: 1.1rem;
    font-weight: 300;
    opacity: 0.8;
}
main {
    max-width: 1000px;
    margin: 1.5rem auto 3rem;
    padding: 0 1rem;
}
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}
.gallery img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.gallery img:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgb(0 0 0 / 0.25);
}

/* Lightbox styles */
.lightbox {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(8px);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem;
}
.lightbox.active {
    display: flex;
}
.lightbox-image {
    max-width: 90vw;
    max-height: 75vh;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
    user-select: none;
    transition: transform 0.3s ease;
}
.caption {
    margin-top: 0.8rem;
    color: #eee;
    font-size: 1.1rem;
    font-weight: 300;
    max-width: 90vw;
    text-align: center;
    user-select: none;
}

/* Buttons for controlling lightbox */
.close-btn,
.nav-btn {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2.5rem;
    padding: 0.1rem 0.6rem 0 0.6rem;
    line-height: 1;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.25s ease;
}
.close-btn:hover,
.nav-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    color: #fff;
}
.close-btn {
    top: 1rem;
    right: 1rem;
    font-weight: 700;
    font-size: 3rem;
    padding: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 37px;
    border-radius: 50%;
}
.prev-btn {
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}
.next-btn {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
}

/* Responsive tweaking */
@media (max-width: 480px) {
    .gallery {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
    .gallery img {
        height: 120px;
    }
    .caption {
        font-size: 1rem;
    }
}

```
### JS:
```
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const caption = document.getElementById('caption');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;

    // Open lightbox with the clicked image
    function openLightbox(index) {
        currentIndex = index;
        const img = galleryImages[currentIndex];
        lightboxImage.src = img.src.replace(/400x300/, '900x600'); // load larger version
        lightboxImage.alt = img.alt;
        caption.textContent = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // disable scrolling behind
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // re-enable scrolling
    }

    // Show next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox();
    }

    // Show previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    }

    // Update lightbox image and caption
    function updateLightbox() {
        const img = galleryImages[currentIndex];
        lightboxImage.src = img.src.replace(/400x300/, '900x600'); 
        lightboxImage.alt = img.alt;
        caption.textContent = img.alt;
    }

    // Event listeners for gallery images
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    // Event listeners for buttons
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // Close lightbox if user clicks outside the image
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});
```
## OUTPUT:

![alt text](<Screenshot 2025-05-22 121716.png>)
## RESULT:
The program for designing an interactive image gallery using HTML, CSS and JavaScript is executed successfully.
