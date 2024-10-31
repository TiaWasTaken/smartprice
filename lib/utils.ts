import { PriceHistoryItem } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

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

export function extractDescription($: any) {
  const selectors = [
    ".a-list-item"
  ];

  const unwantedPhrases = [
    "resi e ordini",
    "Spedisci il reso", 
    "Flash Player", 
    "stella",
    "Ordina le recensioni",
    "Seleziona il metodo di restituzione",
    "restituzione",
  ];

  const bannedClass = "a-unordered-list a-horizontal a-size-small";

  for (const selector of selectors) {
    const elements = $(selector).not(`.${bannedClass.replace(/ /g, ".")}`); // Exclude elements with banned class
    if (elements.length > 0) {
      let textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .filter((text: string) => 
          !unwantedPhrases.some(phrase => text.includes(phrase))
        )
        .join("\n");

      const startIndex = textContent.indexOf("I nostri prodotti"); // Example starting phrase for the product description
      if (startIndex > 0) {
        textContent = textContent.slice(startIndex); // Remove text before the actual description
      }

      return textContent.trim();
    }
  }

  return "Description not found or unable to retrieve description text.";
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export function extractCategory($: any) {
  const categorySelector = ".a-unordered-list.a-horizontal.a-size-small";

  // Select elements matching the category class
  const elements = $(categorySelector);

  if (elements.length > 0) {
    // Join the text content from all elements within this class
    const categoryText = elements
      .map((_: any, element: any) => $(element).text().trim())
      .get()
      .join(" > "); // Join with ' > ' to reflect breadcrumb style

    return categoryText;
  }

  return "Category not found or unable to retrieve category text.";
}

export function extractRating($: any) {
  const selectors = [
    ".a-size-base.a-color-base", // Original selector
    ".a-icon-alt",               // Amazon often uses this class for star ratings
    ".review-rating",            // Sometimes ratings have this general class
  ];

  for (const selector of selectors) {
    const elements = $(selector);

    if (elements.length > 0) {
      // Attempt to find a rating value that is a number
      const ratingText = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .find((text: string) => /^\d+(\.\d+)?/.test(text)); // Look for numeric value like '4.2'

      if (ratingText) {
        return ratingText;
      }
    }
  }

  return "Rating not found or unable to retrieve rating text.";
}

