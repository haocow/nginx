export const getCurrency = (c: string | number) => {
  return Number(renderCurrency(c));
}

export const renderCurrency = (val: string | number) => {
  return Number(val).toFixed(2);
}
