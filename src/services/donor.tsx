const getSpecificBankRequest = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/donor/getspecificbankrequest/${}`, {
        method: "GET",
    });
    return response.json();
};

export { getSpecificBankRequest };