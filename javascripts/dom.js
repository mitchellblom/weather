var FbApi = ((dom) => {

    dom.writePresetsToDom = (keys) => {
        FbApi.getAllUserPresets(keys).then((results) => {
            $('#saved-searches').html("");
            let savedPresets = results;
            let stringToWrite = "";
            savedPresets.forEach((preset) => {
                let presetType = preset.type;
                stringToWrite += `<div class="row presetString" id="presetType">`;
                stringToWrite += `<h4 class="col-xs-10">${preset.city} - ${preset.type}</h4>`;
                stringToWrite += `<button class="btn btn-submit delete" id="${preset.uid}">Delete</button>`;
                stringToWrite += `<button class="btn btn-submit loadPreset">Load</button>`;
                stringToWrite += `</div>`;
            });
            $('#saved-searches').html(stringToWrite);
        }).catch((error) => {
            console.log("writedom error", error);
        });
    };

    dom.createLogoutButton = (apiKey) => {
        let uid = FbApi.credentialsCurrentUser().uid;
        FbApi.getUser(apiKey, uid).then((user) => {
            let logoutButton = `Logout ${user.username}`;
            $('#logout-link').html(logoutButton);
        });
    };

    return dom;
})(FbApi || {});