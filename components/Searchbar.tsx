"use client";

import React, { FormEvent, useState } from 'react';

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if hostname contains amazon.com or amazon.it...
    if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if(!isValidLink){
      return alert('Please provide a valid Amazon Link.');
    }

    try {
      setIsLoading(true);

      // Scrape our first product

    } catch(err){
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Amazon Product Link"
        className="searchbar-input"
      />
      <button type="submit" disabled={searchPrompt === ''} className="searchbar-btn">{isLoading ? 'Searching...' : 'Search'}</button>
    </form>
  );
};

export default Searchbar;

