import axios from 'axios';
import * as cheerio from 'cheerio';
import process from 'node:process';



export async function scrapeAmazonProduct(url: string) {
 if(!url){
    return;
  } 

// curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_08dcdbb7-zone-smartprice:tvream542u1l -k "https://geo.brdtest.com/mygeo.json"

  //Brightdata proxy config
  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)
  const port= 22225;
  const session_id= (1000000 * Math.random()) | 0;
  
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    // Fetch the amazon product page
    const response = await axios.get(url, options);
    console.log(response.data)

    
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
}
