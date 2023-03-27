"use strict";
const inputEL = document.getElementById("inputi");
const mainEl = document.getElementById("main");
const divEl = document.querySelector("divi");
const mainSquareEl = document.getElementsByClassName("msquare");
const h1El = document.querySelector("h1");

mainEl.style.opacity = 0;
const renderCountry = function (data) {
  const html = `
  <div class="msquare">
    <picture>
      <img class="country-img" src="${data.flags.png}" />
    </picture>
    <div class="square">
      <h2 class="country-name" >🌆 ${data.name.common}</h2>
      <p class="country-continent">🌍Region: ${data.continents} </p>
      <p class="country-capital">🌃 Capital: ${data.capital}</p>
      <p class="country-population">👪Population: ${(
        +data.population / 1000000
      ).toFixed(1)} M </p>
    </div>
</div>`;

  mainEl.insertAdjacentHTML("beforeend", html);
  mainEl.style.opacity = 1;
  inputEL.style.backgroundColor = "white";
};

const renderError = function () {
  inputEL.style.backgroundColor = "red";
};

const getCountry = async function (name) {
  try {
    name = inputEL.value;
    if (!inputEL.value) {
      renderError();
    }
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true
    `
    );

    const data = await res.json();
    if (mainSquareEl.length === 4) {
      h1El.style.color = "red";
      h1El.innerText =
        "YOU CAN ONLY SEARCH UP TO FOUR (4) COUNTRIES AT A TIME, RELOAD THE PAGE FOR MORE!";
      return;
    } else {
      renderCountry(data[0]);
      inputEL.value = "";
    }
  } catch (err) {
    renderError();
    console.clear();
  }
};
