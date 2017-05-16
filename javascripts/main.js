// global variables

const weatherApiKey = '';									// key goes here

let zipInput = $('#zip-input');
let cityName;
let searchType;
let counter = 0;

let zipToPromise;

let threeDayForecast = [];
let sevenDayForecast = [];

// dynamic zipcode validation from html

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

// promise and weather dom functions

$(document).ready(function(){

		$("#zip-input").keyup(function() {
			if (window.event.keyCode === 13) {
	 			submitForCurrent();
			}
		 });

		$('body').on('click', '#current', () => {
			searchType = "Current";
			submitForCurrent();
		});

		$('body').on('click', '#three-day', () => {
			searchType = "Three Day";
			zipToPromise = zipInput[0].value;
			FbApi.loadForecast(zipToPromise).then((result) => {
				FbApi.makeForecastArrays(result);}).then(() => {
					FbApi.writeForecastArray(threeDayForecast);
				})
				.catch((error) => {
					console.error(error);
				});
		});

		$('body').on('click', '#seven-day', () => {
			searchType = "Seven Day";
			zipToPromise = zipInput[0].value;
			FbApi.loadForecast(zipToPromise).then((result) => {
				FbApi.makeForecastArrays(result);}).then(() => {
					FbApi.writeForecastArray(sevenDayForecast);
				})
				.catch((error) => {
					console.error(error);
				});
		});

		const submitForCurrent = () => {
			if (weatherApiKey === '') {
				alert('Remember to enter an API key.');
			}
			zipToPromise = zipInput[0].value;
			FbApi.loadCurrent(zipToPromise).then((result) => {
				FbApi.makeAndWriteCurrentWeatherString(result);})
				.catch((error) => {
					console.error(error);
				});
		};

});