let form = document.querySelector(".main_container form");
let input = document.querySelector(".main_container input");
let error = document.querySelector(".main_container .error");
let list = document.querySelector(".cities_part .cities");
let apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const listElements = list.querySelectorAll(".cities_part .city");
  const inputv = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputv}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}"><span>${name}</span>
          <sup>${sys.country}</sup></h2>
        <div class="city-temperature">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      error.textContent = "გთხოვთ შეიყვანოთ ვალიდური ქალაქი";
    });

  msg.textContent = "";
  form.reset();
});
