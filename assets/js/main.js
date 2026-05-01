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
  var infoButton = document.querySelector(".hero-info");
  var infoPopup = document.querySelector(".hero-info-popup");
  var heroData = document.getElementById("hero-images-data");
  var sessionKey = "hero-image-index";

  if (hero && switchButton && heroData) {
    var heroItems = [];

    try {
      heroItems = JSON.parse(heroData.textContent || "[]");
    } catch (error) {
      heroItems = [];
    }

    if (!Array.isArray(heroItems) || heroItems.length === 0) {
      var fallbackImage = hero.getAttribute("data-default-hero");
      heroItems = fallbackImage ? [{ image: fallbackImage, info: "" }] : [];
    }

    heroItems = heroItems
      .map(function (item) {
        if (typeof item === "string") {
          return { image: item, info: "" };
        }

        return {
          image: item && (item.image || item.url || item.src) ? item.image || item.url || item.src : "",
          info: item && item.info ? item.info : ""
        };
      })
      .filter(function (item) {
        return item.image;
      });

    if (heroItems.length === 0) {
      switchButton.hidden = true;
      return;
    }

    var currentIndex = Number.parseInt(window.sessionStorage.getItem(sessionKey), 10);

    if (!Number.isInteger(currentIndex) || currentIndex < 0 || currentIndex >= heroItems.length) {
      currentIndex = Math.floor(Math.random() * heroItems.length);
      window.sessionStorage.setItem(sessionKey, String(currentIndex));
    }

    function hideHeroInfo() {
      if (!infoButton || !infoPopup) {
        return;
      }

      infoPopup.hidden = true;
      infoButton.setAttribute("aria-expanded", "false");
    }

    function showHeroInfo(event) {
      if (!infoButton || !infoPopup || !infoPopup.textContent.trim()) {
        return;
      }

      infoPopup.hidden = false;
      infoButton.setAttribute("aria-expanded", "true");

      if (event && typeof event.clientX === "number") {
        positionHeroInfo(event);
      } else {
        positionHeroInfoByButton();
      }
    }

    function positionHeroInfoByButton() {
      if (!infoButton || !infoPopup || infoPopup.hidden) {
        return;
      }

      var offset = 12;
      var buttonRect = infoButton.getBoundingClientRect();
      var popupRect = infoPopup.getBoundingClientRect();
      var x = buttonRect.right - popupRect.width;
      var y = buttonRect.top - popupRect.height - offset;

      if (y < offset) {
        y = buttonRect.bottom + offset;
      }

      infoPopup.style.left = Math.max(offset, x) + "px";
      infoPopup.style.top = Math.max(offset, y) + "px";
    }

    function positionHeroInfo(event) {
      if (!infoPopup || infoPopup.hidden || !event || typeof event.clientX !== "number") {
        return;
      }

      var offset = 14;
      var popupRect = infoPopup.getBoundingClientRect();
      var x = event.clientX + offset;
      var y = event.clientY + offset;

      if (x + popupRect.width > window.innerWidth - offset) {
        x = event.clientX - popupRect.width - offset;
      }

      if (y + popupRect.height > window.innerHeight - offset) {
        y = event.clientY - popupRect.height - offset;
      }

      infoPopup.style.left = Math.max(offset, x) + "px";
      infoPopup.style.top = Math.max(offset, y) + "px";
    }

    function toggleHeroInfo(event) {
      if (!infoPopup || infoPopup.hidden) {
        showHeroInfo(event);
      } else {
        hideHeroInfo();
      }
    }

    function updateHeroInfo(item) {
      if (!infoButton || !infoPopup) {
        return;
      }

      hideHeroInfo();
      infoPopup.textContent = item.info || "";
      infoButton.hidden = !item.info;
    }

    function applyHeroImage(index) {
      var item = heroItems[index];

      hero.style.setProperty("--hero-image", 'url("' + item.image + '")');
      updateHeroInfo(item);
    }

    applyHeroImage(currentIndex);

    if (infoButton && infoPopup) {
      infoButton.addEventListener("mouseenter", showHeroInfo);
      infoButton.addEventListener("mousemove", positionHeroInfo);
      infoButton.addEventListener("mouseleave", hideHeroInfo);
      infoButton.addEventListener("focus", showHeroInfo);
      infoButton.addEventListener("blur", hideHeroInfo);
      infoButton.addEventListener("touchstart", function (event) {
        event.preventDefault();
        var touch = event.changedTouches && event.changedTouches[0];
        toggleHeroInfo(touch || event);
      });
      infoButton.addEventListener("click", toggleHeroInfo);

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          hideHeroInfo();
        }
      });
    }

    if (heroItems.length <= 1) {
      switchButton.disabled = true;
      return;
    }

    switchButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % heroItems.length;
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
