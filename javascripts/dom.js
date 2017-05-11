var FbApi = ((domIife) => {

    domIife.writePresetsToDom = (keys) => {
        console.log("inside writePresetsToDom");
        FbApi.getAllUserPresets(keys).then((results) => {
            $('#saved-searches').html("");
            let savedPresets = results;
            let stringToWrite = "";
            savedPresets.forEach((preset) => {
                let presetType = preset.type;
                console.log("each preset that should then write to dom: ", preset);
                stringToWrite += `<div class="row presetString" id="presetType">`;
                stringToWrite += `<h4 class="col-xs-10">${preset.city}</h4>`;
                stringToWrite += `<div class="col-xs-10">${preset.type}</div>`;
                stringToWrite += `<div class="col-xs-10">${preset.date}</div>`;
                stringToWrite += `<div class="col-xs-2">`;
                stringToWrite += `<button class="btn btn-submit delete" id="${preset.uid}">Delete</button>`;
                stringToWrite += `<button class="btn btn-submit loadPreset">Load</button>`;
                stringToWrite += `</div></div>`;
            });
            $('#saved-searches').html(stringToWrite);
        }).catch((error) => {
            console.log("writedom error", error);
        });
    };

    domIife.createLogoutButton = (apiKey) => {
        let uid = FbApi.credentialsCurrentUser().uid;
        FbApi.getUser(apiKey, uid).then((user) => {
            console.log("dom user: ", user);
            let logoutButton = `<button class="btn btn-primary" id="logoutButton">LOGOUT ${user.username}</button>`;
            $('#logout-container').html(logoutButton);
        });
    };

    return domIife;
})(FbApi || {});