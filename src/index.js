import './styles.css';
import countryCardTpl from './templates/countryCardTpl.hbs';
import API from './js/fetchCountries';

const debounce = require('lodash.debounce');
const inputRef = document.querySelector('.country-input');

// console.log(
//   fetch('https://restcountries.eu/rest/v2/name/united').then(r => r.json()),
// );

inputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  console.log(event.target.value);
}
