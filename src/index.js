import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const inputCountries = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// console.log(inputCountries);
//  1:01 інтерфейс в окремій функції

// const DEBOUNCE_DELAY = 300;

// const debounced = debounce(() => {
//   console.log('delayed');
// }, DEBOUNCE_DELAY);

inputCountries.addEventListener('input', fetchCountries);
console.log(inputCountries.value);

//   .then(renderSingleCountry)
//   .catch(error => console.log(error));

function makingSingleCountry(countries) {
  const markupCountryCard = countries.map(
    ({ flags, name, capital, population, languages }) => {
      return `<div class="country-div"><img src=${flags.svg} alt = ${
        flags.alt
      } width = 50/><h2 class="country-singl-name">${
        name.common
      }</h2></div><ul><li class="country-property"><span>Capital:</span> ${capital}</li><li class="country-property"><span>Population:</span> ${population}</li><li class="country-property"> <span>Languages:</span> ${Object.values(
        languages
      )}</li></ul>`;
    }
  );
  console.log(markupCountryCard);
}

function makingCountriesList(countries) {}

function renderCountryToHtml(countries) {}
