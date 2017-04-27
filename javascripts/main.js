$(document).ready(function(){

console.log("main js working");

const apiKey = '';								// key goes here

	$('body').on('click', 'li', (e) => {
		// console.log(e.target.innerHTML);
		loadCity("Test City").then((result) => {			// upon change, adjust origin line for reference
			console.log(result);
		});
		// loadPlaces(e.target.innerHTML).then((data) => {
		// 	results = data.results;
		// 		writePlaceToDom(results);
		// 	})
		// .catch((error) => {
		// 	console.log(errsor);
		// });
	});

	const loadCity = (city) => {
		console.log(city);
		console.log(apiKey);
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=${apiKey}
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










});