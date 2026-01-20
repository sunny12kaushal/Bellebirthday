let currentChapter = 0;

function nextChapter(next) {
    console.log('Switching to chapter', next); // Debug log
    document.getElementById(`chapter${currentChapter}`).classList.remove('active');
    document.getElementById(`chapter${next}`).classList.add('active');
    currentChapter = next;
    if (next === 7) {
        console.log('Starting rose petals'); // Debug log
        startRosePetals();
    }
}

function revealFlowers() {
    document.getElementById('gift-box').style.display = 'none';
    document.getElementById('flowers').style.display = 'block';
    setTimeout(() => {
        nextChapter(7);
    }, 2000);
}

function startRosePetals() {
    const container = document.getElementById('container');
    const petalCount = 30;
    const petals = [];
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        container.appendChild(petal);
        petals.push(petal);
    }
    setTimeout(() => {
        petals.forEach(petal => petal.remove());
    }, 10000);
}

document.querySelectorAll('.text').forEach(el => {
    const text = el.getAttribute('data-text');
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(timer);
    }, 100);
});

// Looping carousel logic
document.querySelectorAll('.carousel').forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const images = inner.querySelectorAll('img');
    const imageWidth = images[0].offsetWidth + 10; // Image width + gap
    const totalImages = images.length;

    // Duplicate images for seamless looping
    for (let i = 0; i < totalImages; i++) {
        const clone = images[i].cloneNode(true);
        inner.appendChild(clone);
    }

    let startX;
    let scrollLeft;
    let isDown = false;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
        // Check for loop reset
        if (carousel.scrollLeft >= imageWidth * totalImages) {
            carousel.scrollLeft -= imageWidth * totalImages; // Loop back to start
        } else if (carousel.scrollLeft <= 0) {
            carousel.scrollLeft += imageWidth * totalImages; // Loop to end
        }
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchend', () => {
        // Check for loop reset on touch end
        if (carousel.scrollLeft >= imageWidth * totalImages) {
            carousel.scrollLeft -= imageWidth * totalImages;
        } else if (carousel.scrollLeft <= 0) {
            carousel.scrollLeft += imageWidth * totalImages;
        }
    });
});