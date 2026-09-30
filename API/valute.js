const PATH = "https://www.cbr-xml-daily.ru/daily_json.js";

export default async function valute() {
  const response = await fetch(PATH);
  const data = await response.json();
  return JSON.parse(JSON.stringify(data));
}
