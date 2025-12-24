const API_URL = 'https://dummyjson.com/quotes/random';
const QUOTE_CACHE = 'quotes-cache-v1';

let quoteTextElem;
let quoteAuthorElem;
let newQuoteBtn;

export function SetupQuoteFetching() {
  quoteTextElem = document.getElementById('quote-text');
  quoteAuthorElem = document.getElementById('quote-author');
  newQuoteBtn = document.getElementById('btn');

  newQuoteBtn.addEventListener('click', FetchAndDisplayQuote);
}

async function FetchAndDisplayQuote() {
  try {
    const data = await FetchQuoteFromAPI();
    DisplayQuote(data.quote, data.author);
    await SaveCacheQuote(data);
  } catch {
    const cached = await GetCachedQuote();
    if (cached) {
      DisplayQuote(cached.quote, cached.author);
    } else {
      DisplayQuote("BRAK CYTATU", "OFFLINE");
    }
  }
}

async function FetchQuoteFromAPI() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("API error");
  return await response.json();
}

async function SaveCacheQuote(data) {
  const cache = await caches.open(QUOTE_CACHE);
  await cache.put('/last-quote', new Response(JSON.stringify(data)));
}

async function GetCachedQuote() {
  const cache = await caches.open(QUOTE_CACHE);
  const cached = await cache.match('/last-quote');
  return cached ? await cached.json() : null;
}

function DisplayQuote(quote, author) {
  quoteTextElem.textContent = quote;
  quoteAuthorElem.textContent = author;
}