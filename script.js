gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ overwrite: "auto" });

if (window.innerWidth < 768) {
  const video = document.querySelector(".hero video");
  if (video) video.remove();
}

gsap.from(".hero-text h1", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".hero-text p", {
  y: 20,
  opacity: 0,
  duration: 0.6,
  delay: 0.2,
  ease: "power3.out"
});

gsap.from(".featured img", {
  scrollTrigger: {
    trigger: ".featured",
    start: "top 80%",
  },
  opacity: 0,
  y: 20,
  stagger: 0.15
});

const panels = gsap.utils.toArray(".panel");

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal",
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => "+=" + document.querySelector(".horizontal").offsetWidth
  }
});

panels.forEach(panel => {
  const caption = panel.querySelector(".caption");
  gsap.to(caption, {
    opacity: 1,
    scrollTrigger: {
      trigger: panel,
      start: "center center",
      end: "center center",
      toggleActions: "play reverse play reverse"
    }
  });
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  ScrollTrigger.getAll().forEach(t => t.disable());
}
