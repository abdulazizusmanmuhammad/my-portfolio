(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");
  const menuToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector("#navmenu");
  const scrollTop = document.querySelector("#scroll-top");

  function updateScrollState() {
    if (header && window.scrollY > 24) {
      body.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
    }

    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 320);
    }
  }

  function setMenuOpen(isOpen) {
    body.classList.toggle("mobile-nav-active", isOpen);
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-list", !isOpen);
        icon.classList.toggle("bi-x", isOpen);
      }
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (body.classList.contains("mobile-nav-active")) {
          setMenuOpen(false);
        }
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("mobile-nav-active")) {
      setMenuOpen(false);
      if (menuToggle) {
        menuToggle.focus();
      }
    }
  });

  if (scrollTop) {
    scrollTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll(".current-year").forEach(function (year) {
    year.textContent = String(new Date().getFullYear());
  });

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  if (window.AOS && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 40
    });
  }
})();
