$(function() {

	let apiKeys = {};

// views

	$("#new-preset").click(() => {
		$('#strings-written-here').html("");
        $(".list-container").addClass("hide");
        $(".input-zip").removeClass("hide");
    });

    $("#list-presets").click(() => {
        $(".input-zip").addClass("hide");
        $(".list-container").removeClass("hide");
    });

// fb credentials

	FbApi.firebaseCredentials().then((keys) => {
        apiKeys = keys;
        firebase.initializeApp(apiKeys);
    }).catch((error) => {
        console.log("key errors", error);
    });

// register new user

 $("#registerButton").click(() => {
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let username = $("#inputUsername").val();
        let user = {
            email,
            password
        };
        FbApi.registerUser(user).then((response) => {
            let newUser = {
                uid: response.uid,
                username: username
            };
            FbApi.addUser(apiKeys, newUser).then((response) => {
                FbApi.loginUser(user).then((response) => {
                    clearLogin();
                    $('#login-container').addClass('hide');
                    $('.main-container').removeClass('hide');
       				FbApi.createLogoutButton(apiKeys);
       				clearLogin();
                }).catch((error) => {
                    console.log("error in loginUser: ", error);
                });
            }).catch((error) => {
                console.log("error in addUser", response);
            });
        }).catch((error) => {
            console.log("error in registerUser", error);
        });
    });

// login existing user

	$("#loginButton").click(() => {
        let email = $('#inputEmail').val();
        let password = $("#inputPassword").val();

        let user = {
            email,
            password
        };
        FbApi.loginUser(user).then((response) => {
            clearLogin();
            $('#login-container').addClass('hide');
            $('.main-container').removeClass('hide');
            FbApi.writePresetsToDom(apiKeys);
       		FbApi.createLogoutButton(apiKeys);
        	clearLogin();
        }).catch((error) => {
            console.log("error in loginUser: ", error);
        });
	});

// load preset from saved searches

	$("body").on("click", ".loadPreset", (e) => {										
        let loadThisId = $(event.target).closest(".btn").siblings(".btn")[0].id;
        FbApi.getSavedPreset(apiKeys, loadThisId)
        	.then((data) => {
        		let type = data.type;
        		if (type === "Current") {
        			FbApi.loadCurrent(data.zip).then((data) => {
        				FbApi.makeAndWriteCurrentWeatherString(data);
        			});
        		} else {
        			FbApi.loadForecast(data.zip).then((cityInfo) => {
        				FbApi.makeForecastArrays(cityInfo);}).then((data) => {
        				if (type === "Three Day") {
							FbApi.writeForecastArray(threeDayForecast);	
        				} else {
        					FbApi.writeForecastArray(sevenDayForecast);	
        				}
        			});
        		}
        		$(".list-container").addClass("hide");
        		$(".input-zip").removeClass("hide");
        	});
	});
	
// save preset

	$("#savePresetButton").click(() => {
        let date = new Date();
        let newPreset = {
            	city: cityName,
            	date: date,
            	type: searchType,
        		uid: FbApi.credentialsCurrentUser().uid,
            	zip: zipInput.val()
        };
        if (zipInput.val().length > 0) {
            FbApi.addPreset(apiKeys, newPreset).then(() => {
                $(".input-zip").addClass("hide");
                $(".list-container").removeClass("hide");
                FbApi.writePresetsToDom(apiKeys);
                $("#zip-input").val("");
                zipInput = "";
            }).catch((error) => {
                console.log("addPreset error", error);
            });
        } else {
            alert("Have you entered a search to save?");
        }
	});

// delete preset

    $(".list-container").on("click", ".delete", (e) => {
    	console.log(e.target);
        FbApi.deletePreset(apiKeys, e.target.id).then(() => {
            FbApi.writePresetsToDom(apiKeys);
        }).catch(error => {
            console.log("error in deletePreset", error);
        });
    });


// clearing inputs upon action

    let clearLogin = () => {
        let email = $("#inputEmail").val("");
        let password = $("#inputPassword").val("");
        let username = $("#inputUsername").val("");
    };

// logout button

    $('#logout-container').on('click', '#logout-link', () => {
        clearLogin();
        FbApi.logoutUser();
        $('#login-container').removeClass('hide');
        $('.main-container').addClass('hide');
    });

});