import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import refs from './js/refs';
import fetchCountries from './js/fetch-countries';
import aboutCountry from './templates/about-country.hbs';
import countriesMarkup from './templates/country-list.hbs';
import debounce from 'lodash.debounce';

const errorMessage = () =>
  error({
    title: 'Warning!',
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
    closerHover: true,
  });

const countrySearch = debounce(() => {
  refs.aboutCountry.innerHTML = '';

  fetchCountries(refs.input.value).then(response => {
    if (response.length > 10) {
      errorMessage();
    } else if (response.length === 1) {
      const countryMarkup = aboutCountry(response);
      refs.aboutCountry.insertAdjacentHTML('beforeend', countryMarkup);
      console.log(response);
    } else {
      const markup = countriesMarkup(response);
      refs.countriesRef.insertAdjacentHTML('beforeend', markup);
    }
  });
  refs.input.value = '';
}, 1000);

refs.input.addEventListener('input', countrySearch);
