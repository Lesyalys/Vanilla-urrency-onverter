import App from "./class/App.js";

async function main() {
  const app = new App(document.getElementById("app"));
  window.app = app;
  return app.render();
}
main();
