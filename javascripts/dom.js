var FbApi = ((domIife) => {

    domIife.writeDom = (keys) => {
        FbApi.getTodos(keys).then((results) => {
            let savedForecasts = results;
            todos.forEach((todo) => {
                console.log("making it to write dom");
            });

            $('#strings-written-here').html(doneString);

            // domIife.countTask();
        }).catch((error) => {
            console.log("writedom error", error);
        });
    };

    return domIife;
})(FbApi || {});