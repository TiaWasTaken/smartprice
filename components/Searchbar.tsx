"use client"

import { FormEvent, useState } from 'react'
import { scrapeAndStoreProduct } from '../lib/actions/index.ts'

const isValidAmazonProductURL = (url: string) => {
  // Boolean output
  try {
    const parsedURL = new URL(url);
    const hostName = parsedURL.hostname;

    // Check if hostname contains amazon.com
    if(hostName.includes('amazon.com') || hostName.includes('amazon.') || hostName.endsWith('amazon')){
      return true;      
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

const Searchbar = () => {
 
  const [searchPrompt, setSearchPrompt] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Do not reload the page

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if(!isValidLink){
      return alert('Please provide a valid amazon link');
    }

    try {
      setIsLoading(true);

      // Scrape the first product

      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input type="text" value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} className="searchbar-input" placeholder="Enter Amazon Product Link"/>            
      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>{isLoading ? 'Searching...' : 'Search'}</button>
    </form>
  )
}

export default Searchbar
