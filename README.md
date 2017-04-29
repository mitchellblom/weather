# NSS Weather API Exercise

![Splashpage]()

<hr>

## Summary
Connecting to an online **API** using an access key. Calling the data via **AJAX** and presenting it in a user-friendly format styled with basic **SASS CSS**. Continued use of **ES6** syntax.

<hr>

## To Access Necessary Libaries:
 - Pull down project
 - cd into lib
 - Run command "bower install"
 - Run command "npm install"

<hr>

## Requirements in Story Form

Use the OpenWeatherMap API to build an application that meets the following criteria.

given a user wants to view weather information
when the user visits your initial view
then there should be an input field to accept a zip code value

given a user wants to view weather information
when the user visits your initial view
then there should be a submit button next to the zip code field

given a user has entered in some text into the zip code field
when the user presses the enter key
or the user clicks the submit button
then the value should be validated as a zip code (5 digit number)

given the user has entered a valid zip code
when the user presses the enter key
or clicks the submit button
then the current weather for the provided zip code should be displayed, which includes

 - Temperature
 - Conditions
 - Air pressure
 - Wind speed
 - An affordance to view the forecast for the current day, the next three days, or the next 7 days
 - given the user is viewing the current forecast
 - when the user clicks on the link to view the 3 day forecast
 - then the current data (see above), and the data for the next 3 days should be displayed

given the user is viewing the current forecast
when the user clicks on the link to view the 7 day forecast
then the current data (see above), and the data for the next 7 days should be displayed

<hr>
