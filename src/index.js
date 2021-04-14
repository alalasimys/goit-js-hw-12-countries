import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';

import { error } from '@pnotify/core';

import countryCardTpl from './templates/countryCardTpl.hbs';
import countryListTpl from './templates/countryListTpl.hbs';
import API from './js/fetchCountries';

// defaultModules.set(PNotifyMobile, {});

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
          return renderCountryCards(country);
        }
        if (country.length >= 2 && country.length <= 10) {
          return renderCountryList(country);
        }
        if (country.length > 10) {
          error({
            title: 'Uh Oh!',
            text:
              "Something really terrible happened. You really need to read this, so I won't close automatically.",
          });
        }
      })
      .catch(console.log)
      .finally(() => (inputValue = ''));
  }
}

// console.dir(inputRef);

function renderCountryCards(country) {
  const markup = countryCardTpl(...country);
  //console.log(markup);
  cardContainerRef.innerHTML = markup;
}

function renderCountryList(country) {
  let markup = countryListTpl(country);

  // console.log(markup);
  cardContainerRef.innerHTML = markup;
}
