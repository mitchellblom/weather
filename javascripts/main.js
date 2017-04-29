$(document).ready(function(){

const apiKey = '';								// key goes here

let zipInput = $('#zip-input');
let zipToPromise;

let currentWeather = [];
let threeDayForecast = [];
let sevenDayForecast = [];


	$('body').on('click', '.submit-zip', () => {
		zipToPromise = zipInput[0].value;
		zipToValidate(zipToPromise);
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

	const makeCurrentArray = (cityInfo) => {
		console.log("cityInfo in makeCurrentArray", cityInfo);
		// console.log("name: ", cityInfo.name);
		// console.log("temp: ", cityInfo.main.temp);
		// console.log("conditions: ", cityInfo.weather[0].description);
		// console.log("pressure: ", cityInfo.main.pressure);
		// console.log("wind speed: ", cityInfo.wind.speed);
		$('#strings-written-here').html("in makeCurrentArray");
	}

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