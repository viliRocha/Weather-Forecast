const API_KEY = "70450de2ac958905e084a5685183cd6e";

const imageElement = document.getElementById("image");
const placeElement = document.getElementById("place");
const locationInput = document.getElementById("local");
const newsElement = document.getElementById("noticias");

const windElement = document.getElementById("wind");
const humidityElement = document.getElementById("humidity");

const maxTempElement = document.getElementById("temp_max");
const minTempElement = document.getElementById("temp_min");

const cloudsElement = document.getElementById("clouds");
const weatherElement = document.getElementById("weather");
const feelsLikeElement = document.getElementById("feels_like");
const tempElement = document.getElementById("temp");

function fetchWeather() {
    const city = locationInput.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                imageElement.src = "/assets/img/sem-resultados.png";
                placeElement.innerText = "place: couldn't find current place";

                windElement.innerText = "wind speed: ";
                humidityElement.innerText = "humidity: ";

                maxTempElement.innerText = "maximum temperature: ";
                minTempElement.innerText = "minimum temperature: ";

                cloudsElement.innerText = "clouds: ";
                weatherElement.innerText = "weather: ";
                feelsLikeElement.innerText = "feels like: ";
                tempElement.innerText = "temperature: ";

                tempElement.style.color = "blue";
                feelsLikeElement.style.color = "blue";
                minTempElement.style.color = "blue";
                maxTempElement.style.color = "blue";
            } else {
                const weatherDescription = data.weather[0].description;
                switch (weatherDescription) {
                    case "clear sky":
                        imageElement.src = "./assets/img/ensolarado.png";
                        break;
                    case "few clouds":
                        imageElement.src = "./assets/img/pequena nuvem.png";
                        break;
                    case "broken clouds":
                        imageElement.src = "./assets/img/nuvens.png";
                        break;
                    case "scattered clouds":
                        imageElement.src = "./assets/img/nuvem.png";
                        break;
                    case "overcast clouds":
                        imageElement.src = "./assets/img/muitas nuvens.png";
                        break;
                    case "moderate rain":
                        imageElement.src = "./assets/img/chuva fraca.png";
                        break;
                    case "light rain":
                        imageElement.src = "./assets/img/chuva.png";
                        break;
                    case "heavy intensity rain":
                        imageElement.src = "./assets/img/trovoada.png";
                        break;
                    case "snow":
                        imageElement.src = "./assets/img/neve.png";
                        break;
                    case "mist":
                        imageElement.src = "./assets/img/mist.png";
                        break;
                    default:
                        imageElement.src = "/assets/img/default.png";
                }

                updateElementColors(data.main);

                windElement.innerText = `wind speed: ${data.wind.speed} km/h`;
                humidityElement.innerText = `humidity: ${data.main.humidity}%`;
                maxTempElement.innerText = `maximum temperature: ${data.main.temp_max} ºC`;
                minTempElement.innerText = `minimum temperature: ${data.main.temp_min} ºC`;
                cloudsElement.innerText = `clouds: ${data.clouds.all}%`;
                weatherElement.innerText = `weather: ${data.weather[0].description}`;
                feelsLikeElement.innerText = `feels like: ${data.main.feels_like} ºC`;
                tempElement.innerText = `temperature: ${data.main.temp} ºC`;
                placeElement.innerText = `place: ${data.name}`;

                console.log(data.main.temp);
            }
        });
}

function updateElementColors(main) {
    const elements = [
        { element: tempElement, value: main.temp },
        { element: feelsLikeElement, value: main.feels_like },
        { element: minTempElement, value: main.temp_min },
        { element: maxTempElement, value: main.temp_max },
    ];

    elements.forEach(({ element, value }) => {
        if (value >= 30) {
            element.style.color = "red";
        } else if (value <= 0) {
            element.style.color = "#87CEEB";
        } else {
            element.style.color = "";
        }
    });
}

window.addEventListener("load", () => {
    fetch("http://ip-api.com/json")
        .then(response => response.json())
        .then(ip => {
            locationInput.value = ip.city;
            fetchWeather();
            locationInput.value = "";
        });
});

document.addEventListener("keypress", e => {
    if (e.which === 13) {
        fetchWeather();
    }
});

newsElement.addEventListener("mouseover", () => {
    newsElement.style.borderWidth = "3px";
    newsElement.style.borderColor = "blue";
});

newsElement.addEventListener("mouseout", () => {
    newsElement.style.borderWidth = "0px";
});

locationInput.addEventListener("mouseover", () => {
    locationInput.style.borderWidth = "3px";
    locationInput.style.borderColor = "blue";
});

locationInput.addEventListener("mouseout", () => {
    locationInput.style.borderWidth = "0px";
});
