// pages/home.js
import currencyCard from "../components/currencyCard.js";
import keyboard from "../components/keyboard.js";

export default function Home(state, api) {
  const result = api.convert(state);
  return `
    <div class="screen">
      <h1 class="title">Конвертер валют</h1>

      ${currencyCard({
        field: "to",
        currency: state.currencies[state.to],
        value: api.format(result),
        active: false,
        api,
      })}

      ${currencyCard({
        field: "from",
        currency: state.currencies[state.from],
        value: state.input,
        active: true,
        api,
      })}

      ${keyboard()}
    </div>
  `;
}
