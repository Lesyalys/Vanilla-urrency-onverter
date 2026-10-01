export default function listCurrency(data) {
  //   const currency = await getCurrency();
  //   const dataValute = currency.Valute;
  //   const list = Object.values(dataValute);

  //   console.log(list);

  //   app.innerHTML = `
  //   <div>${searchCurrency()}</div>
  //   <ul>
  //   ${list
  //     .map((e) => {
  //       return `${listCurrency(e)}`;
  //     })
  //     .join(" ")}
  //     </ul>
  //     `;
  //   list.forEach((e) => console.log(e));
  return `
    <li class="currency-${data.CharCode}">
      <button>
      ${data.CharCode} - ${data.Name}
      </button>
    </li>
  `;
}
