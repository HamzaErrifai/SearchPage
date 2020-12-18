getTime();
setInterval(getTime, 30000);

//Get Current time
function getTime() {
  const current = new Date();
  let h = current.getHours();
  let m = current.getMinutes();
  if (h < 10) h = "0" + String(h);

  if (m < 10) m = "0" + String(m);

  document.getElementById("time").textContent = `${h}:${m}`;
}

//start a search
function search() {
  const input = document.getElementById("search").value;
  const url = `https://www.google.com/search?q=${input}`;
  window.open(url, "_self");
}
document.getElementById("search").addEventListener("change", search);

getWeather();
//Get weather
function getWeather() {
  if ("geolocation" in navigator) {
    async function success(pos) {
      const { longitude, latitude } = pos.coords;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=77eeaba722cdfb450fbd4e680edabd2e`;
      const resp = await fetch(weatherUrl);
      const weather = await resp.json();
      document.getElementById("city").textContent = weather.name;
      document.getElementById("temp").textContent = weather.main.temp.toFixed(
        0
      );
      document.getElementById("icon").src =
        "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png";
    }
    function error(err) {
      document.getElementById("weather").textContent = "Unavailable";
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is unavailable");
  }
}
getWallpapper();
//Get wallpaper
async function getWallpapper() {
  const resp = await fetch(
    "https://source.unsplash.com/1920x1080/?nature,water,green"
  );
  const img = await resp.blob();
  document.getElementById(
    "app"
  ).style.backgroundImage = `url(${URL.createObjectURL(img)})`;
}

//Get battery info
navigator.getBattery().then(function (battery) {
  const BLevel = battery.level * 100;
  const BStatus = battery.charging;
  document.getElementById("status").textContent = BStatus
    ? "Charging"
    : "Remaining";
  document.getElementById("purcentage").textContent = BLevel.toFixed(0);

  battery.addEventListener("levelchange", function () {
    document.getElementById("purcentage").textContent = BLevel.toFixed(0);
  });
  battery.addEventListener("chargingchange", function () {
    document.getElementById("status").textContent = BStatus
      ? "Charging"
      : "Remaining";
  });
});

//change city
document.getElementById("weather").addEventListener("click", (e) => {
  document.getElementById("citySet").style.display = "block";
  document.getElementById("citySet").focus();
  document.getElementById("weather").style.display = "none";
  // console.log(c);
});

document.getElementById("citySet").addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    if (!e.target.value) {
      document.getElementById("citySet").style.display = "none";
      document.getElementById("weather").style.display = "block";
    } else {
      changeCity(e.target.value);
      e.target.value = "";
      document.getElementById("citySet").style.display = "none";
      document.getElementById("weather").style.display = "block";
    }
  }
});

async function changeCity(city) {
  //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=77eeaba722cdfb450fbd4e680edabd2e`;
  const resp = await fetch(weatherUrl);
  const jsonData = await resp.json();
  document.getElementById("city").textContent = jsonData.name;
  document.getElementById("temp").textContent = jsonData.main.temp.toFixed(0);
  document.getElementById("icon").src =
    "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + ".png";
}
