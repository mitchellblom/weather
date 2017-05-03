$(function() {

	let apiKeys = {};


	FbApi.firebaseCredentials().then((keys) => {
	        apiKeys = keys;
	        firebase.initializeApp(apiKeys);
	        FbApi.writeDom(apiKeys);
	    }).catch((error) => {
	        console.log("key errors", error);
	    });


}