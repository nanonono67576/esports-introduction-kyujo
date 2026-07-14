const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const counters = document.querySelectorAll("[data-count]");
const reveals = document.querySelectorAll(".reveal");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabTitle = document.querySelector("[data-tab-title]");
const tabText = document.querySelector("[data-tab-text]");

const boothContent = {
  movie: {
    title: "3分でわかる活動紹介",
    text:
      "練習風景、ミーティング、イベント運営の様子を短くまとめたオンライン展示用ムービーです。初めて見る人にも、部の雰囲気と目指している成長が伝わる内容です。",
  },
  talk: {
    title: "部員が語る、チームで伸びる理由",
    text:
      "プレイヤー、分析担当、配信担当が、それぞれの目線で活動の魅力を紹介します。ゲーム経験の差をどう埋めるか、チームで何を学べるかを届けます。",
  },
  trial: {
    title: "オンラインで参加できるミニ体験",
    text:
      "作戦会議のミニワーク、試合シーンの判断クイズ、配信画面づくりの体験を用意。見るだけでなく、参加して雰囲気を感じられる展示です。",
  },
};

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  document.body.classList.toggle("is-locked", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    document.body.classList.remove("is-locked");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = Number(entry.target.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.round(target / 24));
      const tick = () => {
        current = Math.min(target, current + step);
        entry.target.textContent = current;
        if (current < target) {
          requestAnimationFrame(tick);
        }
      };

      tick();
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextContent = boothContent[button.dataset.tab];

    tabButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    tabTitle.textContent = nextContent.title;
    tabText.textContent = nextContent.text;
  });
});
