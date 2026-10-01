// components/keyboard.js
export default function keyboard() {
  const keys = [
    ["AC", "clear", "key--action"],
    ["⌫", "backspace", "key--action"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["0", "0", "key--zero"],
    [",", ","],
  ];

  return `
    <div class="keyboard">
      ${keys
        .map(
          ([label, value, cls = ""]) => `
        <button class="key ${cls}" data-action="key" data-key="${value}">
          ${label}
        </button>`,
        )
        .join("")}
    </div>
  `;
}
