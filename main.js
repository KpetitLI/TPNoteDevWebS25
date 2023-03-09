class MyMeteo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadowDom = this.attachShadow({ mode: "open" });

    let style = document.createElement("style");
    this.shadowDom.appendChild(style);
    style.innerHTML = ` 
    .weather-widget {
      display: inline-block;
      background-color: rgb(240, 240, 240);
      line-height: 0; 
      padding: 5px 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    .weather-widget img {
      display: block;
      margin: auto;
      max-width: 100%;
    }`;

    let div = document.createElement("div");
    div.className = "weather-widget";
    this.shadowDom.appendChild(div);

    let city;
    if (this.getAttribute("ville")) {
      city = this.getAttribute("ville");
    } else {
      city = "Paris";
    }

    div.innerHTML = `En cours de chargement ${city}...`;

    let url = `https://www.prevision-meteo.ch/services/json/${city}`;
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
      let response = JSON.parse(request.response);
      if (response && response.current_condition) {
        city = response.city_info.name;
        let country = response.city_info.country;
        let hours = response.current_condition.hour.replace(":", " h ");
        if (hours.charAt(0) === "0") {
          hours = hours.substring(1);
        }
        let windSpeed = response.current_condition.wnd_spd;
        let windDir = response.current_condition.wnd_dir;
        let humidity = response.current_condition.humidity;
        let iconUrl = response.current_condition.icon;

        let content = `
          <h4>${city} (${country})</h4>
          <p>${hours}</p>
          <p>${windSpeed} noeuds ${windDir}</p>
          <p>${humidity}% humidity</p>
          <img src="${iconUrl}" alt="Meteo icon">`;
        div.innerHTML = content;
      } else {
        div.innerHTML = "City or coordinate not found.";
      }
    };
    request.onerror = () => {
      div.innerHTML = "Error 404.";
    };
    request.send();
  }
}
customElements.define("my-meteo", MyMeteo);
