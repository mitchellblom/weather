var FbApi = ((oldFbApi) => {

	oldFbApi.registerUser = (credentials) => {
		console.log("making it here");
		return new Promise ((resolve, reject) => {
				firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
				.then((authData) => {
					resolve(authData);
				}).catch((error) => {
					reject(error);
				});
		});
	};

	oldFbApi.loginUser = (creds) => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	oldFbApi.credentialsCurrentUser = () => {
		return firebase.auth().currentUser;
	};

	oldFbApi.logoutUser = () => {
		firebase.auth().signOut();
		$('#logout-container').html("");
	};

	return oldFbApi;
})(FbApi || {});