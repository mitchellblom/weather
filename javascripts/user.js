var FbApi = ((newUserIife) => {

	newUserIife.addUser = (keys, newUser) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${keys.databaseURL}/users.json`,
				data: JSON.stringify(newUser)
			}).done((response) => {
				resolve(response);
			}).fail((error) => {
				reject(error);
			});
		});
	};

	return newUserIife;
})(FbApi || {});