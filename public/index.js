const apiKEY = 'appid=bdec91708ae7fca7e00c0a671605e62c&zip=';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&';
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather-icon');
const redoBtn = document.querySelector('#redo');
const moreInfo = document.querySelector('.more-info');


async function validateZipcode() {
    const url = `http://localhost:${3000 || process.env.PORT}/api/validateInput?zipcode=${searchBox.value}`;
    const options = {
        method: 'GET',
    }
 
    return await fetch(url, options)
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
        throw Error(err.message);
    })
}

function setInfo(info){
    document.querySelector('.city').innerHTML = info.name;
    document.querySelector('.temp').innerHTML = Math.round(info.main.temp) + '°F';
    document.querySelector('.humidity').innerHTML =  info.main.humidity + '%';
    document.querySelector('.wind').innerHTML = Math.round(info.wind.speed) + " MPH";
    moreInfo.style.display = 'none';
    moreInfo.innerHTML = 
    `Weather right now feels like ${info.main.feels_like}°F. The predicted maximum for today is ${info.main.temp_max}°F.
    The minimum is ${info.main.temp_min}°F`;
}

function setImage(info){
    if (info.weather[0].main == 'Clouds'){
        weatherIcon.src = 'images/clouds.png';
    }
    else if(info.weather[0].main == 'Clear'){
        weatherIcon.src = 'images/clear.png';
    }
    else if(info.weather[0].main == 'Rain'){
        weatherIcon.src = 'images/rain.png';
    }
    else if(info.weather[0].main == 'Drizzle'){
        weatherIcon.src = 'images/drizzle.png';
    }
    else if(info.weather[0].main == 'Mist'){
        weatherIcon.src = 'images/mist.png';
    }


}

async function checkWeather(city) {
    const response = await fetch(apiURL+apiKEY+city);
    let data = await response.json();
    setInfo(data);
    setImage(data);
    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener('click', async () =>{
    if (searchBox.value.length == 5){
        const zip = await validateZipcode();
        console.log(zip);
        if (zip.isValidZipcode){
            console.log(zip.isValidZipcode);
            document.querySelector(".error").style.display = 'none';
            await checkWeather(searchBox.value);
        } 
        else{
            console.log(zip.isValidZipcode);
            document.querySelector(".error").style.display = 'block';
        }        
    }
    else{
        document.querySelector(".error").style.display = 'block';
    }

})

redoBtn.addEventListener('click', async ()=>{
    document.querySelector(".weather").style.display = 'none';
    searchBox.value = '';
})

weatherIcon.addEventListener('click', ()=> {
    if (document.querySelector(".more-info").style.display == 'none'){
        document.querySelector(".more-info").style.display = 'block';
    }
    else{
        document.querySelector(".more-info").style.display = 'none';
    }
})

