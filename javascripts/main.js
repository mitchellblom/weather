$(document).ready(function(){

console.log("main js working");

const apiKey = '';								// key goes here

	$('body').on('click', 'li', (e) => {
		console.log(e.target.innerHTML);
		loadCity(e.target.innerHTML).then((data) => {			// upon change, adjust origin line for reference
			console.log(data);
		});
		// loadPlaces(e.target.innerHTML).then((data) => {
		// 	results = data.results;
		// 		writePlaceToDom(results);
		// 	})
		// .catch((error) => {
		// 	console.log(error);
		// });
	});

	const loadCity = (city) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111 
			`)
			.done((data) => {
				resolve(data.result);		// this result is getting back to line 8 for the then()
			})
			.fail((error) => {
				reject(error);
			});
		});
	};

});