export const toDecimal = (str: string | number) => {
  const isPercentage = (typeof str === "string") ? str.slice(-1) === '%' : false;

  return isPercentage ?
    Number((str as string).slice(0, -1)) / 100 :
    Number(str);
}

export const toPercentageStr = (str: string) => {
  const isPercentage = str.slice(-1) === '%';

  return isPercentage ?
    str :
    (Number(str)*100).toFixed(2) + '%'
}

export const parsePercentage = (str: string) => {
  return Number(str.slice(-1) === '%' ? str.slice(0, -1) : str);
}

export const renderPercentage = (val: string | number) => {
  const dec = toDecimal(val);

  return Number(dec*100).toFixed(2) + '%';
}
