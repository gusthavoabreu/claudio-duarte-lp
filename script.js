/* =========================================================
   NOITE EDITORIAL — interações
   ========================================================= */

(() => {
  // === Ano no footer ===
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === Reveal on scroll com IntersectionObserver ===
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || "0", 10);
            setTimeout(() => el.classList.add("is-in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // === Countdown ===
  // Troque a data abaixo pela data real do evento.
  // Formato: "YYYY-MM-DDTHH:MM:SS-03:00" (Brasília -3)
  const EVENT_DATE = new Date("2026-07-06T19:30:00-03:00");

  const cdRoot = document.getElementById("countdown");
  if (cdRoot) {
    const cells = {
      days: cdRoot.querySelector('[data-cd="days"]'),
      hours: cdRoot.querySelector('[data-cd="hours"]'),
      mins: cdRoot.querySelector('[data-cd="mins"]'),
      secs: cdRoot.querySelector('[data-cd="secs"]'),
    };
    const previous = { days: "", hours: "", mins: "", secs: "" };

    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

    const tick = () => {
      const now = new Date();
      const diff = EVENT_DATE - now;
      if (diff <= 0) {
        cells.days.textContent = "00";
        cells.hours.textContent = "00";
        cells.mins.textContent = "00";
        cells.secs.textContent = "00";
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const next = {
        days: pad(days),
        hours: pad(hours),
        mins: pad(mins),
        secs: pad(secs),
      };

      Object.keys(next).forEach((k) => {
        if (next[k] !== previous[k]) {
          const cell = cells[k];
          if (!cell) return;
          cell.classList.add("tick");
          cell.textContent = next[k];
          setTimeout(() => cell.classList.remove("tick"), 280);
          previous[k] = next[k];
        }
      });
    };

    tick();
    setInterval(tick, 1000);
  }

  // === Sticky CTA visibilidade (mostra após o hero em mobile) ===
  const sticky = document.querySelector(".sticky-cta");
  if (sticky) {
    const heroEl = document.querySelector(".hero");
    if (heroEl && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sticky.style.opacity = entry.isIntersecting ? "0" : "1";
            sticky.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
            sticky.style.transition = "opacity .35s ease";
          });
        },
        { threshold: 0.15 }
      );
      obs.observe(heroEl);
    }
  }
})();
