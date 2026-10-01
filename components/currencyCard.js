// components/currencyCard.js
export default function currencyCard({ field, currency, value, active, api }) {
  return `
    <div class="card ${active ? "card--active" : "card--result"}">
      <div class="card__head" data-action="open-list" data-field="${field}">
        <div>
          <div class="card__code">${currency.code}</div>
          <div class="card__name">${currency.name}</div>
        </div>
        <div class="card__chevron">›</div>
      </div>
      <div class="card__value">
        <span>${value}</span>
        <span class="card__symbol">${currency.symbol}</span>
      </div>
    </div>
  `;
}
