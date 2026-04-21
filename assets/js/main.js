document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var hero = document.querySelector(".hero-home");
  var switchButton = document.querySelector(".hero-switch");
  var heroData = document.getElementById("hero-images-data");
  var sessionKey = "hero-image-index";

  if (hero && switchButton && heroData) {
    var images = [];

    try {
      images = JSON.parse(heroData.textContent || "[]");
    } catch (error) {
      images = [];
    }

    if (!Array.isArray(images) || images.length === 0) {
      var fallbackImage = hero.getAttribute("data-default-hero");
      images = fallbackImage ? [fallbackImage] : [];
    }

    if (images.length === 0) {
      switchButton.hidden = true;
      return;
    }

    var currentIndex = Number.parseInt(window.sessionStorage.getItem(sessionKey), 10);

    if (!Number.isInteger(currentIndex) || currentIndex < 0 || currentIndex >= images.length) {
      currentIndex = Math.floor(Math.random() * images.length);
      window.sessionStorage.setItem(sessionKey, String(currentIndex));
    }

    function applyHeroImage(index) {
      hero.style.setProperty("--hero-image", 'url("' + images[index] + '")');
    }

    applyHeroImage(currentIndex);

    if (images.length <= 1) {
      switchButton.disabled = true;
      return;
    }

    switchButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % images.length;
      window.sessionStorage.setItem(sessionKey, String(currentIndex));
      applyHeroImage(currentIndex);
    });
  }

  var newsButton = document.querySelector(".recent-news__switch");
  var newsData = document.getElementById("recent-news-data");
  var newsEmbed = document.querySelector(".recent-news__embed");
  var newsProvider = document.querySelector(".recent-news__provider");
  var newsLink = document.querySelector(".recent-news__link");

  if (newsButton && newsData && newsEmbed && newsProvider && newsLink) {
    var newsItems = [];
    var newsIndex = 0;

    try {
      newsItems = JSON.parse(newsData.textContent || "[]");
    } catch (error) {
      newsItems = [];
    }

    if (!Array.isArray(newsItems) || newsItems.length === 0) {
      newsButton.hidden = true;
      return;
    }

    function renderNewsItem(item) {
      newsEmbed.src = item.embed_url || item.url || "";
      newsEmbed.title = item.title || item.provider || "Recent news item";
      newsProvider.textContent = item.provider || "Update";
      newsLink.href = item.url || item.embed_url || "#";
    }

    renderNewsItem(newsItems[0]);

    if (newsItems.length <= 1) {
      newsButton.disabled = true;
      return;
    }

    newsButton.addEventListener("click", function () {
      newsIndex = (newsIndex + 1) % newsItems.length;
      renderNewsItem(newsItems[newsIndex]);
    });
  }
});
