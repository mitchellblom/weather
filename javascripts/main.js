$(document).ready(function(){

const apiKey = '';								// key goes here

let zipInput = $("#zip-input");
let zipToPromise;

let currentWeather = [];
let threeDayForecast = [];
let sevenDayForecast = [];


	$('body').on('click', '#submit-zip', () => {
		zipToPromise = zipInput[0].value;
		loadWeatherData(zipToPromise);
	});

	const loadForecast = (zip) => {
		console.log(zip);
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&APPID=${apiKey}
			`)
			.done((data) => { resolve(data); })		// this result is getting back to line 8 for the then()
			.fail((error) => { reject(error); });
		});
	};

	const makeForecastArrays = (cityInfo) => {
		console.log("cityInfo in makeForecastArrays", cityInfo);
		threeDayForecast = cityInfo.list.slice(0,3);
		console.log(threeDayForecast);
		sevenDayForecast = cityInfo.list.slice(0,7);
		console.log(sevenDayForecast);
		// for (var i = 0; i < 2; i++) {			// 3 day forecast
		// 	console.log("name: ", cityInfo.city.name);
			
		// console.log("temp: ", cityInfo.list[0].main.temp);
		// console.log("conditions: ", cityInfo.list[0].weather[0].description);
		// console.log("pressure: ", cityInfo.list[0].main.pressure);
		// console.log("wind speed: ", cityInfo.list[0].wind.speed);
		// }
	};

	const loadCurrent = (zip) => {
		console.log("zip in loadCurrent", zip);
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${apiKey}
			`)
			.done((data) => { resolve(data); })		// this result is getting back to line 8 for the then()
			.fail((error) => { reject(error); });
		});
	}

	const makeCurrentArray = (cityInfo) => {
		console.log("cityInfo in makeCurrentArray", cityInfo);
	}

	const loadWeatherData = (zip) => {
		Promise.all([loadCurrent(zip), loadForecast(zip)])
			.then((result) => {							// upon change, adjust origin line for reference
			makeCurrentArray(result[0]);
			makeForecastArrays(result[1]);			
		})
		.catch((error) => {
			console.log(error);
		});
	};










});