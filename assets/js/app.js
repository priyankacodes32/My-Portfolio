/**
 * Core Application Script
 * Initializes navbar behaviors, case study details toggling, scroll progress,
 * active link highlighting, and general interactivity.
 */

document.addEventListener("componentsLoaded", () => {
  initNavbarScroll();
  initScrollProgress();
  initActiveNavHighlight();
  initCaseStudyToggle();
  initSmoothScroll();
  initContactForm();
  initProjectShowcaseModal();
  initProjectShowcaseModalApex();
  initProjectShowcaseModalFood();
  initMyDesigns();
});

// 1. Navbar Sticky & Shadow Effects
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Execute once in case page loads scrolled down
}

// 2. Page Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// 3. Sync Sticky Navbar active highlights with viewport scroll
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link:not(.nav-cta)");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Triggers focus offset
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

// 4. Project Case Study Grid Expansion
function initCaseStudyToggle() {
  const caseStudyButtons = document.querySelectorAll(".btn-case-study");

  caseStudyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-case-study");
      const targetCaseStudy = document.getElementById(targetId);

      if (!targetCaseStudy) return;

      const isExpanded = targetCaseStudy.classList.contains("expanded");

      if (isExpanded) {
        targetCaseStudy.classList.remove("expanded");
        btn.innerHTML = `View Case Study <i class="bi bi-chevron-down ms-1"></i>`;

        // Smoothly scroll back to the project header
        const card = btn.closest(".project-card");
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        targetCaseStudy.classList.add("expanded");
        btn.innerHTML = `Close Case Study <i class="bi bi-chevron-up ms-1"></i>`;

        // Scroll to the detailed case study
        setTimeout(() => {
          targetCaseStudy.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    });
  });
}

// 5. Smooth Scroll for Page anchors
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetSection = document.querySelector(href);
      if (targetSection) {
        e.preventDefault();

        // Collapse mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }

        const yOffset = -100; // Account for the floating navbar
        const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
}

// 6. Simple Interactive Contact Form
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `Sending... <span class="spinner-border spinner-border-sm ms-2" role="status"></span>`;

    // Simulate sending progress
    setTimeout(() => {
      btn.innerHTML = `Message Sent <i class="bi bi-check-circle-fill ms-2"></i>`;
      btn.classList.remove("btn-indigo-premium");
      btn.classList.add("btn-success");
      form.reset();

      // Revert after 3 seconds
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.classList.remove("btn-success");
        btn.classList.add("btn-indigo-premium");
      }, 3000);
    }, 1500);
  });
}

// 7. Project Showcase Modal (School IERP)
function initProjectShowcaseModal() {
  const openBtn = document.getElementById("open-showcase-btn");
  const triggerDiv = document.getElementById("project1-showcase-trigger");
  const modalEl = document.getElementById("showcaseModal");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);

  const openModal = (e) => {
    e.preventDefault();
    modal.show();
    // Reset scroll position to first slide
    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollLeft = 0;
    }
  };

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (triggerDiv) triggerDiv.addEventListener("click", openModal);

  // Carousel logic
  const schoolERPImages = [
    { file: "Admin Dashboard.png", title: "Admin Dashboard" },
    { file: "Teacher Dashboard.png", title: "Teacher Dashboard" },
    { file: "Student Dashboard.png", title: "Student Dashboard" },
    { file: "Time Table.png", title: "Class Timetable" },
    { file: "Student Attendance.png", title: "Student Attendance View" },
    { file: "Mark Attendance Teacher Section.png", title: "Teacher Attendance Marker" },
    { file: "Monthwise Attendance Teacher Section.png", title: "Month-wise Attendance Report" },
    { file: "Result.png", title: "Academic Results Hub" },
    { file: "Announcements.png", title: "Announcements Bulletin Board" },
    { file: "Add Announcements Teacher.png", title: "Teacher Announcement Editor" },
    { file: "Leave Application.png", title: "Leave Applications List" },
    { file: "Leave Application Modal.png", title: "Leave Application Details" },
    { file: "Add Leave Application Student.png", title: "Submit Leave Request" },
    { file: "Add Student.png", title: "New Student Registration" },
    { file: "Achievements.png", title: "Student Achievements Board" },
    { file: "Achievements Modal.png", title: "Achievement Details" },
    { file: "Add and Edit Achievements.png", title: "Achievement Editor" },
    { file: "Feedback.png", title: "Parent/Student Feedback Form" },
    { file: "Holiday Section.png", title: "Holiday Calendar" },
    { file: "Profile Section.png", title: "User Profile Settings" },
    { file: "Parent Contact Us.png", title: "Parent Contact Portal" }
  ];

  let currentIdx = 0;
  const imgEl = document.getElementById("carousel-img");
  const captionEl = document.getElementById("carousel-caption");
  const indexEl = document.getElementById("carousel-index");

  const updateSlide = (idx) => {
    if (idx < 0) idx = schoolERPImages.length - 1;
    if (idx >= schoolERPImages.length) idx = 0;
    currentIdx = idx;

    if (imgEl) {
      imgEl.style.opacity = 0;
      setTimeout(() => {
        imgEl.src = `./assets/images/project_files/School-ERP-UI/${schoolERPImages[currentIdx].file}`;
        imgEl.style.opacity = 1;
      }, 150);
    }
    if (captionEl) captionEl.innerText = schoolERPImages[currentIdx].title;
    if (indexEl) indexEl.innerText = `${currentIdx + 1} / ${schoolERPImages.length}`;
  };

  const prevBtn = document.getElementById("prev-ui-btn");
  const nextBtn = document.getElementById("next-ui-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentIdx + 1);
    });
  }

  // Tabs scroll syncing
  const scrollContainer = document.getElementById("scroll-container");
  const tabs = [
    document.getElementById("tab-ui"),
    document.getElementById("tab-typography"),
    document.getElementById("tab-colortheory")
  ];

  tabs.forEach((tab, index) => {
    if (tab) {
      tab.addEventListener("click", () => {
        const paneWidth = scrollContainer.clientWidth;
        scrollContainer.scrollTo({
          left: index * paneWidth,
          behavior: "smooth"
        });

        // Explicitly set active class on click to be immediate
        tabs.forEach((t, i) => {
          if (t) {
            if (i === index) t.classList.add("active");
            else t.classList.remove("active");
          }
        });
      });
    }
  });

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      const paneWidth = scrollContainer.clientWidth;
      if (paneWidth <= 0) return;
      const index = Math.round(scrollContainer.scrollLeft / paneWidth);
      tabs.forEach((tab, i) => {
        if (tab) {
          if (i === index) tab.classList.add("active");
          else tab.classList.remove("active");
        }
      });
    });
  }
}

// 8. Project Showcase Modal (APEX Fitness Tracker)
function initProjectShowcaseModalApex() {
  const openBtn = document.getElementById("open-showcase-btn-apex");
  const triggerDiv = document.getElementById("project2-showcase-trigger");
  const modalEl = document.getElementById("showcaseModalApex");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);

  const openModal = (e) => {
    e.preventDefault();
    modal.show();
    // Reset scroll position to first slide
    const scrollContainer = document.getElementById("scroll-container-apex");
    if (scrollContainer) {
      scrollContainer.scrollLeft = 0;
    }
  };

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (triggerDiv) triggerDiv.addEventListener("click", openModal);

  // Carousel logic
  const apexImages = [
    { file: "Home Page (1).png", title: "Activity Dashboard Home" },
    { file: "gym workouts.png", title: "Gym Workout Categories" },
    { file: "Aerobic.png", title: "Aerobic Exercises Log" },
    { file: "Strength.png", title: "Strength Workouts Log" },
    { file: "Stretching.png", title: "Stretching Routines Log" },
    { file: "Balance.png", title: "Balance Exercises" },
    { file: "BMI page (1).png", title: "BMI Calculator Tool" },
    { file: "Hydration (1).png", title: "Daily Hydration Goals" },
    { file: "Intake.png", title: "Water Intake Tracker" },
    { file: "Stop Watch.png", title: "Exercise Stopwatch Timer" },
    { file: "Set Alarm.png", title: "Set Alarm Parameters" },
    { file: "Add alarm (1).png", title: "Configure Alerts" },
    { file: "Personal detail.png", title: "User Health Metrics Configuration" },
    { file: "Profile.png", title: "User Profile Dashboard" },
    { file: "Login Page (1).png", title: "Sign In Screen" },
    { file: "Sign Up Page.png", title: "Create APEX Account" },
    { file: "Forget Password.png", title: "Password Recovery" },
    { file: "Check Email.png", title: "Confirmation E-mail Sent" },
    { file: "Quotations (1).png", title: "Daily Motivation Quotes (Page 1)" },
    { file: "Quotations (2).png", title: "Daily Motivation Quotes (Page 2)" }
  ];

  let currentIdx = 0;
  const imgEl = document.getElementById("carousel-img-apex");
  const captionEl = document.getElementById("carousel-caption-apex");
  const indexEl = document.getElementById("carousel-index-apex");

  const updateSlide = (idx) => {
    if (idx < 0) idx = apexImages.length - 1;
    if (idx >= apexImages.length) idx = 0;
    currentIdx = idx;

    if (imgEl) {
      imgEl.style.opacity = 0;
      setTimeout(() => {
        imgEl.src = `./assets/images/project_files/APEX-Project-UI/${apexImages[currentIdx].file}`;
        imgEl.style.opacity = 1;
      }, 150);
    }
    if (captionEl) captionEl.innerText = apexImages[currentIdx].title;
    if (indexEl) indexEl.innerText = `${currentIdx + 1} / ${apexImages.length}`;
  };

  const prevBtn = document.getElementById("prev-ui-btn-apex");
  const nextBtn = document.getElementById("next-ui-btn-apex");

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentIdx + 1);
    });
  }

  // Tabs scroll syncing
  const scrollContainer = document.getElementById("scroll-container-apex");
  const tabs = [
    document.getElementById("tab-ui-apex"),
    document.getElementById("tab-typography-apex"),
    document.getElementById("tab-colortheory-apex")
  ];

  tabs.forEach((tab, index) => {
    if (tab) {
      tab.addEventListener("click", () => {
        const paneWidth = scrollContainer.clientWidth;
        scrollContainer.scrollTo({
          left: index * paneWidth,
          behavior: "smooth"
        });

        // Explicitly set active class on click to be immediate
        tabs.forEach((t, i) => {
          if (t) {
            if (i === index) t.classList.add("active");
            else t.classList.remove("active");
          }
        });
      });
    }
  });

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      const paneWidth = scrollContainer.clientWidth;
      if (paneWidth <= 0) return;
      const index = Math.round(scrollContainer.scrollLeft / paneWidth);
      tabs.forEach((tab, i) => {
        if (tab) {
          if (i === index) tab.classList.add("active");
          else tab.classList.remove("active");
        }
      });
    });
  }
}

// 9. Project Showcase Modal (Food Scheduler)
function initProjectShowcaseModalFood() {
  const openBtn = document.getElementById("open-showcase-btn-food");
  const triggerDiv = document.getElementById("project3-showcase-trigger");
  const modalEl = document.getElementById("showcaseModalFood");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);

  const openModal = (e) => {
    e.preventDefault();
    modal.show();
    // Reset scroll position to first slide
    const scrollContainer = document.getElementById("scroll-container-food");
    if (scrollContainer) {
      scrollContainer.scrollLeft = 0;
    }
  };

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (triggerDiv) triggerDiv.addEventListener("click", openModal);

  // Carousel logic
  const foodImages = [
    { file: "FoodScheduler.png", title: "App Dashboard" },
    { file: "Breakfast.png", title: "Breakfast Schedule" },
    { file: "BF Food.png", title: "Breakfast Foods" },
    { file: "BF Food (1).png", title: "Breakfast Details 1" },
    { file: "BF Food (2).png", title: "Breakfast Details 2" },
    { file: "BF Food (3).png", title: "Breakfast Details 3" },
    { file: "BFruits.png", title: "Fruit Selection" },
    { file: "BFruits (2).png", title: "Fruit Details" },
    { file: "Lunch.png", title: "Lunch Schedule" },
    { file: "Dinner.png", title: "Dinner Schedule" },
    { file: "Dinner (1).png", title: "Dinner Details" },
    { file: "Drink (1).png", title: "Hydration & Drinks" },
    { file: "Nutrition (2).png", title: "Nutrition Summary" },
    { file: "Add.png", title: "Add Custom Meal" }
  ];

  let currentIdx = 0;
  const imgEl = document.getElementById("carousel-img-food");
  const captionEl = document.getElementById("carousel-caption-food");
  const indexEl = document.getElementById("carousel-index-food");
  const prevBtn = document.getElementById("prev-ui-btn-food");
  const nextBtn = document.getElementById("next-ui-btn-food");

  const updateSlide = () => {
    if (!imgEl) return;
    imgEl.style.opacity = "0.5";
    setTimeout(() => {
      imgEl.src = `./assets/images/project_files/Food-Sheduler-UI/${foodImages[currentIdx].file}`;
      if (captionEl) captionEl.textContent = foodImages[currentIdx].title;
      if (indexEl) indexEl.textContent = `${currentIdx + 1} / ${foodImages.length}`;
      imgEl.style.opacity = "1";
    }, 150);
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx === 0) ? foodImages.length - 1 : currentIdx - 1;
      updateSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx === foodImages.length - 1) ? 0 : currentIdx + 1;
      updateSlide();
    });
  }

  // Tab Navigation (Scroll pane syncing)
  const tabs = [
    { id: "tab-ui-food", index: 0 },
    { id: "tab-typography-food", index: 1 },
    { id: "tab-colortheory-food", index: 2 }
  ];

  const scrollContainer = document.getElementById("scroll-container-food");

  tabs.forEach(tab => {
    const btn = document.getElementById(tab.id);
    if (btn && scrollContainer) {
      btn.addEventListener("click", () => {
        // Remove active class from all
        tabs.forEach(t => {
          const b = document.getElementById(t.id);
          if (b) b.classList.remove("active");
        });
        // Add active to current
        btn.classList.add("active");

        // Scroll to pane
        const paneWidth = scrollContainer.offsetWidth;
        scrollContainer.scrollTo({
          left: paneWidth * tab.index,
          behavior: "smooth"
        });
      });
    }
  });

  // Sync active tab on scroll
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      const paneWidth = scrollContainer.offsetWidth;
      const scrollPos = scrollContainer.scrollLeft;
      const activeIndex = Math.round(scrollPos / paneWidth);

      tabs.forEach((tab, idx) => {
        const btn = document.getElementById(tab.id);
        if (btn) {
          if (idx === activeIndex) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        }
      });
    });
  }
}

// 10. My Designs Section (Toggle & Modal)
function initMyDesigns() {
  const openModalBtn = document.getElementById("open-mydesigns-modal-btn");
  const modalEl = document.getElementById("mydesignsModal");
  const lightboxEl = document.getElementById("mydesignsLightboxModal");

  // Open Grid Modal
  if (openModalBtn && modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.show();
    });
  }

  // Lightbox Modal trigger
  if (lightboxEl) {
    const lightboxModal = new bootstrap.Modal(lightboxEl);
    const lightboxImg = document.getElementById("lightbox-img");

    // Setup click listeners for all design images
    const setupClickListeners = () => {
      const images = document.querySelectorAll(".mydesign-card img, .mydesign-modal-img-container img");
      images.forEach(img => {
        img.addEventListener("click", () => {
          if (lightboxImg) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
          }
          lightboxModal.show();
        });
      });
    };

    setupClickListeners();
  }
}
