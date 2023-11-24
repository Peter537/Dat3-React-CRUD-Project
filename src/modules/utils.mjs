export async function get(url, callback) {
  await fetchData(url, callback);
}

export async function post(url, callback, body) {
  await fetchData(url, callback, "POST", body);
}

export async function put(url, body) {
  await fetchData(url, () => {}, "PUT", body);
}

export async function deleteData(url) {
  await fetchData(url, () => {}, "DELETE");
}

export async function fetchData(url, callback, method, body) {
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

  await fetch(url, options)
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
