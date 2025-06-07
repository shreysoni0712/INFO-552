// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Highlight active navigation item
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add loading animation for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and clinic items
document
  .querySelectorAll(".card, .clinic-item, .resource-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Add click tracking for important buttons
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Add subtle animation feedback
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);
  });
});

// Add search functionality for clinics (basic)
function addSearchFunctionality() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search clinics by name or services...";
  searchInput.style.cssText = `
          width: 100%;
          padding: 12px;
          margin: 20px 0;
          border: 2px solid #4A90E2;
          border-radius: 8px;
          font-size: 16px;
      `;

  const clinicSection = document.getElementById("find-clinic");
  const firstClinic = clinicSection.querySelector(".clinic-item");
  clinicSection.insertBefore(searchInput, firstClinic);

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const clinics = document.querySelectorAll(".clinic-item");

    clinics.forEach((clinic) => {
      const text = clinic.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        clinic.style.display = "block";
      } else {
        clinic.style.display = "none";
      }
    });
  });
}

// Initialize search functionality
addSearchFunctionality();

// Add accessibility improvements
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Focus management for mobile menu
navMenu.addEventListener("keydown", (e) => {
  const focusableElements = navMenu.querySelectorAll(".nav-link");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
});
