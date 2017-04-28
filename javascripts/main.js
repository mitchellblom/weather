$(document).ready(function(){

console.log("main js working");

const apiKey = '';								// key goes here

let zipInput = $("#zip-input");
let zipToPromise;

	$('body').on('click', '#submit-zip', (e) => {
		// console.log(e.target.innerHTML);
		console.log(zipInput[0].value);
		zipToPromise = zipInput[0].value;
		loadCity(zipToPromise).then((result) => {			// upon change, adjust origin line for reference
			console.log(result);
		// 	writePlaceToDom(results);
		});
		// loadPlaces(e.target.innerHTML).then((data) => {
		// 	results = data.results;
		// 	})
		// .catch((error) => {
		// 	console.log(error);
		// });
	});

	const loadCity = (zip) => {
		console.log(zip);
		console.log(apiKey);
		return new Promise ((resolve, reject) => {
			console.log(zipToPromise);
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipToPromise},us&APPID=${apiKey}
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