export async function apiRequestPost(apiName, payload, authToken = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(apiName, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in API request (POST):", error);
    throw error;
  }
}

export async function apiRequestPost1(apiName, payload, authToken = null) {
  try {
    const headers = {
      // "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    console.log("payload",payload)
    console.log("authToken",authToken)
    const response = await fetch(apiName, {
      method: "POST",
      headers: headers,
      body: payload,
    });

    return await response.json();
  } catch (error) {
    console.error("Error in API request (POST):", error);
    throw error;
  }
}
export async function apiRequestGet(apiName, authToken = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(apiName, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API request (GET):", error);
    throw error;
  }
}
