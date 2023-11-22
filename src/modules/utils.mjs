export function fetchData(url, callback, method, body) {
	const headers = { Accept: "application/json" };
	if (method === "POST" || method === "PUT") {
		headers["Content-Type"] = "application/json";
	}

	const options = {
		method: method || "GET",
		headers: headers,
	};

	if (body) {
		options.body = JSON.stringify(body);
	}

	fetch(url, options)
		.then((response) => response.json())
		.then((data) => callback(data))
		.catch((error) => {
			if (error.status) {
				error.fullError.then((e) => console.log(e.detail));
			} else {
				console.log("Network error");
			}
		});
}
