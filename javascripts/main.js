///////////// global variable ///////////////////////////////////////

let zipInput = $('#zip-input');

///////////// dynamic zipcode validation from html /////////////////

const zipDynamicValidate = (event) => {
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

	const apiKey = '';											// key goes here

	let zipToPromise;
	let cityName;

	let threeDayForecast = [];
	let sevenDayForecast = [];

		$("#zip-input").keyup(function() {
			if (window.event.keyCode === 13) {
	 			submitForCurrent();
			}
		 });

		$('body').on('click', '#current', () => {
			submitForCurrent();
		});

		$('body').on('click', '#three-day', () => {
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
				});
			});
		};

		const makeAndWriteCurrentWeatherString = (cityInfo) => {
			$('#strings-written-here').html('');
			let currentString = 
				`<div class="data-point-container col-lg-4">
				<div class="data-point">City: ${cityInfo.name}</div>
				<div class="data-point">Temp: ${cityInfo.main.temp}°F</div>
				<div class="data-point">Conditions: ${cityInfo.weather[0].description}</div>
				<div class="data-point">Pressure: ${cityInfo.main.pressure} mb</div>
				<div class="data-point">Wind Speed: ${cityInfo.wind.speed} mph</div>
				</div>`;
			$('#strings-written-here').html(currentString);
		};

		const makeForecastArrays = (cityInfo) => {
			cityName = cityInfo.city.name;
			threeDayForecast = cityInfo.list.slice(0,3);
			sevenDayForecast = cityInfo.list.slice(0,7);
		};

		const writeForecastArray = (forecastArray) => {
			$('#strings-written-here').html('');
				let daysOutString = '';
			for (var i = 0; i < forecastArray.length; i++) {
				if (i === 0) {
					daysOutString = "Tomorrow";
				} else {
					daysOutString = (i + 1) + " days away";
				}
				let forecastString = '';
				forecastString += 
					`<div class="data-point-container col-lg-4">
					<div class="data-point">${daysOutString}</div>
					<div class="data-point">City: ${cityName}</div>
					<div class="data-point">High Temp: ${forecastArray[i].main.temp}°F</div>
					<div class="data-point">Conditions: ${forecastArray[i].weather[0].description}</div>
					<div class="data-point">Pressure: ${forecastArray[i].main.pressure} mb</div>
					<div class="data-point">Wind Speed: ${forecastArray[i].wind.speed} mph</div>
					</div>`;
				$('#strings-written-here').append(forecastString);
			}
		};



});