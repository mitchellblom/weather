$(document).ready(function(){

const apiKey = '';								// key goes here

let zipInput = $('#zip-input');
let zipToPromise;

let currentWeather = [];
let threeDayForecast = [];
let sevenDayForecast = [];

	$('body').on('click', '#current', () => {
		zipToPromise = zipInput[0].value;
		zipToValidate(zipToPromise);
	});

	$('body').on('click', '#three-day', () => {
		writeForecastArray(threeDayForecast);
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

    // onkeypress="return isNumberKey(evt)			// for html if i choose to use inline validation

	// const isNumberKey = (evt) => {
 //          var charCode = (evt.which) ? evt.which : evt.keyCode;
 //          if (charCode != 46 && charCode > 31 
 //            && (charCode < 48 || charCode > 57))
 //             return false;

 //          return true;
 //    }


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
		console.log("cityInfo in makeAndWriteCurrentArray", cityInfo);
		$('#strings-written-here').html('');
		let currentString = 
			`<div class="current-conditions">
			<div class="data-point">City: ${cityInfo.name}</div>
			<div class="data-point">Temperature: ${cityInfo.main.temp}</div>
			<div class="data-point">Conditions: ${cityInfo.weather[0].description}</div>
			<div class="data-point">Pressure: ${cityInfo.main.pressure}</div>
			<div class="data-point">Wind Speed: ${cityInfo.wind.speed}</div>
			</div>`;
		$('#strings-written-here').html(currentString);
	};

	const makeForecastArrays = (cityInfo) => {
		console.log("cityInfo in makeForecastArrays", cityInfo);
		threeDayForecast = cityInfo.list.slice(0,3);
		console.log(threeDayForecast);
		sevenDayForecast = cityInfo.list.slice(0,7);
		console.log(sevenDayForecast);
	};

	const writeForecastArray = (forecastArray) => {
		console.log('inside writeForecastArray');
		$('#strings-written-here').html('');
		let forecastString = '';
		for (var i = 0; i < forecastArray.length; i++) {
			forecastString += 
				`<div class="current-conditions">
				<div class="data-point">City: ${forecastArray[i].city.name}</div>
				<div class="data-point">Temperature: ${forecastArray[i].list[0].main.temp}</div>
				<div class="data-point">Conditions: ${forecastArray[i].list[0].weather[0].description}</div>
				<div class="data-point">Pressure: ${forecastArray[i].list[0].main.pressure}</div>
				<div class="data-point">Wind Speed: ${forecastArray[i].list[0].wind.speed}</div>
				</div>`;
			}
		$('#strings-written-here').html(forecastString);
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