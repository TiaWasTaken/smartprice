export function extractPrice(...priceTexts: string[]) {
  for (const priceText of priceTexts) {
    if (priceText) {
      return priceText.replace(/[^0-9.]/g, '');
    }
  }
  return '';
}

export function extractCurrency(element: any){
  const currencyText = element.text().trim().slice(0, 1);

  return currencyText ? currencyText : '';
}
