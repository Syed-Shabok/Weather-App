function showAlert(message) {
    let alertArea = document.getElementById("alertArea");
    let alertText = document.getElementById("alertText");

    alertArea.style.display = "block";
    alertText.textContent = message;

    setTimeout(() => {
        alertText.textContent = "";
        alertArea.style.display = "none";
    }, 2500);
}

async function getWeather(params) {
    let city = document.getElementById("city").value;
    let weatherInfo = document.getElementById("weatherInfo");

    if(!city) {
        showAlert("Please enter a city name!");
        return;
    }

    let apiKey = "b9aff055291067e71939cb160e33ac76";
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        let response = await fetch(apiLink);
        if(!response.ok) {
            throw new Error("City not found!");
            return;
        }
        
        let data = await response.json();
        displayWeather(data);
        
        
    } catch (error) {
        console.log(error);
        showAlert("City not found!"); 
    }
}

function displayWeather(data) {
    let {name, weather, timezone, main} = data;
    let weatherInfo = document.getElementById("weatherInfo");

    console.log(data);
    
    weatherInfo.innerHTML = `
     <div>
        <h3>Location: ${name}</h3>
        <p>Timezone: ${timezone}</p>
        <p>Current Weather: ${weather[0].description}</p>
        <p>Temperature: ${(main.temp - 273.15).toFixed(2)} °C</p>
    </div>`;
}