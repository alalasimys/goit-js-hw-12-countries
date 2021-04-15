import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { error } from '@pnotify/core';
//import { defaults } from '@pnotify/core';

import countryCardTpl from './templates/countryCardTpl.hbs';
import countryListTpl from './templates/countryListTpl.hbs';
import API from './js/fetchCountries';

const debounce = require('lodash.debounce');
const inputRef = document.querySelector('.country-input');
const cardContainerRef = document.querySelector('.js-card-container');

inputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  let inputValue = event.target.value;

  if (inputValue !== '') {
    API.fetchCountries(inputValue)
      .then(country => {
        // console.log(country);
        if (country.length === 1) {
          return renderCountryCard(country);
        }
        if (country.length >= 2 && country.length <= 10) {
          return renderCountryList(country);
        }
        if (country.length > 10) {
          error({
            delay: 4000,
            text: 'Too many matches found. Please enter a more specific query!',
          });
        }
      })
      .catch(console.log)
      .finally(() => (inputValue = ''));
  }
  cardContainerRef.innerHTML = '';
}

// console.dir(inputRef);
function InsertMarkUp(markup) {
  return (cardContainerRef.innerHTML = markup);
}

function renderCountryCard(country) {
  //console.log(markup);
  InsertMarkUp(countryCardTpl(...country));
}

function renderCountryList(country) {
  // console.log(markup);
  InsertMarkUp(countryListTpl(country));
}
