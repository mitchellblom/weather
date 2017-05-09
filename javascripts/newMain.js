$(function() {

	let apiKeys = {};

// views

	$("#new-preset").click(() => {
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
        // console.log("api keys: ", apiKeys);
        // FbApi.writeDom(apiKeys);
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
                    // FbApi.writeDom(apiKeys);
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
            // FbApi.writeDom(apiKeys);
       		FbApi.createLogoutButton(apiKeys);
        	clearLogin();
        }).catch((error) => {
            console.log("error in loginUser: ", error);
        });
	});

// save preset

	$("#savePresetButton").click(() => {
        let date = new Date();
        console.log("city name at savePresetButton press: ", cityName);
        let newPreset = {
            	city: cityName,
            	date: date,
            	type: searchType,
        		uid: firebaseCredentials(),
            	zip: zipInput.val(),
            	
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

    $('#logout-container').on('click', '#logoutButton', () => {
        clearLogin();
        FbApi.logoutUser();
        $('#login-container').removeClass('hide');
        $('.main-container').addClass('hide');
    });

});