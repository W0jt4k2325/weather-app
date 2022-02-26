const api ={
    key: "59ce2185e5d065e3e2332e902405ee4a",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('keypress', setQuery);
function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbar.value);
    }
}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date()
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}
function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesdau", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}