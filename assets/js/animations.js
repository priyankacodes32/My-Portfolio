/**
 * Animations Controller
 * Triggers intersection observer animations and scroll reactions.
 */

document.addEventListener("componentsLoaded", () => {
  initScrollAnimations();
});

function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if (!revealElements.length) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}
