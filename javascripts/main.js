$(document).ready(function(){

console.log("main js working");

const apiKey = '';								// key goes here

let zipInput = $("#zip-input");
let zipToPromise;

let threeDayForecast = [];
let sevenDayForecast = [];


	$('body').on('click', '#submit-zip', () => {
		console.log(zipInput[0].value);
		zipToPromise = zipInput[0].value;
		loadCity(zipToPromise).then((result) => {			// upon change, adjust origin line for reference
			console.log(result);
			makeForecastArrays(result);
		})
		.catch((error) => {
			console.log(error);
		});
	});

	const loadCity = (zip) => {
		console.log(zip);
		console.log(apiKey);
		return new Promise ((resolve, reject) => {
			console.log(zipToPromise);
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipToPromise},us&units=imperial&APPID=${apiKey}
			`)
			.done((data) => {
				console.log("inside data");
				resolve(data);		// this result is getting back to line 8 for the then()
			})
			.fail((error) => {
				reject(error);
			});
		});
	};

	const makeForecastArrays = (cityInfo) => {
		console.log(cityInfo);
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












});