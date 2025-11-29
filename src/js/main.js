// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Theme toggle
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const html = document.querySelector("html");

// Fungsi untuk mengubah ikon berdasarkan tema saat ini
function updateIcons() {
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
    themeToggleDarkIcon.classList.add("hidden");
  } else {
    themeToggleLightIcon.classList.add("hidden");
    themeToggleDarkIcon.classList.remove("hidden");
  }
}

// Event listener untuk tombol toggle
themeToggleBtn.addEventListener("click", function () {
  // Toggle tema di localStorage
  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
    html.classList.remove("dark");
  } else {
    localStorage.setItem("theme", "dark");
    html.classList.add("dark");
  }
  // Perbarui ikon setelah klik
  updateIcons();
});

// Panggil fungsi saat halaman pertama kali dimuat untuk mengatur ikon yang benar
document.addEventListener("DOMContentLoaded", updateIcons);
