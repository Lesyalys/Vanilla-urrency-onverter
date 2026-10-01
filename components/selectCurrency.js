// components/selectCurrency.js
export default function selectCurrency(field, value, api) {
  return `
    <button
      data-action="open-list"
      data-field="${field}"
    >
      ${value}
    </button>
  `;
}
