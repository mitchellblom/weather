const isNumberKey = (event) => {
          var charCode = (event.which) ? event.which : event.keyCode;
          if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
             return false;

          return true;
    }

$(document).ready(function(){

	const apiKey = '';								// key goes here

	let zipInput = $('#zip-input');
	let zipToPromise;
	let cityName;

	let currentWeather = [];
	let threeDayForecast = [];
	let sevenDayForecast = [];

		$('body').on('click', '#current', () => {
			zipToPromise = zipInput[0].value;
			zipToValidate(zipToPromise);
		});

		$('body').on('click', '#three-day', () => {
			// if (currentWeather !== []) {
				writeForecastArray(threeDayForecast);
			// }
			// else {
			// 	console.log("else here")
			// }
		});

		$('body').on('click', '#seven-day', () => {
			writeForecastArray(sevenDayForecast);
		});

		$("#zip-input").keyup(() => {
	        if (window.event.keyCode === 13) {
				zipToPromise = zipInput[0].value;
				zipToValidate(zipToPromise);
	        }
	    });

		const zipToValidate = (zip) => {
	        if (zip.length == 5) {							// add numbers only validation here
	            console.log('zip validated');
	            loadWeatherData(zipToPromise);
	        } else {
	            console.log('Please enter valid 5 digit zipcode.');
	        }
	    };

		const loadCurrent = (zip) => {
			return new Promise ((resolve, reject) => {
				$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${apiKey}
				`)
				.done((data) => { 
					resolve(data); 
				})		// this result is getting back to line 8 for the then()
				.fail((error) => { 
					reject(error); 
					alert("Looks like that zipcode isn't recognized."); 
				});
			});
		}

		const loadForecast = (zip) => {
			return new Promise ((resolve, reject) => {
				$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&APPID=${apiKey}
				`)
				.done((data) => { 
					resolve(data); 
				})						// this result is getting back to line 8 for the then()
				.fail((error) => { 
					reject(error);
					// unrecognized zipcode already communicated to user in loadCurrent function
				});
			});
		};

		const makeAndWriteCurrentArray = (cityInfo) => {
			$('#strings-written-here').html('');
			let currentString = 
				`<div class="data-point-container">
				<div class="data-point">City: ${cityInfo.name}</div>
				<div class="data-point">Temperature: ${cityInfo.main.temp}</div>
				<div class="data-point">Conditions: ${cityInfo.weather[0].description}</div>
				<div class="data-point">Pressure: ${cityInfo.main.pressure}</div>
				<div class="data-point">Wind Speed: ${cityInfo.wind.speed}</div>
				</div>`;
			$('#strings-written-here').html(currentString);
		};

		const makeForecastArrays = (cityInfo) => {
			cityName = cityInfo.city.name;
			threeDayForecast = cityInfo.list.slice(0,3);
			sevenDayForecast = cityInfo.list.slice(0,7);
		};

		const writeForecastArray = (forecastArray) => {
			console.log('forecastArray', forecastArray);
			console.log('forecastArray[0]', forecastArray[0]);
			$('#strings-written-here').html('');
			for (var i = 0; i < forecastArray.length; i++) {
				let forecastString = '';
				forecastString += 
					`<div class="data-point-container">
					<div class="data-point">City: ${cityName}</div>
					<div class="data-point">Temperature: ${forecastArray[i].main.temp}</div>
					<div class="data-point">Conditions: ${forecastArray[i].weather[0].description}</div>
					<div class="data-point">Pressure: ${forecastArray[i].main.pressure}</div>
					<div class="data-point">Wind Speed: ${forecastArray[i].wind.speed}</div>
					</div>`;
				$('#strings-written-here').append(forecastString);
			};
		};

		const loadWeatherData = (zip) => {
			Promise.all([loadCurrent(zip), loadForecast(zip)])
				.then((result) => {							// upon change, adjust origin line for reference
				makeAndWriteCurrentArray(result[0]);
				makeForecastArrays(result[1]);			
			})
			.catch((error) => {
				console.log(error);
			});
		};




});