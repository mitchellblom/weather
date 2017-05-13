var FbApi = ((api) => {

	api.loadCurrent = (zip) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${weatherApiKey}
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

	api.makeAndWriteCurrentWeatherString = (cityInfo) => {
		$('#strings-written-here').html('');
		cityName = cityInfo.name;
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


	api.loadForecast = (zip) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&APPID=${weatherApiKey}
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

	api.makeForecastArrays = (cityInfo) => {
		counter++;
		cityName = cityInfo.city.name;
		threeDayForecast = cityInfo.list.slice(0,3);
		sevenDayForecast = cityInfo.list.slice(0,7);
	};

	api.writeForecastArray = (forecastArray) => {
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

	    return api;
})(FbApi || {});