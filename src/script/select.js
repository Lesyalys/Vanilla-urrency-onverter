const list = document.getElementById("list");
const searchInput = document.getElementById("search");
const searchClear = document.getElementById("searchClear");
const backBtn = document.querySelector('[data-action="back"]');

const editingField = sessionStorage.getItem("editingField") || "from";
const selectedFrom = localStorage.getItem("from") || "USD";
const selectedTo = localStorage.getItem("to") || "RUB";

/**
 * Валюты
 */
let ALL = {};

/**
 * Отрисовка списка валют по поиску
 * @param {string} filter — вводимое значение в поиске
 * @returns {void}
 */
function renderList(filter = "") {
  const q = filter.trim().toLowerCase();

  const entries = Object.entries(ALL)
    .filter(([code, c]) => {
      if (!q) return true;
      return code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    })
    .sort(([a], [b]) => {
      if (a === "RUB") return -1;
      if (b === "RUB") return 1;
      return a.localeCompare(b);
    });

  if (entries.length === 0) {
    list.innerHTML = `<li class="currency-empty">Ничего не найдено</li>`;
    return;
  }

  list.innerHTML = entries
    .map(([code, c]) => {
      const checked = code === selectedFrom || code === selectedTo;
      return `
        <li class="currency-item" data-code="${code}">
          <div class="currency-item__text">
            <div class="currency-item__code">${code}</div>
            <div class="currency-item__name">${c.name}</div>
          </div>
          ${checked ? `<span class="currency-item__check">✓</span>` : ""}
        </li>
      `;
    })
    .join("");
}

//должна работать после каждого изменения поля ввода change?
searchInput.addEventListener("input", () => {
  const value = searchInput.value;
  renderList(value);
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.hidden = true;
  renderList();
  searchInput.focus();
});

backBtn.addEventListener("click", () => {
  sessionStorage.removeItem("editingField");
  location.href = "home.html";
});

loadRates().then((CURRENCIES) => {
  ALL = CURRENCIES;
  renderList();

  list.addEventListener("click", (e) => {
    const item = e.target.closest("[data-code]");
    if (!item) return;

    const code = item.dataset.code;
    const other = editingField === "from" ? "to" : "from";

    //replace currency
    if (localStorage.getItem(other) === code) {
      localStorage.setItem(other, localStorage.getItem(editingField));
    }

    localStorage.setItem(editingField, code);
    sessionStorage.removeItem("editingField");
    location.href = "home.html";
  });
});
