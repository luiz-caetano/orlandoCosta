document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      document.querySelector(".mobile-overlay")?.classList.remove("active");
    });
  });

  // Mobile menu toggle
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-overlay");
  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      overlay.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  // Parallax Hero
  window.addEventListener("scroll", () => {
    const heroImage = document.querySelector(".hero-image");
    if (heroImage && window.innerWidth > 768) {
      heroImage.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });

  // Animations on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".product-card,.youtube-text,.about-text").forEach(el => observer.observe(el));
});
