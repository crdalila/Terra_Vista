 const BASE_URL = "http://localhost:3003"

async function fetchData(route, method = "GET", data = null) {
    const url = BASE_URL + route;
    const options = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type" : "application/json"
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log("ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",responseData)
    if (!response.ok) {
        responseData.status = response.status;
    }
    return responseData;
}


export default fetchData;