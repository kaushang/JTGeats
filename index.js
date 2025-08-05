// Carousel functionality
let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;

// Function to update carousel position
function updateCarousel() {
  const carouselTrack = document.getElementById("carouselTrack");
  if (!carouselTrack) return;
  
  const translateX = -currentSlide * 100;
  carouselTrack.style.transform = `translateX(${translateX}%)`;

  // Update indicators
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

// Function to go to next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  resetAutoSlide();
}

// Function to go to previous slide
function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoSlide();
}

// Function to go to specific slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
  resetAutoSlide();
}

// Function to start auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// Function to reset auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize carousel
  updateCarousel();
  startAutoSlide();

  // Pause auto-slide on hover
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener("mouseleave", () => {
      startAutoSlide();
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carouselContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", () => {
      const threshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      previousSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
});

// Make functions globally available for onclick handlers
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;

// Modal functionality
function openModal() {
  const modal = document.getElementById('requestModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModal() {
  const modal = document.getElementById('requestModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    // Reset form
    document.getElementById('requestForm').reset();
  }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
  const requestForm = document.getElementById('requestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(requestForm);
      const data = Object.fromEntries(formData);
      
      // Show success message (you can customize this)
      alert('Thank you for your request! We will get back to you soon.');
      
      // Close modal
      closeModal();
    });
  }

  // Close modal when clicking outside
  const modalOverlay = document.getElementById('requestModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
        