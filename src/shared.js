function getState() {
  return {
    from: localStorage.getItem("from") || "USD",
    to: localStorage.getItem("to") || "RUB",
    input: localStorage.getItem("input") || "100",
  };
}

function setState(patch) {
  for (const k in patch) localStorage.setItem(k, patch[k]);
}
