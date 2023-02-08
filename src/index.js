import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import './css/styles.css';

// import { fetchCountries } from './fetchCountries'; // -----------заімпортити з файлу і прибрати ф-цію нижче

const inputCountries = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// console.log(inputCountries);
//  1:01 інтерфейс в окремій функції

inputCountries.addEventListener('input', debounce(fetchCountries, 300));
console.log(inputCountries.value);
// Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується,
// а розмітка списку країн або інформації про країну зникає.

function fetchCountries(name) {
  // прибрати цю ф-цію і заімпортити з іншого файлу---------------------------------------------
  if (inputCountries.value.trim() === '') {
    return;
  }
  countryName = name.target.value.trim();

  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=,name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(country => console.log(country)); //сюда прикрутить функцию для рендера на страницу
}
// Якщо у відповіді бекенд повернув більше ніж 10 країн, в інтерфейсі з'являється
// повідомлення про те, що назва повинна бути специфічнішою. Для повідомлень використовуй
// бібліотеку notiflix і виводь такий рядок "Too many matches found. Please enter a more specific name."

// Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
// Кожен елемент списку складається з прапора та назви країни.

console.log(fetchCountries());

// Якщо результат запиту - це масив з однією країною, в інтерфейсі відображається розмітка
// картки з даними про країну: прапор, назва, столиця, населення і мови.
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

// Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив,
// а помилку зі статус кодом 404 - не знайдено. Якщо це не обробити, то користувач
// ніколи не дізнається про те, що пошук не дав результатів. Додай повідомлення
// "Oops, there is no country with that name" у разі помилки, використовуючи бібліотеку notiflix.
// Не забувай про те, що fetch не вважає 404 помилкою, тому необхідно явно відхилити
// проміс, щоб можна було зловити і обробити помилку.

function makingCountriesList(countries) {}

function renderCountryToHtml(countries) {}
