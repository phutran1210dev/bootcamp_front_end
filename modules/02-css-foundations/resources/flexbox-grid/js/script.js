// CSS Flexbox & Grid Learning Platform - Interactive JavaScript
// File: script-bem.js

/**
 * CSS FLEXBOX & GRID LEARNING PLATFORM
 *
 * Interactive JavaScript for educational content
 * - Flexbox property demonstrations
 * - Grid layout examples
 * - Practice exercises
 * - Progress tracking
 */

// ===== LOADING SPINNER =====
class LoadingManager {
  constructor() {
    this.spinner = document.getElementById("loadingSpinner");
    this.progressBar = document.querySelector(".loading-progress__bar");
    this.loadingSteps = [
      "Khởi tạo CSS Variables...",
      "Tải Flexbox Demos...",
      "Chuẩn bị Grid Examples...",
      "Thiết lập Interactive Features...",
      "Hoàn thành!",
    ];
    this.currentStep = 0;
    this.init();
  }

  init() {
    this.simulateLoading();
  }

  simulateLoading() {
    const stepDuration = 400; // 400ms per step
    const totalDuration = this.loadingSteps.length * stepDuration;

    // Update loading text
    const updateStep = () => {
      if (this.currentStep < this.loadingSteps.length) {
        const subtitle = document.querySelector(".loading-spinner__subtitle");
        if (subtitle) {
          subtitle.textContent = this.loadingSteps[this.currentStep];
        }
        this.currentStep++;

        if (this.currentStep < this.loadingSteps.length) {
          setTimeout(updateStep, stepDuration);
        }
      }
    };

    // Start step updates
    setTimeout(updateStep, 200);

    // Hide spinner after loading complete
    setTimeout(() => {
      this.hideSpinner();
    }, totalDuration + 200);
  }

  hideSpinner() {
    if (this.spinner) {
      // Remove loading class from body
      document.body.classList.remove("loading");

      this.spinner.classList.add("hidden");

      // Remove from DOM after transition
      setTimeout(() => {
        if (this.spinner && this.spinner.parentNode) {
          this.spinner.parentNode.removeChild(this.spinner);
        }
      }, 500);
    }
  }
}

// ===== MOBILE NAVIGATION =====
const navToggle = document.querySelector(".navbar__toggle");
const navMenu = document.querySelector(".navbar__menu");

navToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".navbar__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// ===== SMOOTH SCROLLING =====
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

// ===== FLEXBOX INTERACTIVE DEMOS =====
class FlexboxDemo {
  constructor() {
    this.initJustifyContentDemo();
    this.initAlignItemsDemo();
    this.initFlexDirectionDemo();
    this.initFlexWrapDemo();
  }

  initJustifyContentDemo() {
    const container = document.querySelector(
      '[data-demo="justify-content"] .flex-container'
    );
    const buttons = document.querySelectorAll(
      '[data-demo="justify-content"] button'
    );

    if (!container || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        buttons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        // Apply the justify-content value
        const value = button.dataset.value;
        container.style.justifyContent = value;

        // Update container class for any special styling
        container.className = "flex-container flex-container--justify";
      });
    });

    // Set initial state
    buttons[0]?.click();
  }

  initAlignItemsDemo() {
    const container = document.querySelector(
      '[data-demo="align-items"] .flex-container'
    );
    const buttons = document.querySelectorAll(
      '[data-demo="align-items"] button'
    );

    if (!container || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const value = button.dataset.value;
        container.style.alignItems = value;
        container.className = "flex-container flex-container--align";
      });
    });

    buttons[0]?.click();
  }

  initFlexDirectionDemo() {
    const container = document.querySelector(
      '[data-demo="flex-direction"] .flex-container'
    );
    const buttons = document.querySelectorAll(
      '[data-demo="flex-direction"] button'
    );

    if (!container || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const value = button.dataset.value;
        container.style.flexDirection = value;
        container.className = "flex-container flex-container--direction";
      });
    });

    buttons[0]?.click();
  }

  initFlexWrapDemo() {
    const container = document.querySelector(
      '[data-demo="flex-wrap"] .flex-container'
    );
    const buttons = document.querySelectorAll('[data-demo="flex-wrap"] button');

    if (!container || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const value = button.dataset.value;
        container.style.flexWrap = value;
        container.className = "flex-container flex-container--wrap";
      });
    });

    buttons[0]?.click();
  }
}

// ===== GRID INTERACTIVE DEMOS =====
class GridDemo {
  constructor() {
    this.initColumnsDemo();
    this.initAreasDemo();
  }

  initColumnsDemo() {
    const container = document.querySelector(
      '[data-demo="grid-columns"] .grid-container'
    );
    const buttons = document.querySelectorAll(
      '[data-demo="grid-columns"] button'
    );

    if (!container || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const value = button.dataset.value;
        container.style.gridTemplateColumns = value;
        container.className = "grid-container grid-container--columns";
      });
    });

    buttons[0]?.click();
  }

  initAreasDemo() {
    const container = document.querySelector(
      '[data-demo="grid-areas"] .grid-container'
    );
    const buttons = document.querySelectorAll(
      '[data-demo="grid-areas"] button'
    );

    if (!container || !buttons.length) return;

    const layouts = {
      layout1: {
        areas: '"header header header" "nav main aside" "footer footer footer"',
        columns: "150px 1fr 120px",
        rows: "auto 1fr auto",
      },
      layout2: {
        areas: '"header header" "nav main" "nav aside" "footer footer"',
        columns: "200px 1fr",
        rows: "auto 1fr auto auto",
      },
      layout3: {
        areas: '"nav header header" "nav main aside" "nav footer footer"',
        columns: "120px 1fr 150px",
        rows: "auto 1fr auto",
      },
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const layoutKey = button.dataset.value;
        const layout = layouts[layoutKey];

        if (layout) {
          container.style.gridTemplateAreas = layout.areas;
          container.style.gridTemplateColumns = layout.columns;
          container.style.gridTemplateRows = layout.rows;
        }

        container.className = "grid-container grid-container--areas";
      });
    });

    buttons[0]?.click();
  }
}

// ===== PRACTICE SECTION INTERACTIVITY =====
class PracticeDemo {
  constructor() {
    this.initCardHoverEffects();
    this.initLayoutToggle();
  }

  initCardHoverEffects() {
    const cards = document.querySelectorAll(".practice-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  initLayoutToggle() {
    const toggleButton = document.querySelector(".layout-toggle");
    const practiceCards = document.querySelector(".practice-cards");

    if (toggleButton && practiceCards) {
      let isGrid = true;

      toggleButton.addEventListener("click", () => {
        if (isGrid) {
          practiceCards.style.display = "flex";
          practiceCards.style.flexDirection = "column";
          toggleButton.textContent = "Chuyển sang Grid";
        } else {
          practiceCards.style.display = "grid";
          practiceCards.style.flexDirection = "";
          toggleButton.textContent = "Chuyển sang Flexbox";
        }
        isGrid = !isGrid;
      });
    }
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.initObserver();
  }

  initObserver() {
    const options = {
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
    }, options);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
      [
        ".property-card",
        ".grid-demo-card",
        ".practice-example",
        ".comparison-example",
      ].join(",")
    );

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  }
}

// ===== COMPARISON TABLE INTERACTIONS =====
class ComparisonTable {
  constructor() {
    this.initTableHighlight();
    this.initExampleToggle();
  }

  initTableHighlight() {
    const rows = document.querySelectorAll(".comparison-table__row");

    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        row.style.backgroundColor = "var(--bg-secondary)";
      });

      row.addEventListener("mouseleave", () => {
        row.style.backgroundColor = "";
      });
    });
  }

  initExampleToggle() {
    const flexExample = document.querySelector(
      ".comparison-example:first-child"
    );
    const gridExample = document.querySelector(
      ".comparison-example:last-child"
    );

    if (flexExample && gridExample) {
      flexExample.addEventListener("click", () => {
        flexExample.style.transform = "scale(1.05)";
        gridExample.style.opacity = "0.7";

        setTimeout(() => {
          flexExample.style.transform = "";
          gridExample.style.opacity = "";
        }, 300);
      });

      gridExample.addEventListener("click", () => {
        gridExample.style.transform = "scale(1.05)";
        flexExample.style.opacity = "0.7";

        setTimeout(() => {
          gridExample.style.transform = "";
          flexExample.style.opacity = "";
        }, 300);
      });
    }
  }
}

// ===== CODE SYNTAX HIGHLIGHTING =====
class CodeHighlighter {
  constructor() {
    this.highlightCodeBlocks();
  }

  highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll(".code-demo__content code");

    codeBlocks.forEach((block) => {
      let html = block.innerHTML;

      // Simple CSS syntax highlighting
      html = html.replace(
        /(\.[\w-]+)/g,
        '<span style="color: #fbbf24;">$1</span>'
      ); // Classes
      html = html.replace(
        /(display|flex|grid|justify-content|align-items|flex-direction|flex-wrap|grid-template-columns|grid-template-rows|grid-template-areas):/g,
        '<span style="color: #60a5fa;">$1</span>:'
      ); // Properties
      html = html.replace(
        /:(.*?);/g,
        ': <span style="color: #34d399;">$1</span>;'
      ); // Values
      html = html.replace(
        /(\{|\})/g,
        '<span style="color: #f87171;">$1</span>'
      ); // Braces

      block.innerHTML = html;
    });
  }
}

// ===== PROGRESS TRACKING =====
class ProgressTracker {
  constructor() {
    this.progress = {
      flexboxViewed: false,
      gridViewed: false,
      practiceCompleted: false,
      comparisonViewed: false,
    };

    this.progressText = null;
    this.hideTimeout = null;
    this.initTracking();
    this.updateProgressBar();
    this.initHideOnComplete();
  }

  initTracking() {
    const sections = [
      { element: ".flexbox-section", key: "flexboxViewed" },
      { element: ".grid-section", key: "gridViewed" },
      { element: ".practice-section", key: "practiceCompleted" },
      { element: ".comparison-section", key: "comparisonViewed" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) =>
              entry.target.matches(s.element)
            );
            if (section) {
              this.progress[section.key] = true;
              this.updateProgressBar();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.querySelector(section.element);
      if (element) observer.observe(element);
    });
  }

  initHideOnComplete() {
    // Auto hide progress after 10 seconds if all completed
    setTimeout(() => {
      const completed = Object.values(this.progress).filter(Boolean).length;
      const total = Object.keys(this.progress).length;

      if (completed === total && this.progressText) {
        this.hideProgressText();
      }
    }, 10000);
  }

  hideProgressText() {
    if (this.progressText) {
      this.progressText.style.opacity = "0";
      this.progressText.style.transform = "translateX(100%)";

      setTimeout(() => {
        if (this.progressText && this.progressText.parentNode) {
          this.progressText.parentNode.removeChild(this.progressText);
        }
      }, 300);
    }
  }

  updateProgressBar() {
    const completed = Object.values(this.progress).filter(Boolean).length;
    const total = Object.keys(this.progress).length;
    const percentage = (completed / total) * 100;

    let progressBar = document.querySelector(".progress-bar");
    if (!progressBar) {
      this.createProgressBar();
      progressBar = document.querySelector(".progress-bar");
    }

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;

      // Update progress text
      if (this.progressText) {
        this.progressText.textContent = `Tiến độ học: ${completed}/${total} phần hoàn thành`;

        // Add completion celebration
        if (completed === total) {
          this.progressText.textContent = `🎉 Hoàn thành! ${completed}/${total} phần`;
          this.progressText.style.background = "rgba(16, 185, 129, 0.9)"; // Green background

          // Auto hide after 5 seconds when completed
          setTimeout(() => {
            this.hideProgressText();
          }, 5000);
        }
      }
    }
  }

  createProgressBar() {
    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";
    progressContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 9999;
    `;

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.style.cssText = `
      height: 100%;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      width: 0%;
      transition: width 0.3s ease;
    `;

    this.progressText = document.createElement("div");
    this.progressText.className = "progress-text";
    this.progressText.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.875rem;
      z-index: 999;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      max-width: 200px;
      text-align: center;
    `;
    this.progressText.textContent = "Tiến độ học: 0/4 phần hoàn thành";

    // Add click to hide functionality
    this.progressText.addEventListener("click", () => {
      this.hideProgressText();
    });

    // Add hover effects
    this.progressText.addEventListener("mouseenter", () => {
      this.progressText.style.transform = "scale(1.05)";
      this.progressText.style.background = "rgba(0, 0, 0, 0.9)";
    });

    this.progressText.addEventListener("mouseleave", () => {
      this.progressText.style.transform = "scale(1)";
      this.progressText.style.background = "rgba(0, 0, 0, 0.8)";
    });

    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    document.body.appendChild(this.progressText);
  }
}

// ===== KEYBOARD NAVIGATION =====
class KeyboardNavigation {
  constructor() {
    this.initKeyboardShortcuts();
  }

  initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Alt + number keys to jump to sections
      if (e.altKey) {
        switch (e.key) {
          case "1":
            this.scrollToSection(".flexbox-section");
            break;
          case "2":
            this.scrollToSection(".grid-section");
            break;
          case "3":
            this.scrollToSection(".practice-section");
            break;
          case "4":
            this.scrollToSection(".comparison-section");
            break;
        }
      }

      // Arrow keys for demo navigation
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const activeDemo = document.querySelector(
          ".property-card:hover, .grid-demo-card:hover"
        );
        if (activeDemo) {
          const buttons = activeDemo.querySelectorAll("button");
          const activeButton = activeDemo.querySelector("button.active");
          const currentIndex = Array.from(buttons).indexOf(activeButton);

          let newIndex;
          if (e.key === "ArrowLeft") {
            newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
          } else {
            newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
          }

          buttons[newIndex]?.click();
          e.preventDefault();
        }
      }
    });
  }

  scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// ===== INITIALIZE ALL COMPONENTS =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading spinner first
  const loadingManager = new LoadingManager();

  // Initialize all interactive components after a short delay
  setTimeout(() => {
    new FlexboxDemo();
    new GridDemo();
    new PracticeDemo();
    new ScrollAnimations();
    new ComparisonTable();
    new CodeHighlighter();
    new ProgressTracker();
    new KeyboardNavigation();

    // Add loading complete animation to body
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      document.body.style.opacity = "1";
      document.body.style.transform = "translateY(0)";
    }, 100);

    console.log("🎉 CSS Flexbox & Grid Learning Platform được tải thành công!");
    console.log("💡 Sử dụng Alt + số (1-4) để chuyển nhanh giữa các phần");
    console.log(
      "⌨️ Sử dụng mũi tên trái/phải khi hover vào demo để thay đổi thuộc tính"
    );
  }, 300);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy loading for images
const lazyImages = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));
