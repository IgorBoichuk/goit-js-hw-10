// export { fetchCountries };

function fetchCountries(name) {
  if (inputCountries.value === '') {
    return;
  }
  countryName = name.target.value;

  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=,name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(country => console.log(country)); //сюда прикрутить функцию для рендера на страницу
}
console.log(fetchCountries());
