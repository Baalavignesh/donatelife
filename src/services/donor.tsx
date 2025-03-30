const getSpecificBankRequest = async (bloodGroup: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/user/getspecificbankrequest/${bloodGroup}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export { getSpecificBankRequest };