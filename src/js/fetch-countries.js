function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

export default fetchCountries;
