const state = getState();
let CURRENCIES = null;

const fromCode = document.getElementById("fromCode");
const fromName = document.getElementById("fromName");
const fromValue = document.getElementById("fromValue");
const toCode = document.getElementById("toCode");
const toName = document.getElementById("toName");
const toValue = document.getElementById("toValue");

function convert() {
  const amount = parseFloat(state.input.replace(",", ".")) || 0;
  const inRub = amount * CURRENCIES[state.from].rate;
  return inRub / CURRENCIES[state.to].rate;
}

function fmt(num) {
  return (Math.round(num * 100) / 100).toString().replace(".", ",");
}

function render() {
  if (!CURRENCIES) return;

  const f = CURRENCIES[state.from];
  const t = CURRENCIES[state.to];

  fromCode.textContent = state.from;
  fromName.textContent = f.name;
  fromValue.textContent = state.input + " " + f.symbol;

  toCode.textContent = state.to;
  toName.textContent = t.name;
  toValue.textContent = fmt(convert()) + " " + t.symbol;
}

document.querySelectorAll("[data-open]").forEach((el) => {
  el.addEventListener("click", () => {
    sessionStorage.setItem("editingField", el.dataset.open);
    location.href = "select.html";
  });
});

document.getElementById("keyboard").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-key]");
  if (!btn) return;

  const key = btn.dataset.key;

  if (key === "clear") {
    state.input = "0";
  } else if (key === "backspace") {
    state.input = state.input.slice(0, -1) || "0";
  } else if (key === ",") {
    if (!state.input.includes(",")) state.input += ",";
  } else {
    state.input = state.input === "0" ? key : state.input + key;
  }

  setState({ input: state.input });
  render();
});

loadRates().then((data) => {
  CURRENCIES = data;

  if (!CURRENCIES[state.from]) state.from = "USD";
  if (!CURRENCIES[state.to]) state.to = "RUB";

  render();
});
