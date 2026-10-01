import Home from "../pages/home.js";
import listSelectCurrency from "../pages/listSelectCurrency.js";
import getCurrency from "../API/currency.js";

const routes = {
  Home: Home,
  ListSelectCurrency: listSelectCurrency,
};

export default class App {
  constructor(root) {
    this.root = root;

    this.state = {
      page: "Home",
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: 1,
      curencies: async () => await getCurrency(),
    };

    this.setState = this.setState.bind(this);
    this.render = this.render.bind(this);
    this.navigate = this.navigate.bind(this);

    this.root.addEventListener("click", this.handleClick.bind(this));
    this.root.addEventListener("input", this.handleInput.bind(this));
    this.root.addEventListener("change", this.handleChange.bind(this));
  }

  setState(path) {
    this.state = { ...this.state, ...path };
    this.render();
  }

  navigate(page) {
    this.setState({ page });
  }

  render() {
    const PageComponent = routes[this.state.page];
    if (!PageComponent) {
      this.root.innerHTML = `<h1>404</h1>`;
      return;
    }
    this.root.innerHTML = PageComponent(this.state, {
      navigate: this.navigate,
      setState: this.setState,
    });
  }

  handleClick(e) {
    const target = e.target.closest("[data-action]");
    if (!target) return;

    const { action, page, field } = target.dataset;

    switch (action) {
      case "navigate":
        this.navigate(page);
        break;
      case "open-list":
        this.navigate("listSelectCurrency");
        // запоминаем какое поле меняем
        this.setState({ editingField: field });
        break;
      case "select-currency": {
        const { value } = target.dataset;
        const field = this.state.editingField;
        this.setState({
          [field]: value,
          page: "home",
          editingField: null,
        });
        break;
      }
    }
  }

  handleInput(e) {
    const el = e.target.closest("[data-field]");
    if (!el) return;
    const field = el.dataset.field;
    this.setState({ [field]: el.value });
  }

  handleChange(e) {
    const el = e.target.closest("[data-field]");
    if (!el) return;
    this.setState({ [el.dataset.field]: el.value });
  }
}
