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
        }).catch((error) => {
            console.log("error in loginUser: ", error);
        });
	});

// save preset

	$("#savePresetButton").click(() => {
        let date = new Date;
        let newPreset = {
            	zip: zipInput.val(),
            	city: cityName,
            	type: searchType,
            	date: date
        		// uid: 
        };
        if (zipInput.val().length > 0) {
            FbApi.addPreset(apiKeys, newPreset).then(() => {						////////////
                $(".input-zip").addClass("hide");
                $(".list-container").removeClass("hide");
                FbApi.writePresetsToDom(apiKeys);
        		console.log("newPreset before: ", newPreset);
                $("#zip-input").val("");
                zipInput = "";
            }).catch((error) => {
                console.log("addPreset error", error);
            });
        } else {
            alert("Have you entered a search to save?");
        }
	});


// clearing inputs upon action

    let clearLogin = () => {
        let email = $("").val();
        let password = $("").val();
        let username = $("").val();
    };

});