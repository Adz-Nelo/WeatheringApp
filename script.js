// Create stars for the cosmology background
function createStars() {
    const cosmos = document.getElementById('cosmos');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3;
        
        if (size < 1) {
            star.classList.add('star', 'small');
        } else if (size < 2) {
            star.classList.add('star', 'medium');
        } else {
            star.classList.add('star', 'large');
        }
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        cosmos.appendChild(star);
    }
}

// Initialize the cosmology background
createStars();

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const err404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
const input = document.querySelector(".search-box input");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search.click(); 
  }
});

search.addEventListener("click", () => {
  const API_key = "299a52da0a1374bf04989f0f6459818b";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "450px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        err404.classList.add("active");
        return;
      }

      const img = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temperature");
      const desc = document.querySelector(".weather-box .description");
      const humid = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        err404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            img.src = "img/clear.webp";
            break;
          case "Rain":
            img.src = "img/rain.webp";
            break;
          case "Snow":
            img.src = "img/snow.webp";
            break;
          case "Clouds":
            img.src = "img/cloud.webp";
            break;
          case "Mist":
            img.src = "img/mist.webp";
            break;
          case "Haze":
            img.src = "img/mist.webp";
            break;
          default:
            img.src = "img/cloud.webp";
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humid.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumid = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const cloneInfoWeather = infoWeather.cloneNode(true);
        const cloneInfoHumid = infoHumid.cloneNode(true);
        const cloneInfoWind = infoWind.cloneNode(true);

        cloneInfoWeather.id = 'clone-info-weather';
        cloneInfoWeather.classList.add('active-clone');

        cloneInfoHumid.id = 'clone-info-humidity';
        cloneInfoHumid.classList.add('active-clone');

        cloneInfoWind.id = 'clone-info-wind';
        cloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", cloneInfoWeather);
          infoHumid.insertAdjacentElement("afterend", cloneInfoHumid);
          infoWind.insertAdjacentElement("afterend", cloneInfoWind);
        }, 2200);

        const cloneInfoWeather2 = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneInfoWeather2.length;
        const cloneInfoWeatherFirst = cloneInfoWeather2[0];
        
        const cloneInfoHumid2 = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoHumidFirst = cloneInfoHumid2[0];

        const cloneInfoWind2 = document.querySelectorAll('.info-wind.active-clone');
        const cloneInfoWindFirst = cloneInfoWind2[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove('active-clone');
          cloneInfoHumidFirst.classList.remove('active-clone');
          cloneInfoWindFirst.classList.remove('active-clone');

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }
      }
    });
});