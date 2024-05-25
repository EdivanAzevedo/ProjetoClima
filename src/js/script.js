document.querySelector("#search").addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityName = document.querySelector("#city_name").value;

    if (!cityName) {
        return showAlert("Por favor, insira o nome de uma cidade");
    }

    const API_KEY = "d84d50f19c8b093f03a3bcd2465ccb13";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        cityName
    )}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const result = await fetch(apiurl);
    const json = await result.json();

    console.log(json);

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            temp_min: json.main.temp_min,
            temp_max: json.main.temp_max,
            dreciption: json.weather[0].description,
            temp_icon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
        document.querySelector("#alert").classList.remove("show");
    } else {
        document.querySelector("#alert").classList.add("show");
        showAlert("Cidade não encontrada");
    }
});

function showInfo(json) {
    showAlert("");
    document.querySelector("#weather").classList.add("show");

    document.querySelector(
        "#title"
    ).innerHTML = `${json.city}, ${json.country}`;

    document.querySelector("#temp_value").innerHTML = `${json.temp
        .toFixed(1)
        .toString()
        .replace(".", ",")} <sup>°C</sup>`;

    document.querySelector("#temp_min").innerHTML = `${json.temp_min
        .toFixed(1)
        .toString()
        .replace(".", ",")} <sup>°C</sup>`;

    document.querySelector("#temp_max").innerHTML = `${json.temp_max
        .toFixed(1)
        .toString()
        .replace(".", ",")} <sup>°C</sup>`;

    document.querySelector("#temp_description").innerHTML = json.dreciption;

    document.querySelector(
        "#temp_img"
    ).src = `https://openweathermap.org/img/wn/${json.temp_icon}.png`;

    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(
        1
    )}km/h`;
    document.querySelector("#humidity").innerHTML = `${json.humidity}%`;
}

function showAlert(msg) {
    document.querySelector("#alert").innerHTML = msg;
}
