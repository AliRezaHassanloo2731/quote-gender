'use strict';
//API:'https://jacintodesign.github.io/quotes-api/data/quotes.json'

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-qoute');
const loader = document.getElementById('loader');

let apiQuotes = [];

/* show loading */
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show new quote
function newQuote() {
  loading();
  const randomNumber = Math.floor(Math.random() * apiQuotes.length);

  const quote = apiQuotes[randomNumber];
  //pick a random quote from apiQuotes array
  !quote.author ? 'Unknown' : (authorText.textContent = quote.author);

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  //set Quote, hide loder
  quoteText.textContent = quote.text;
  complete();
}

//get qout from API
async function getQuote() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    //geting data from api
    const response = await fetch(apiUrl);

    //changing response to the json
    apiQuotes = await response.json();

    //we want to use random quote
    newQuote();
  } catch (err) {
    //Catch Error Here
  }
}

//on load
getQuote();
//////////
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
/////////////
newQuoteBtn.addEventListener('click', newQuote);
