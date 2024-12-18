// Global Variables
const apiKey = "fa3bb41a852b4d79939418fba953984d";
const newsContainer = document.getElementById("news-container");
const categorySelector = document.getElementById("category-selector");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const title = document.getElementById("title");
const footerText = document.getElementById("footer-text");

// Language Toggle
const langButtons = document.querySelectorAll(".language-toggle button");

langButtons.forEach(button => {
  button.addEventListener("click", () => {
    langButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const lang = button.id.split("-")[1];
    switchLanguage(lang);
  });
});

function switchLanguage(lang) {
  if (lang === "ar") {
    title.textContent = "تصنيفات الأخبار";
    footerText.textContent = "بدعم من News API";
    categorySelector.innerHTML = `
      <option value="general">🌍 عام</option>
      <option value="business">💼 الأعمال</option>
      <option value="technology">💻 التكنولوجيا</option>
      <option value="sports">⚽ الرياضة</option>
      <option value="health">🩺 الصحة</option>
      <option value="palestine">🇵🇸 فلسطين</option>
    `;
  } else {
    title.textContent = "News Categories";
    footerText.textContent = "Powered by News API";
    categorySelector.innerHTML = `
      <option value="general">🌍 General</option>
      <option value="business">💼 Business</option>
      <option value="technology">💻 Technology</option>
      <option value="sports">⚽ Sports</option>
      <option value="health">🩺 Health</option>
      <option value="palestine">🇵🇸 Palestine</option>
    `;
  }
}

// Fetch News
async function fetchNews(category) {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  displayNews(data.articles);
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach(article => {
    const newsCard = `
      <div class="news-card">
        <img src="${article.urlToImage || 'assets/icons/placeholder.png'}" alt="News Image">
        <div class="news-card-content">
          <h3>${article.title}</h3>
          <p>${article.description || ""}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      </div>
    `;
    newsContainer.innerHTML += newsCard;
  });
}

// Event Listeners
categorySelector.addEventListener("change", () => {
  const category = categorySelector.value;
  fetchNews(category);
});

themeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});

// Initial Load
fetchNews("general");
