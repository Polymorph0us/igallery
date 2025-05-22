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
