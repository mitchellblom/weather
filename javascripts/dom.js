var FbApi = ((domIife) => {

    domIife.writePresetsToDom = (keys) => {
        FbApi.getPresets(keys).then((results) => {
            let savedPresets = results;
            savedPresets.forEach((todo) => {
                console.log("each todo that should then write to dom: ", todo);

            });

            // $('#strings-written-here').html(doneString);

        }).catch((error) => {
            console.log("writedom error", error);
        });
    };

    //     domIife.createLogoutButton = (apiKey) => {
    //     let uid = FbApi.credentialsCurrentUser().uid;
    //     FbApi.getUser(apiKey, uid).then((user) => {
    //         console.log("dom user: ", user);
    //         let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT ${user.username}</button>`;
    //         $('#logout-container').html(logoutButton);
    //     });
    // };

    return domIife;
})(FbApi || {});