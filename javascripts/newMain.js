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
        FbApi.addPreset();


        // let newPreset = {
        //     zip: zipInput,
        //     city: cityName
        // };
        // if (editID.length > 0) {
        //     FbApi.editTodo(apiKeys, newPreset, editID).then(() => {
        //         $(".new-container").addClass("hide");
        //         $(".list-container").removeClass("hide");
        //         FbApi.writeDom(apiKeys);
        //         $("#add-todo-text").val("");
        //         editID = "";
        //     }).catch((error) => {
        //         console.log("Addtodo error", error);
        //     });
        // } else {
        //     FbApi.addTodo(apiKeys, newPreset).then(() => {
        //         $(".new-container").addClass("hide");
        //         $(".list-container").removeClass("hide");
        //         FbApi.writeDom(apiKeys);

        //         $("#add-todo-text").val("");
        //     }).catch((error) => {
        //         console.log("Addtodo error", error);
        //     });
        // }



	});


// clearing inputs upon action

    let clearLogin = () => {
        let email = $("").val();
        let password = $("").val();
        let username = $("").val();
    };

});