var FbApi = ((api) => {

	api.loadCurrent = (zip) => {
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

	    return api;
})(FbApi || {});