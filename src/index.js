let searchForm = document.querySelector(".my-form");
searchForm.addEventListener("submit", showCity);

let current_cel_temp = null;

let my_far = document.querySelector("#temperature_Far");
my_far.addEventListener("click", convert_to_far);


 function showCity(event) 
{
  event.preventDefault();
  let cityInput = document.querySelector("#my-city");
  let my_h3 = document.querySelector("h3.target-city");
  my_h3.innerHTML = `${cityInput.value}`
 let apiKey = "87a3a2150aa49253a7b9c970848257a6";
 let  q = cityInput.value;
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`;
 axios.get(url).then(showtemp);
}

function showtemp(response) {
// console.log(response);
let my_temp = document.querySelector("#content");
current_cel_temp = Math.round(response.data.main.temp);
my_temp.innerHTML = `${current_cel_temp}`;


let description_tag = document.querySelector(".description");
let description = response.data.weather[0].description;
// console.log(description);
description_tag.innerHTML = `${description}`;

let wind_speed_tag = document.querySelector(".windspeed");
let wind_speed = Math.round(response.data.wind.speed * 3.6);
// console.log(wind_speed);
wind_speed_tag.innerHTML = `wind : ${wind_speed} km/h`;

let humidity_tag = document.querySelector(".humidity");
let humidity = Math.round(response.data.main.humidity);
// console.log(humidity);
humidity_tag.innerHTML = `humidity : ${humidity}%`;

let icon_tag = document.querySelector(".today");
icon_tag.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon_tag.setAttribute("alt", response.data.weather[0].description);

}

function convert_to_far(event) 
{
  event.preventDefault();
  let cel_tag = document.querySelector("#content");
  let far = Math.round((9 / 5) * current_cel_temp + 32);
  // console.log(far);
  cel_tag.innerHTML = `${far}`;
}
