(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");
  const menuToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector("#navmenu");
  const scrollTop = document.querySelector("#scroll-top");
  const enquiryForm = document.querySelector("#project-enquiry-form");

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

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) {
        return;
      }

      const formData = new FormData(enquiryForm);
      const name = String(formData.get("name")).trim();
      const email = String(formData.get("email")).trim();
      const service = String(formData.get("service")).trim();
      const message = String(formData.get("message")).trim();
      const subject = `Project enquiry: ${service}`;
      const bodyText = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service}`,
        "",
        message
      ].join("\n");
      const mailto = `mailto:abdulazizusmanaum01@gmail.com?${new URLSearchParams({
        subject,
        body: bodyText
      })}`;
      const status = enquiryForm.querySelector(".form-status");

      if (status) {
        status.textContent = "Your email app should open with this message ready. Review it, then press Send to deliver your enquiry.";
      }

      window.location.href = mailto;
    });
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
      const isOpening = menuToggle.getAttribute("aria-expanded") !== "true";
      setMenuOpen(isOpening);
      if (isOpening && navMenu) {
        const firstLink = navMenu.querySelector("ul a");
        if (firstLink) {
          firstLink.focus({ preventScroll: true });
        }
      }
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

  document.addEventListener("click", function (event) {
    if (body.classList.contains("mobile-nav-active") && navMenu && !navMenu.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("mobile-nav-active")) {
      setMenuOpen(false);
      if (menuToggle) {
        menuToggle.focus();
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1199.98 && body.classList.contains("mobile-nav-active")) {
      setMenuOpen(false);
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
