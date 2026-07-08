/**
 * Component Loader
 * Dynamically fetches and inserts HTML components into the page skeleton.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const components = [
    { id: "navbar-placeholder", file: "components/navbar.html" },
    { id: "hero-placeholder", file: "components/hero.html" },
    { id: "about-placeholder", file: "components/about.html" },
    { id: "skills-placeholder", file: "components/skills.html" },
    { id: "projects-placeholder", file: "components/projects.html" },
    { id: "mydesigns-placeholder", file: "components/mydesigns.html" },
    { id: "process-placeholder", file: "components/process.html" },
    { id: "webdev-placeholder", file: "components/webdev.html" },
    { id: "contact-placeholder", file: "components/contact.html" },
    { id: "footer-placeholder", file: "components/footer.html" }
  ];

  const loadPromises = components.map(async (comp) => {
    const element = document.getElementById(comp.id);
    if (!element) {
      console.warn(`Element with ID '${comp.id}' not found in index.html.`);
      return;
    }
    
    try {
      const response = await fetch(comp.file);
      if (response.ok) {
        element.innerHTML = await response.text();
      } else {
        console.error(`Failed to load component: ${comp.file} (Status: ${response.status})`);
        element.innerHTML = `
          <div class="container text-center py-5">
            <p class="text-danger">Failed to load section: ${comp.file}</p>
          </div>
        `;
      }
    } catch (error) {
      console.error(`Error loading component from ${comp.file}:`, error);
      element.innerHTML = `
        <div class="container text-center py-5">
          <p class="text-danger">Error loading section: ${comp.file}</p>
        </div>
      `;
    }
  });

  // Wait for all HTML components to load
  await Promise.all(loadPromises);

  // Dispatch custom event to notify app.js and animations.js
  document.dispatchEvent(new CustomEvent("componentsLoaded"));
});
