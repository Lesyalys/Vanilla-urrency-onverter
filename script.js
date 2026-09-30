import valute from "./API/valute.js";
import selectValute from "./components/selectValute.js";

async function main() {
  const app = document.getElementById("app");

  const valutes = await valute();
  const dataValute = valutes.Valute;
  const list = Object.values(dataValute);

  console.log(list);

  app.innerHTML = `
    ${list
      .map((e) => {
        return `${selectValute(e)}`;
      })
      .join(" ")}
    `;
  //   list.forEach((e) => console.log(e));
}
main();
