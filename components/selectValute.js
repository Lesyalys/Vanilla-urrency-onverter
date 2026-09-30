export default function selectValute(data) {
  return `
    <button class="selectValute">
      ${data.CharCode} - ${data.Name}
    </button>
  `;
}
