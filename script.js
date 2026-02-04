// Grab elements
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const galleryImages = document.querySelectorAll(".gallery img");
const closeBtn = document.querySelector(".close");

// Add click event to all gallery images
galleryImages.forEach(img => {
    img.onclick = function () {
        modal.style.display = "flex";
        modalImage.src = this.src;
        modalDescription.innerHTML = this.title;
        modalImage.style.animation = "zoomIn 0.3s ease";
    }
});

// Close modal when clicking the 'X'
closeBtn.onclick = function () {
    closeModal();
}

// Close modal when clicking the dark background
modal.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
}

function closeModal() {
    modal.style.display = "none";
}

// Disable Right Click (Context Menu)
function disableRightClick() {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });
}
disableRightClick();
