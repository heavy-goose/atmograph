import "./reset.css";
import "./styles.css";
import secure from "../public/secure.json";
import activities from "../public/activities.json";
import descriptions from "../public/descriptions.json";

const weather = {
  data: {
    // fallback data for Berlin, Germany
    latitude: "52.520008",
    longitude: "13.404954",
    // fallback for development
    condition: "Snow",

    locationRecieved: false,
    visualCrossingApiKey: secure.visualCrossingApiKey,
    openCageApiKey: secure.openCageApiKey,
  },
  async init() {
    try {
      await this.getLocation();
      this.urlBuilder();
      await this.getCity();
      await this.getWeatherData();
    } catch (error) {
      console.error(`Unable to get user location: ${error.message}`);
    }
    this.getDescription();
  },
  async getCity() {
    console.log("getting city");
    try {
      const response = await fetch(this.openCageUrl, {
        method: "GET",
        headers: {},
      });
      const data = await response.json();
      console.log(data);
      this.data.city = data.results["0"].components.city;
      console.log("city got!");
    } catch (error) {
      console.error(`City could not be determined: ${error}`);
    }
  },
  getLocation() {
    console.log("getting location...");
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.data.latitude = position.coords.latitude;
          this.data.longitude = position.coords.longitude;
          this.data.locationRecieved = true;
          console.log("location got!");
          // The reason I am also returning the location data, is for testing purposes and to maintain explicit data flow
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    });
  },
  urlBuilder() {
    this.openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${this.data.latitude}%2C+${this.data.longitude}&key=${this.data.openCageApiKey}`;
    this.visualCrossingUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.data.latitude}%2C${this.data.longitude}?unitGroup=metric&include=current&key=${this.data.visualCrossingApiKey}&contentType=json`;
  },
  async getWeatherData() {
    console.log("getting weather data now...");
    try {
      const response = await fetch(this.visualCrossingUrl, {
        method: "GET",
        headers: {},
      });
      const data = await response.json();
      this.data.temp = data.currentConditions.temp;
      this.data.condition = data.currentConditions.conditions;

      console.log("got weather data. Look here: ");
      console.log(this.data);
    } catch (err) {
      console.error(err);
    }
  },
  getActivity() {
    const activityList = activities[this.data.condition];
    const randomIndex = Math.floor(Math.random() * activityList.length);
    return activityList[randomIndex];
  },
  getDescription() {
    this.data.description = descriptions[this.data.condition];
  },
};

const display = {
  async init() {
    await weather.init();
    this.cacheDom();
    this.bindEvents();
    this.display();
  },
  cacheDom() {
    this.tempSpan = document.querySelector("#temp");
    this.locationSpan = document.querySelector("#location");
    this.descriptionSpan = document.querySelector("#description");
    this.activitySpan = document.querySelector("#activity");
    this.rerollButton = document.querySelector("#reroll-btn");
  },
  bindEvents() {
    this.rerollButton.addEventListener("click", () => this.reroll());
  },
  display() {
    this.tempSpan.innerText = weather.data.temp;
    this.locationSpan.innerText = weather.data.city;
    this.descriptionSpan.innerText = weather.data.description;
    this.activitySpan.innerText = weather.getActivity();
  },
  reroll() {
    this.activitySpan.innerText = weather.getActivity();
  },
};

display.init();

// this allows access via web console
window.weather = weather;
window.display = display;
