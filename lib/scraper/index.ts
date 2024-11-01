import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCategory, extractCurrency, extractDescription, extractPrice, extractRating } from "../utils";

export async function scrapeAmazonProduct(url: string){
  if(!url){
    return;
  }

  //BrightData proxy config

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'https://api.brightdata.com/request',
    port,
    rejectUnauthorized: false,
  }

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);


    const title = $('#productTitle').text().trim();
  
    const currentWholePrice = $('.a-price .a-price-whole').first().text().trim();
    const currentFractionPrice = $('.a-price .a-price-fraction').first().text().trim();

    const currentPrice = extractPrice(`${currentWholePrice}${currentFractionPrice}`);

    const originalPrice = extractPrice(
      $('.a-size-small aok-offscreen').text().trim(),
      $('#priceblock_ourprice').text().trim(),
      $('.a-price.a-text-price span.a-offscreen').first().text().trim(),
      $('#listPrice').text().trim(),
      $('#priceblock_dealprice').text().trim(),
      $('.a-size-base.a-color-price').first().text().trim()  
    );

    const isOutOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'));

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    const description = extractDescription($);

    const category = extractCategory($); 

    const reviewsCount = extractPrice($("#acrCustomerReviewText").text().trim());
    
    const stars = extractRating($); 

    const recommend = extractPrice($(".a-size-small social-proofing-faceout-title-text").text().trim());

    // Construct the data object
    const data = {
      url,
      currency: currency || '€',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category,
      reviewsCount,
      stars,
      recommend,
      isOutOfStock: isOutOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averegePrice: Number(currentPrice) || Number(originalPrice)
    }

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape the product: ${error.message}`);
  }
}
