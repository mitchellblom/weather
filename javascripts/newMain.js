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
        FbApi.writeDom(apiKeys);
    }).catch((error) => {
        console.log("key errors", error);
    });

});