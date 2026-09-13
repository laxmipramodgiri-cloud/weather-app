const apiKey = "ac4ef8269bdabb1f034e7c24971ef578";

// Search Weather

async function getWeather() {

const city = document.getElementById("city").value.trim();

if (city === "") {
alert("Please enter city name");
return;
}

document.getElementById("loader").style.display = "block";

try {

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
);

 const data = await response.json();

 if (data.cod != 200) {

document.getElementById("loader").style.display = "none";
alert("City not found");
 return;

}

displayWeather(data);

getForecast(data.coord.lat, data.coord.lon);

}

catch (error) {

alert("Something went wrong.");

}

finally {

document.getElementById("loader").style.display = "none";

}

}

// Current Location

function getCurrentLocation() {

if (!navigator.geolocation) {

alert("Geolocation not supported.");

return;

}

document.getElementById("loader").style.display = "block";

navigator.geolocation.getCurrentPosition(

async function(position) {

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

);

const data = await response.json();

displayWeather(data);

getForecast(lat, lon);

document.getElementById("loader").style.display = "none";

},

function() {

document.getElementById("loader").style.display = "none";

alert("Location permission denied.");

}

);

}
// Display Weather

function displayWeather(data) {
    

document.getElementById("cityName").innerHTML = data.name;

document.getElementById("dateTime").innerHTML =
new Date().toLocaleString();

document.getElementById("weatherIcon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

document.getElementById("temperature").innerHTML =
Math.round(data.main.temp) + " °C";

document.getElementById("condition").innerHTML =
data.weather[0].main;

document.getElementById("feels").innerHTML =
Math.round(data.main.feels_like);

document.getElementById("minTemp").innerHTML =
Math.round(data.main.temp_min);

document.getElementById("maxTemp").innerHTML =
Math.round(data.main.temp_max);

document.getElementById("humidity").innerHTML =
data.main.humidity;

document.getElementById("wind").innerHTML =
data.wind.speed;

document.getElementById("pressure").innerHTML =
data.main.pressure;

document.getElementById("visibility").innerHTML =
(data.visibility / 1000).toFixed(1);

const sunrise = new Date(data.sys.sunrise * 1000);
const sunset = new Date(data.sys.sunset * 1000);

document.getElementById("sunrise").innerHTML =
sunrise.toLocaleTimeString();

document.getElementById("sunset").innerHTML =
sunset.toLocaleTimeString();

}
// 5 Day Forecast

async function getForecast(lat, lon) {

const response = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
);

const data = await response.json();

const forecast = document.getElementById("forecast");
forecast.innerHTML = "";

for (let i = 0; i < data.list.length; i += 8) {

const item = data.list[i];

const card = document.createElement("div");
card.className = "forecast-card";

card.innerHTML = `
<h4>${new Date(item.dt_txt).toLocaleDateString()}</h4>
<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Weather Icon">
<h3>${Math.round(item.main.temp)}°C</h3>
<p>${item.weather[0].description}</p>
`;

forecast.appendChild(card);
}
}


// Dark / Light Mode

function toggleMode() {
document.body.classList.toggle("dark");
}


// Dynamic Background

function changeBackground(weather) {

weather = weather.toLowerCase();

if (weather.includes("clear")) {
document.body.style.background =
"linear-gradient(135deg,#56ccf2,#2f80ed)";
}
else if (weather.includes("cloud")) {
document.body.style.background =
"linear-gradient(135deg,#bdc3c7,#2c3e50)";
}
else if (weather.includes("rain")) {
document.body.style.background =
"linear-gradient(135deg,#4b79a1,#283e51)";
}
else if (weather.includes("snow")) {
document.body.style.background =
"linear-gradient(135deg,#e6dada,#274046)";
}
else {
document.body.style.background =
"linear-gradient(135deg,#74ebd5,#9face6)";
}
}