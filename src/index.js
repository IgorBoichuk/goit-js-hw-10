import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import './css/styles.css';

// import { fetchCountries } from './fetchCountries'; // -----------заімпортити з файлу і прибрати ф-цію нижче

const inputCountries = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//  1:01 інтерфейс в окремій функції

inputCountries.addEventListener('input', debounce(fetchCountries, 300));
// Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується,
// а розмітка списку країн або інформації про країну зникає.

function fetchCountries(name) {
  console.log(inputCountries.value.trim());
  // прибрати цю ф-цію і заімпортити з файлу-----fetchCountries.js----------------------------------------
  if (inputCountries.value.trim() === '') {
    countryInfo.innerHTML = '';
  } else countryName = inputCountries.value.trim();

  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=,name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      if (country.length === 1) {
        makingSingleCountry(country);
      } else makingCountriesList(country);
    });
}

// Якщо у відповіді бекенд повернув більше ніж 10 країн, в інтерфейсі з'являється
// повідомлення про те, що назва повинна бути специфічнішою. Для повідомлень використовуй
// бібліотеку notiflix і виводь такий рядок "Too many matches found. Please enter a more specific name."

// Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
// Кожен елемент списку складається з прапора та назви країни.

function makingSingleCountry(country) {
  const markupCountryCard = country.map(
    ({ flags, name, capital, population, languages }) => {
      return `<div class="country-div"><img src=${flags.svg} alt = ${
        flags.alt
      } width = 50/><h2 class="country-singl-name">${
        name.common
      }</h2></div><ul><li class="country-property"><span>Capital:</span> ${capital}</li><li class="country-property"><span>Population:</span> ${population}</li><li class="country-property"> <span>Languages:</span> ${Object.values(
        languages
      )}</li></ul></div>`;
    }
  );
  countryList.innerHTML = '';
  joinHtml = markupCountryCard.join('');
  countryInfo.insertAdjacentHTML('afterbegin', joinHtml);
  // console.log(arrayCountryInfo);
}

function makingCountriesList(country) {
  const markupCountryList = country.map(({ flags, name }) => {
    return `<li class = "country-item">${name.common}</li>`;
  });
  countryInfo.innerHTML = '';

  joinHtml = markupCountryList.join('');
  countryList.insertAdjacentHTML('afterbegin', joinHtml);
}

// Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив,
// а помилку зі статус кодом 404 - не знайдено. Якщо це не обробити, то користувач
// ніколи не дізнається про те, що пошук не дав результатів. Додай повідомлення
// "Oops, there is no country with that name" у разі помилки, використовуючи бібліотеку notiflix.

// Не забувай про те, що fetch не вважає 404 помилкою, тому необхідно явно відхилити
// проміс, щоб можна було зловити і обробити помилку.
