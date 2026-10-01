const RATES_KEY = "rates";
const PATH = "https://www.cbr-xml-daily.ru/daily_json.js";
const TTL = 60 * 60 * 1000; // 1 час
const SYMBOLS = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  KZT: "₸",
  UAH: "₴",
  TRY: "₺",
  BYN: "Br",
};

async function fetchRates() {
  const response = await fetch(PATH);
  const data = await response.json();

  const result = {
    RUB: { name: "Российский рубль", symbol: "₽", rate: 1 },
  };

  for (const code in data.Valute) {
    const v = data.Valute[code];
    result[code] = {
      name: v.Name,
      symbol: SYMBOLS[code] || code,
      rate: v.Value / v.Nominal,
    };
  }

  return result;
}

/**
 * Возвращает объект с курсами.
 * Если в localStorage есть свежий кэш — берёт из него.
 * Иначе идёт в сеть и обновляет кэш.
 */
async function loadRates() {
  const raw = localStorage.getItem(RATES_KEY);

  if (raw) {
    const cached = JSON.parse(raw);
    const age = Date.now() - cached.timestamp;

    if (age < TTL) {
      console.log("курсы из кэша, возраст:", Math.round(age / 1000), "сек");
      return cached.data;
    }
  }

  console.log("курсы устарели или их нет — идём в сеть");
  const data = await fetchRates();
  localStorage.setItem(
    RATES_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );
  return data;
}
