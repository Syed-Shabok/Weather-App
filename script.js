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
    let {name, weather, main} = data;
    let weatherInfo = document.getElementById("weatherInfo");

    console.log(data);

    weatherInfo.classList.remove("hidden");
    let weatherDescription = weather[0].description;
    weatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

    weatherInfo.innerHTML = `
     <div class="flex items-center justify-between p-4">
        <div>
            <h3 class="text-[25px]">${name}</h3>
            <p class="text-[20px]">${weatherDescription}</p> 
            <p class="text-[50px]">${(main.temp - 273.15).toFixed(1)}°C</p>
            <p class="text-[18px]">Feels like ${(main.feels_like - 273.15).toFixed(1)}°C</p>
            <p class="text-[18px]">Humidity: ${main.humidity}%</p>
        </div>
        <div class="bg-gray-50 rounded-md border border-gray-100 scale-120 flex-shrink-0">
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" 
            onerror="this.src='./img/default.jpg'" class="w-24 h-24" alt="weather icon">
        </div>
    </div> `;
}