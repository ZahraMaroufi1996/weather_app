
let current_cel_temp = null;
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ] ;
  
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
  console.log(response);
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
  
  set_current_time(response.data.dt);
  
  let icon_tag = document.querySelector(".today");
  icon_tag.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon_tag.setAttribute("alt", response.data.weather[0].description);
  setforecast(response);
  }
  
  function setforecast(response){
  console.log(response.data.coord);
  let lat = response.data.coord.lat ;
  let lon = response.data.coord.lon ;
  let id =  response.data.id
  console.log(id);
  console.log(lat);
  console.log(lon);
  let key = "b35c686ba9565ba0ab254c2230937552" ;
  // let key = "87a3a2150aa49253a7b9c970848257a6"
  let forecast_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  // let forecast_url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
  // let forecast_url = `http://api.openweathermap.org/data/3/forecast?id=${id}&appids=${key}`
  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  // o diferent services:
  // 1- api.openweathermap.org/data/2.5/weather?lat=10.9883696&lon=-74.8051523&units=metric&appid=xxxxxxxxxxxxxxxxxxxx
  //
  // 2- api.openweathermap.org/data/2.5/forecast?APPID=xxxxxxxxxxxxxxxxxxx&lat=10.9883696&lon=-74.8051523&units=metric
  axios.get(forecast_url).then(showforecast);
  }
  
  function showforecast(response){
  console.log(response);
  let my_forecast_div = document.querySelector(".future-prediction");
  let forecastHTML = `<div id = "future" class="row">` ;
  // my_div.innerHTML = x + my_div.innerHTML ;
  let forecast = response.data.daily ;
  console.log(forecast);
  forecast.forEach((item, i) => {
    if (i < 5)
    {
      // console.log(item.weather[0].icon);
      forecastHTML = forecastHTML +
      ` <div class="col-2">
        <div class="row"><h3 class="future">${nextdays(item.dt)}</h3></div>
        <div class="row"><img class="next" src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" /></div>
        <div class="row"><p class="min-max-temperature">${Math.round(item.temp.max)}° ${Math.round(item.temp.min)}°</p></div>
        </div>` ;
    }
  });
  
  forecastHTML =  forecastHTML + `</div>` ;
  my_forecast_div.innerHTML = forecastHTML ;
  }
  
  
  function nextdays(dt){
    let my_date = new Date(dt * 1000);
    return days[my_date.getDay()] ;
  }
  
  function set_current_time(date){
    let my_date = new Date(date * 1000);
    let my_hour = my_date.getHours();
    let my_min = my_date.getMinutes();
    let my_day = document.querySelector("#day")
    if (my_hour < 10)
    {
     my_hour = `0${my_hour}`;
    }
  
    if (my_min < 10)
    {
     my_min = `0${my_min}`;
    } 
    my_day.innerHTML = `${days[my_date.getDay()]}  ${my_hour} : ${my_min}`  
  }
  
  function convert_to_far(event)
  {
    event.preventDefault();
    let cel_tag = document.querySelector("#content");
    let far = Math.round((9 / 5) * current_cel_temp + 32);
    // console.log(far);
    cel_tag.innerHTML = `${far}`;
  }
  