const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll(".sidebar, .section, .experience-row, .project-row")
  .forEach((element, index) => {
    element.style.transitionDelay = `${index * 90}ms`;
    observer.observe(element);
  });

const sectionLinks = Array.from(document.querySelectorAll(".quick-link"));
const trackedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = (id) => {
  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const updateActiveSection = () => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

  if (scrolledToBottom && trackedSections.length > 0) {
    setActiveLink(trackedSections[trackedSections.length - 1].id);
    return;
  }

  const offset = window.innerHeight * 0.22;
  let currentSection = trackedSections[0];

  trackedSections.forEach((section) => {
    if (section.getBoundingClientRect().top - offset <= 0) {
      currentSection = section;
    }
  });

  if (currentSection) {
    setActiveLink(currentSection.id);
  }
};

if (trackedSections[0]) {
  setActiveLink(trackedSections[0].id);
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);

updateActiveSection();

const langButtons = Array.from(document.querySelectorAll(".lang-button"));

const setLanguage = (lang) => {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-lang]").forEach((element) => {
    element.hidden = element.getAttribute("data-lang") !== lang;
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.targetLang === lang);
  });
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.targetLang);
  });
});

setLanguage("en");
