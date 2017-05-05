///////////// global variable ///////////////////////////////////////

let zipInput = $('#zip-input');
let cityName;
let searchType;
let counter = 0;

///////////// dynamic zipcode validation from html /////////////////

const zipDynamicValidate = (event) => {
	zipInput = $('#zip-input');
    var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57) || (zipInput.val().length > 4)) {
        	return false;
        }
    	else {
        	return true;
    	}
};

///////////// promise and weather dom functions ////////////////////

$(document).ready(function(){

	const apiKey = '';									// key goes here

	let zipToPromise;

	let threeDayForecast = [];
	let sevenDayForecast = [];

		$("#zip-input").keyup(function() {
			if (window.event.keyCode === 13) {
	 			submitForCurrent();
			}
		 });

		$('body').on('click', '#current', () => {
			searchType = "current";
			submitForCurrent();
		});

		$('body').on('click', '#three-day', () => {
			searchType = "threeDay";
			zipToPromise = zipInput[0].value;
			loadForecast(zipToPromise).then((result) => {
				makeForecastArrays(result);}).then(() => {
					writeForecastArray(threeDayForecast);
				})
				.catch((error) => {
					console.error(error);
				});
		});

		$('body').on('click', '#seven-day', () => {
			searchType = "sevenDay";
			zipToPromise = zipInput[0].value;
			loadForecast(zipToPromise).then((result) => {
				makeForecastArrays(result);}).then(() => {
					writeForecastArray(sevenDayForecast);
				})
				.catch((error) => {
					console.error(error);
				});
		});

		const submitForCurrent = () => {
			if (apiKey === '') {
				alert('Remember to enter an API key.');
			}
			zipToPromise = zipInput[0].value;
			loadCurrent(zipToPromise).then((result) => {
				makeAndWriteCurrentWeatherString(result);})
				.catch((error) => {
					console.error(error);
				});
		};

		const loadCurrent = (zip) => {
			return new Promise ((resolve, reject) => {
				$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${apiKey}
				`)
				.done((data) => { 
					resolve(data); 
				})
				.fail((error) => { 
					reject(error); 
					alert("Looks like that zipcode isn't recognized."); 
				});
			});
		};

		const loadForecast = (zip) => {
			return new Promise ((resolve, reject) => {
				$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&APPID=${apiKey}
				`)
				.done((data) => { 
					resolve(data); 
				})
				.fail((error) => { 
					reject(error);
					alert("Looks like that zipcode isn't recognized."); 
				});
			});
		};

		const makeAndWriteCurrentWeatherString = (cityInfo) => {
			$('#strings-written-here').html('');
			cityName = cityInfo.city.name;
			let currentString = 
				`<div class="data-point-container col-lg-4">
				<div class="data-point">Temp: ${cityInfo.main.temp}°F</div>
				<div class="data-point">Conditions: ${cityInfo.weather[0].description}</div>
				<div class="data-point">Pressure: ${cityInfo.main.pressure} mb</div>
				<div class="data-point">Wind: ${cityInfo.wind.speed} mph</div>
				</div>`;
				
			$('#strings-written-here').html(`<h4>Current Weather in ${cityInfo.name}</h4>`);	
			$('#strings-written-here').append(currentString);
		};

		const makeForecastArrays = (cityInfo) => {
			counter++;
			cityName = cityInfo.city.name;
			threeDayForecast = cityInfo.list.slice(0,3);
			sevenDayForecast = cityInfo.list.slice(0,7);
		};

		const writeForecastArray = (forecastArray) => {
			$('#strings-written-here').html(`<h4>Forecast for ${cityName}</h4>`);
				let daysOutString = '';
			for (var i = 0; i < forecastArray.length; i++) {
				if (i === 0) {
					daysOutString = "Tomorrow";
				} else {
					daysOutString = (i + 1) + " days away";
				}
				let forecastString = '';

				if (counter % 4 === 0) {
                	forecastString += `<div class="row">`;
            	}

				forecastString += 
					`<div class="data-point-container col-lg-3">
					<div class="data-point">${daysOutString}</div>
					<div class="data-point">High Temp: ${forecastArray[i].main.temp}°F</div>
					<div class="data-point">Conditions: ${forecastArray[i].weather[0].description}</div>
					<div class="data-point">Pressure: ${forecastArray[i].main.pressure} mb</div>
					<div class="data-point">Wind: ${forecastArray[i].wind.speed} mph</div>
					</div>`;

				if (counter % 4 === 3) {
                	forecastString += `</div>`;
                }

				$('#strings-written-here').append(forecastString);
			}
		};

});