 const BASE_URL = "http://localhost:3004"

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
    let responseData;
    
    try {
        responseData = await response.json();
    } catch (error) {
        responseData = await response.text();
    }

    if (!response.ok) {
        return {
            error: true,
            status: response.status,
            message: typeof responseData === "string" ? responseData : responseData.message || 'Unknown error'
        };
    }
    
    return responseData;
}


export default fetchData;