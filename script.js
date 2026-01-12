/************************************************
 * Data Setti - Main JavaScript File
 * Professional logging and error handling
 * Version: 1.0.0
 ************************************************/

/**
 * Utility function for professional logging
 * @param {string} level - Log level (info, warn, error, debug)
 * @param {string} message - Log message
 * @param {object} data - Optional data to log
 */
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  if (data) {
    console[level](logMessage, data);
  } else {
    console[level](logMessage);
  }
}

/**
 * Initialize carousel functionality
 * @param {string} carouselId - ID of the carousel wrapper
 * @param {string} prevId - ID of previous button
 * @param {string} nextId - ID of next button
 * @param {string} type - Type of carousel ('projeto' or 'depoimento')
 * @returns {object} Carousel state object
 */
function initCarousel(carouselId, prevId, nextId, type) {
  try {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (!carousel || !prevBtn || !nextBtn) {
      log("warn", `Carousel elements not found for ${type}`, {
        carousel: !!carousel,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
      });
      return null;
    }

    let currentIndex = 0;
    const items = carousel.querySelectorAll(".carousel-item");

    if (items.length === 0) {
      log("warn", `No carousel items found for ${type}`);
      return null;
    }

    log("info", `Carousel initialized: ${type}`, { itemCount: items.length });

    const moveCarousel = (direction) => {
      try {
        currentIndex += direction;

        // Circular navigation
        if (currentIndex < 0) {
          currentIndex = items.length - 1;
        } else if (currentIndex >= items.length) {
          currentIndex = 0;
        }

        const newTransform = `translateX(-${currentIndex * 100}%)`;
        carousel.style.transform = newTransform;

        log("debug", `Carousel ${type} moved`, {
          direction,
          newIndex: currentIndex,
          totalItems: items.length,
        });
      } catch (error) {
        log("error", `Error moving carousel ${type}`, error);
      }
    };

    prevBtn.addEventListener("click", () => moveCarousel(-1));
    nextBtn.addEventListener("click", () => moveCarousel(1));

    return { carousel, currentIndex, items };
  } catch (error) {
    log("error", `Failed to initialize carousel ${type}`, error);
    return null;
  }
}

/* -----------------------------
   Carousel Initialization
------------------------------ */
let projetosCarousel = null;
let depoimentosCarousel = null;

document.addEventListener("DOMContentLoaded", () => {
  log("info", "DOM loaded, initializing carousels");

  projetosCarousel = initCarousel(
    "carouselProj",
    "prevProj",
    "nextProj",
    "projeto"
  );
  depoimentosCarousel = initCarousel(
    "carouselDepo",
    "prevDepo",
    "nextDepo",
    "depoimento"
  );
});

/* -----------------------------
   Form Submission Handler
------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  const formContato = document.querySelector(".form-contato");

  if (!formContato) {
    log("warn", "Contact form not found");
    return;
  }

  log("info", "Contact form initialized");

  formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      log("info", "Form submission started");

      const formData = new FormData(this);
      const formValues = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        empresa: formData.get("empresa"),
        message: formData.get("message"),
      };

      // Validation
      if (!formValues.name || !formValues.email || !formValues.message) {
        log("warn", "Form validation failed", { formValues });
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
        log("warn", "Invalid email format", { email: formValues.email });
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      log("info", "Form data validated, submitting", {
        name: formValues.name,
        email: formValues.email,
        hasPhone: !!formValues.phone,
      });

      fetch(this.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            log("info", "Form submitted successfully");
            formContato.style.display = "none";

            const successMessage = document.getElementById("mensagem-sucesso");
            if (successMessage) {
              successMessage.style.display = "block";
            } else {
              alert(
                "Mensagem enviada com sucesso! Entraremos em contato em breve."
              );
            }
          } else {
            log("error", "Form submission failed", {
              status: response.status,
              statusText: response.statusText,
            });
            alert("Erro ao enviar o formulário. Tente novamente.");
          }
        })
        .catch((error) => {
          log("error", "Form submission error", error);
          alert(
            "Erro ao enviar o formulário. Verifique sua conexão e tente novamente."
          );
        });
    } catch (error) {
      log("error", "Unexpected error in form submission", error);
      alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
    }
  });
});

/* -----------------------------
   Banner Text Rotation
------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  try {
    const frases = [
      "Maximize Suas Oportunidades",
      "Seja Inovador no Mercado",
      "Aumente Seus Lucros com a Data Setti",
      "Passe a Concorrência com Tecnologia de Ponta",
    ];

    const bannerText = document.getElementById("banner-text");

    if (!bannerText) {
      log("warn", "Banner text element not found");
      return;
    }

    let index = 0;
    const FADE_DURATION = 500; // milliseconds
    const ROTATION_INTERVAL = 3000; // milliseconds

    log("info", "Banner text rotation initialized", {
      phraseCount: frases.length,
      rotationInterval: ROTATION_INTERVAL,
    });

    function mudarTexto() {
      try {
        index = (index + 1) % frases.length;
        bannerText.style.opacity = 0; // Fade-out effect

        setTimeout(() => {
          bannerText.textContent = frases[index];
          bannerText.style.opacity = 1; // Fade-in effect
          log("debug", "Banner text rotated", {
            newIndex: index,
            text: frases[index],
          });
        }, FADE_DURATION);
      } catch (error) {
        log("error", "Error rotating banner text", error);
      }
    }

    setInterval(mudarTexto, ROTATION_INTERVAL);
  } catch (error) {
    log("error", "Failed to initialize banner text rotation", error);
  }
});

/* -----------------------------
   Mobile Menu (Hamburger) Handler
------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  try {
    const hamburger = document.getElementById("hamburger");
    const sideMenu = document.getElementById("sideMenu");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");

    if (!hamburger || !sideMenu || !closeBtn || !overlay) {
      log("warn", "Mobile menu elements not found", {
        hamburger: !!hamburger,
        sideMenu: !!sideMenu,
        closeBtn: !!closeBtn,
        overlay: !!overlay,
      });
      return;
    }

    log("info", "Mobile menu initialized");

    // Open side menu
    hamburger.addEventListener("click", () => {
      try {
        sideMenu.classList.add("active");
        overlay.classList.add("active");
        log("debug", "Mobile menu opened");
      } catch (error) {
        log("error", "Error opening mobile menu", error);
      }
    });

    // Close side menu
    closeBtn.addEventListener("click", () => {
      try {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        log("debug", "Mobile menu closed");
      } catch (error) {
        log("error", "Error closing mobile menu", error);
      }
    });

    // Close menu when clicking overlay
    overlay.addEventListener("click", () => {
      try {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        log("debug", "Mobile menu closed via overlay");
      } catch (error) {
        log("error", "Error closing mobile menu via overlay", error);
      }
    });
  } catch (error) {
    log("error", "Failed to initialize mobile menu", error);
  }
});

/* -----------------------------
   Smooth Scroll for Anchor Links
------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  try {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href === "#" || href === "#!") {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 70; // Header height
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const sideMenu = document.getElementById("sideMenu");
          const overlay = document.getElementById("overlay");
          if (sideMenu && overlay) {
            sideMenu.classList.remove("active");
            overlay.classList.remove("active");
          }

          log("debug", "Smooth scroll executed", { target: href });
        }
      });
    });

    log("info", "Smooth scroll initialized", { linkCount: anchorLinks.length });
  } catch (error) {
    log("error", "Failed to initialize smooth scroll", error);
  }
});

/* -----------------------------
   Performance Monitoring
------------------------------ */
window.addEventListener("load", function () {
  try {
    if ("performance" in window) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      log("info", "Page load performance", {
        loadTime: `${pageLoadTime}ms`,
        domContentLoaded: `${
          perfData.domContentLoadedEventEnd - perfData.navigationStart
        }ms`,
      });
    }
  } catch (error) {
    log("warn", "Could not measure performance", error);
  }
});
