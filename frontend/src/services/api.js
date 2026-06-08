const API_URL = "/api";

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    ...options.headers,
                },
            }
        );
        // console.log(response);
        return response.json();
    } catch (err) {
        console.error("Network error:", err);
        throw new Error("Network error. Please try again.");
    }

}