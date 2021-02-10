const api =
{
    key: "98e87e707cde1462208212d867353390",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}
const dateBuilder = (now) => 
{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[now.getDay()];
    let month=months[now.getMonth()];
    let date=now.getDate();
    let year=now.getFullYear();
    return `${day},${date} ${month},${year}`;
}
const displayResults = (weather) => 
{
    if(weather.cod==404)
    {
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    city.innerText = `Sorry, We're unable to find the location!`;
    date.innerText = ``;
    let temp=document.querySelector('.temp');
    temp.innerHTML=``;
    let weather_el=document.querySelector('.weather');
    weather_el.innerText=``;
    let hilow=document.querySelector('.hi-low');
    hilow.innerText=``;
    }
    console.log(weather);
    const now = new Date();
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    city.innerText = `${weather.name},${weather.sys.country}`;
    date.innerText = dateBuilder(now);
    let temp=document.querySelector('.temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el=document.querySelector('.weather');
    const body=document.querySelector('.app-wrap');
    const cond=weather.weather[0].main;
    if(cond=="Haze")
    {
        weather_el.innerHTML=`<img src="hazy.png" height="32px" width="32px" class="data"> ${cond}`;
    }
    else if(cond=="Clear")
    {
        weather_el.innerHTML=`<img src="clear.png" height="32px" width="32px" class="data"> ${cond}`;
    }
    else if(cond=="Sunny")
    {
        weather_el.innerHTML=`<img src="sun.png" height="32px" width="32px" class="data"> ${cond}`;
    }
    else if(cond=="Clouds")
    {
        weather_el.innerHTML=`<img src="cloud3.png" height="32px" width="32px" class="data"> ${cond}`;
    }
    else if(cond=="Rain")
    {
        weather_el.innerHTML=`<img src="rain.png" height="32px" width="32px" class="data"> ${cond}`;
    }
    else
    {
        weather_el.innerHTML=`${cond}`;
    }
    let hilow=document.querySelector('.hi-low');
    hilow.innerText=`${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;
}
const getResults = (query) => {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}
const setQuery = (evt) => {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
