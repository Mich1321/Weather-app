const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const body = document.querySelector("body");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=84aefc79059c90c05bfff96294980158";
const API_UNITS = "&units=metric";

const getWeather = () => {
	const city = input.value || "Warsaw";
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + "°C";
			humidity.textContent = hum + "%";
			weather.textContent = status.main;

			warning.textContent = "";
			input.value = "";
			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute("src", "./img/thunderstorm.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%)"
				);
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute("src", "./img/drizzle.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(212, 35%, 58%, 1) 0%, hsla(218, 32%, 80%, 1) 100%)"
				);
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute("src", "./img/rain.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(198, 65%, 34%, 1) 0%, hsla(178, 44%, 32%, 1) 100%)"
				);
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute("src", "./img/ice.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(189, 100%, 50%, 1) 0%, hsla(248, 16%, 61%, 1) 100%)"
				);
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute("src", "./img/fog.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)"
				);
			} else if (status.id === 800 && time.hours >= 16 && time.hours < 05) {
				photo.setAttribute("src", "./img/moon.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(1, 84%, 80%, 1) 0%, hsla(56, 100%, 50%, 1) 100%)"
				);
			} else if (status.id === 800) {
				photo.setAttribute("src", "./img/sun.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(1, 84%, 80%, 1) 0%, hsla(56, 100%, 50%, 1) 100%)"
				);
			} else if (status.id >= 800 && status.id < 900) {
				photo.setAttribute("src", "./img/cloud.png");
				body.setAttribute(
					"style",
					"background-image: linear-gradient(90deg, hsla(208, 7%, 55%, 1) 0%, hsla(191, 5%, 40%, 1) 100%)"
				);
			} else {
				photo.setAttribute("src", "./img/unknown.png");
			}
		})
		.catch(() => (warning.textContent = "Wpisz poprawną nazwę miasta!"));

	function time() {
		let data = new Date(); //tworzymy obiekt typu data
		let hours = data.getHours(); //pobieramy godzinę
		let minutes = data.getMinutes(); //pobieramy minutę
		let seconds = data.getSeconds(); //pobieramy sekundy

		// przypisanie zera do godziny, minuty i sekundy, czyli np. 05 a nie 5
		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		//wyświetlenie zegarka w divie o id zegar
		document.querySelector("#clock").innerHTML =
			hours + " : " + minutes + " : " + seconds;

		setTimeout(time, 1000); //samowywołanie się funkcji po 1s
	}
	window.addEventListener("load", time);
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		getWeather();
	}
};

//wywołanie funkcji czas po załadowaniu strony
getWeather();
button.addEventListener("click", getWeather);
input.addEventListener("keyup", enterKeyCheck);
