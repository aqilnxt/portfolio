// =====================================
// IMPORTS
// =====================================
import "../css/input.css";
import AOS from "aos";
import "aos/dist/aos.css";
// import '../css/style.css'
import Typed from "typed.js";

// =====================================
// UTILITY FUNCTIONS
// =====================================
function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// =====================================
// CONSTANTS
// =====================================
const SCROLL_THRESHOLD = 50;
const THEME_KEY = "theme";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

// =====================================
// APP INITIALIZATION
// =====================================
document.addEventListener("DOMContentLoaded", () => {

  initAOS();
  initNavbar();
  initHamburgerMenu();
  initThemeToggle();
  initBackToTop();
  initTypingEffect();
  initContactForm();

});

// =====================================
// AOS ANIMATION
// =====================================
function initAOS() {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
    easing: "ease-out-cubic",
    delay: 0,
    anchorPlacement: "top-bottom",
    mirror: false,
  });
  console.log("✨ AOS initialized with professional animations");
}

// =====================================
// NAVBAR FIXED & SCROLL EFFECTS
// =====================================
function initNavbar() {
  const header = document.querySelector("header");

  if (!header) {
    console.warn("Header element not found");
    return;
  }

  const handleScroll = throttle(() => {
    if (window.pageYOffset > SCROLL_THRESHOLD) {
      header.classList.add("navbar-fixed");
    } else {
      header.classList.remove("navbar-fixed");
    }
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });
}

// =====================================
// HAMBURGER MENU
// =====================================
function initHamburgerMenu() {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");

  if (!hamburger || !navMenu) {
    console.warn("Hamburger or nav-menu not found");
    return;
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  function toggleMenu() {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");

    const isExpanded = !navMenu.classList.contains("hidden");
    hamburger.setAttribute("aria-expanded", isExpanded);
  }

  function closeMenu() {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
    hamburger.setAttribute("aria-expanded", "false");
  }
}

// =====================================
// DARK MODE THEME TOGGLE
// =====================================
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const html = document.documentElement;

  if (!themeToggleBtn || !themeToggleDarkIcon || !themeToggleLightIcon) {
    console.warn("Theme toggle elements not found");
    return;
  }

  function getCurrentTheme() {
    return (
      localStorage.getItem(THEME_KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEME_DARK
        : THEME_LIGHT)
    );
  }

  function updateIcons(theme) {
    if (theme === THEME_DARK) {
      themeToggleLightIcon.classList.remove("hidden");
      themeToggleDarkIcon.classList.add("hidden");
    } else {
      themeToggleLightIcon.classList.add("hidden");
      themeToggleDarkIcon.classList.remove("hidden");
    }
  }

  function applyTheme(theme) {
    if (theme === THEME_DARK) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
    updateIcons(theme);
  }

  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  }

  const initialTheme = getCurrentTheme();
  applyTheme(initialTheme);

  themeToggleBtn.addEventListener("click", toggleTheme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });
}

// =====================================
// BACK TO TOP BUTTON
// =====================================
function initBackToTop() {
  const toTopBtn = document.querySelector("#to-top");

  if (!toTopBtn) {
    console.warn("Back to top button not found");
    return;
  }

  const handleScroll = throttle(() => {
    if (window.pageYOffset > SCROLL_THRESHOLD) {
      toTopBtn.classList.remove("hidden");
      toTopBtn.classList.add("flex");
    } else {
      toTopBtn.classList.add("hidden");
      toTopBtn.classList.remove("flex");
    }
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });

  toTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
    });
  });

  console.log("Back to top button initialized");
}

// =====================================
// TYPING EFFECT
// =====================================
function initTypingEffect() {
  const typed = new Typed("#typed", {
    strings: [
      "a Thinker",
      "Frontend Developer",
      "Tech Enthusiast",
      "Problem Solver",
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
}
// =====================================
// CONTACT FORM HANDLER
// =====================================
function initContactForm() {
  const form = document.querySelector("#contact form");

  if (!form) {
    console.warn("Contact form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Success
        submitBtn.textContent = "✓ Sent!";
        submitBtn.classList.add("bg-green-500");
        form.reset();

        // Alert success
        alert("Message sent successfully! I will get back to you soon. 😊");

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.classList.remove("bg-green-500");
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form error:", error);
      submitBtn.textContent = "✗ Error";
      submitBtn.classList.add("bg-red-500");

      alert("Oops! Something went wrong. Please try again.");

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove("bg-red-500");
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}
