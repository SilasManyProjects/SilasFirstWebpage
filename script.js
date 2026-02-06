const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close");
const musicBtn = document.getElementById("musicBtn");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;

/* Music System (Playlist) */
const playlist = ["music.mp3", "music2.mp3"];
let currentTrackIndex = 0;
const audio = new Audio(playlist[0]);
audio.volume = 0.5;
let isPlaying = false;

// When track ends, play next
audio.addEventListener('ended', function () {
    currentTrackIndex++;
    if (currentTrackIndex >= playlist.length) {
        currentTrackIndex = 0; // Loop back to start
    }
    audio.src = playlist[currentTrackIndex];
    audio.play().then(() => {
        isPlaying = true;
        updateMusicUI();
    }).catch(e => console.log("Auto-advance blocked:", e));
});

function updateMusicUI() {
    if (isPlaying) {
        musicBtn.innerHTML = "❚❚ Pause Music";
        musicBtn.style.background = "#5e008a";
    } else {
        musicBtn.innerHTML = "► Play Music";
        musicBtn.style.background = "linear-gradient(to right, #380052, #1f003b)";
    }
}

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                updateMusicUI();
            }).catch(() => {
                isPlaying = false;
            });
        }
    }
    updateMusicUI();
}

musicBtn.onclick = toggleMusic;

function tryAutoplay() {
    // Attempt to start sequence
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            updateMusicUI();
            document.removeEventListener('click', tryAutoplay);
        }).catch(() => { });
    }
}

document.addEventListener('click', tryAutoplay);

/* Gallery & Modal */
function closeModal() {
    modal.style.display = "none";
}

closeBtn.onclick = closeModal;

modal.onclick = function (e) {
    if (e.target === modal) {
        closeModal();
    }
};

document.addEventListener("contextmenu", (e) => e.preventDefault());

const galleryImages = document.querySelectorAll(".gallery img");
const galleryImagesArray = Array.from(galleryImages);

galleryImages.forEach((img, index) => {
    img.onclick = function () {
        currentIndex = index;
        openModal();
    };
});

function openModal() {
    modal.style.display = "flex";
    updateModalImage();
}

function updateModalImage() {
    // Loop navigation
    if (currentIndex >= galleryImagesArray.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = galleryImagesArray.length - 1;
    }

    const img = galleryImagesArray[currentIndex];
    modalImage.src = img.src;
    modalDescription.innerHTML = img.title;

    // Reset animation
    modalImage.style.animation = "none";
    modalImage.offsetHeight; /* trigger reflow */
    modalImage.style.animation = "zoomIn 0.3s ease";
}

// Navigation buttons
prevBtn.onclick = function () {
    currentIndex--;
    updateModalImage();
}

nextBtn.onclick = function () {
    currentIndex++;
    updateModalImage();
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            currentIndex--;
            updateModalImage();
        } else if (e.key === "ArrowRight") {
            currentIndex++;
            updateModalImage();
        } else if (e.key === "Escape") {
            closeModal();
        }
    }
});

/* Weather */
const weatherCodes = {
    0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Fog", 48: "Fog", 51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
    61: "Rain", 63: "Rain", 65: "Rain", 80: "Rain Showers", 81: "Rain Showers", 82: "Rain Showers",
    71: "Snow", 73: "Snow", 75: "Snow", 95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm"
};

const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
    45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
    61: "🌧️", 63: "🌧️", 65: "🌧️", 80: "🌧️", 81: "🌧️", 82: "🌧️",
    71: "🌨️", 73: "🌨️", 75: "🌨️", 95: "⚡", 96: "⚡", 99: "⚡"
};

async function updateCityWeather(lat, lon, suffix) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.current_weather) {
            const { temperature, weathercode } = data.current_weather;

            const tempEl = document.getElementById(`temp-${suffix}`);
            const descEl = document.getElementById(`desc-${suffix}`);
            const iconEl = document.getElementById(`icon-${suffix}`);

            if (tempEl) tempEl.textContent = `${Math.round(temperature)}°F`;
            if (descEl) descEl.textContent = weatherCodes[weathercode] || "Unknown";
            if (iconEl) iconEl.textContent = weatherIcons[weathercode] || "🌡️";
        }
    } catch (e) {
        console.error("Weather error:", e);
    }
}

function initWeather() {
    updateCityWeather(30.33, -81.66, "jax");       // Jacksonville
    updateCityWeather(38.81, -91.14, "warren");    // Warrenton
}

window.addEventListener('load', initWeather);
