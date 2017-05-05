var FbApi = ((domIife) => {

    domIife.writePresetsToDom = (keys) => {
        FbApi.getPresets(keys).then((results) => {
            let savedPresets = results;
            let stringToWrite = "";
            savedPresets.forEach((preset) => {
                console.log("each preset that should then write to dom: ", preset);
                    stringToWrite += `<div class="presetString">`;
                    stringToWrite += `<h4 class="col-xs-10 task">${preset.city}</h4>`;
                    stringToWrite += `<div class="col-xs-10 task">${preset.type}</div>`;
                    stringToWrite += `<div class="col-xs-10 task">${preset.date}</div>`;
                    stringToWrite += `<div class="col-xs-2">`;
                    stringToWrite += `<button class="btn btn-submit delete" id="${preset.id}">Delete</button>`;
                    stringToWrite += `<button class="btn btn-submit">Load</button>`;
                    stringToWrite += `</div>`;
                if (preset.type === "Three Day" || preset.type === "Three Day") {
                    $('#saved-forecasts').html(stringToWrite);
                } else {
                    $('#saved-current').html(stringToWrite);
                }
            });
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