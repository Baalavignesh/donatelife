const createRequest = async (request: any) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/bank/createbankrequest`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

const getAllRequests = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/bank/getbankrequest/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};      

export { createRequest, getAllRequests };