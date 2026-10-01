// pages/listSelectCurrency.js
export default function ListSelectCurrency(state, api) {
  const { currencies, editingField } = state;
  return `
    <div>
      <h1>Выберите валюту</h1>
      <ul>
        ${currencies
          .map(
            (c) => `
          <li>
            <button
              data-action="select-currency"
              data-value="${c}"
              data-field="${editingField}"
            >${c}</button>
          </li>`,
          )
          .join("")}
      </ul>
      <button data-action="navigate" data-page="home">Назад</button>
    </div>
  `;
}
