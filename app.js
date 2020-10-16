var body = document.querySelector("body");
const key = 'f7848adef7af80fcb4f0602f7aa1a0a2';
//location

const weather = {};

weather.temperature = {
  unit : "celsius"
}

const KELVIN = 273;

function load(){

if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
  console.log("browser doesn't support location");
}
}

function showError(){
  console.log("error");
}

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude,longitude);
}

function getWeather(latitude,longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);
  fetch(api)
  .then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].main;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.min = data.main.temp_min - 273.15;
    weather.max = data.main.temp_max - 273.15;

  })
  .then(function(){
    displayWeather();
});
}


function displayWeather(){
  let weather_el = document.querySelector('.current .weather');
  let temp = document.querySelector(".current .temp");
  let city = document.querySelector(".location .city");
  temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  weather_el.innerHTML = weather.description;
  city.innerHTML = `${weather.city}, ${weather.country}`;

  let minMax= document.querySelector('.current .min-max');
  minMax.innerText = `${(weather.min)}°c / ${(weather.max)}°c`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  if(weather.description.textContent == "Clouds" || weather.description.textContent == "Mist" || weather.description.textContent == "Fog"){
    body.style.backgroundImage = "url('img/cloud.jpeg')";
  }
  else if(weather.description.textContent == "Clear"){
    body.style.backgroundImage = "url('img/sun.jpeg')";
  }
  else if(weather.descriptionl.textContent == "Rain"){
    body.style.backgroundImage = "url('img/rain.jpeg')";
  }
  else{
    body.style.backgroundImage = "url('img/snow.jpeg')";
  }
}



function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}





//    *     //



const api = {
    key: "f7848adef7af80fcb4f0602f7aa1a0a2",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

  function displayResults (weather){

    
      // Display City and Country
      let city = document.querySelector(".location .city");
      city.innerText = `${weather.name}, ${weather.sys.country}`;

      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText = dateBuilder(now);

      let temp = document.querySelector(".current .temp");
      temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

      let weather_el = document.querySelector('.current .weather');
      weather_el.innerText = weather.weather[0].main;

      let minMax= document.querySelector('.current .min-max');
      minMax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

      if(weather_el.textContent == "Clouds" || weather_el.textContent == "Mist"){
        body.style.backgroundImage = "url('img/cloud.jpeg')";
      }
      else if(weather_el.textContent == "Clear"){
        body.style.backgroundImage = "url('img/sun.jpeg')";
      }
      else if(weather_el.textContent == "Rain"){
        body.style.backgroundImage = "url('img/rain.jpeg')";
      }
      else{
        body.style.backgroundImage = "url('img/snow.jpeg')";
      }
  }


  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
