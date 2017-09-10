export const convert = (from, to, oldAmount, strategy) => {
  if ("" === oldAmount) return 0;
  return parseFloat(
    parseFloat(strategy[to]) /
      parseFloat(strategy[from]) *
      parseFloat(oldAmount)
  ).toFixed(2);
};

export const allowOnlyIntOrFloat = (str, pattern) =>
  (str.match("[0-9.]+") || []).pop() || "";
