var FbApi = ((presetIife) => {

	presetIife.getPresets = (apiKeys) => {
		let items = [];
		return new Promise((resolve, reject) => {
			$.ajax(`${apiKeys.databaseURL}/items.json`)
			.done(data => {
				let response = data;
				Object.keys(response).forEach((key) => {
					response[key].id = key;
					items.push(response[key]);
				});
				resolve(items);
			})
			.fail(error => {reject(error);});
		});
	};

	presetIife.addPreset = (apiKeys, newPreset) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: "POST",
				url: `${apiKeys.databaseURL}/items.json`,
				data: JSON.stringify(newPreset)
			})
			.done(() => {
				resolve();
			})
			.fail((error) => {
				reject(error);
			});
		});
	};

	presetIife.deletePreset = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: "DELETE",
				url: `${apiKeys.databaseURL}/items/${id}.json`
			})
			.done(() => {
				resolve();
			})
			.fail((error) => {
				reject(error);
			});
		});
	};

	// presetIife.editPreset = (apiKeys, newPreset) => {						/// may not need this
	// 	return new Promise ((resolve, reject) => {
	// 		$.ajax({
	// 			method: "PUT",
	// 			url: `${apiKeys.databaseURL}/items/${id}.json`,
	// 			data: JSON.stringify(todo)
	// 		})
	// 		.done(() => {
	// 			resolve();
	// 		})
	// 		.fail((error) => {
	// 			reject(error);
	// 		});
	// 	});
	// };

	return presetIife;
})(FbApi || {});