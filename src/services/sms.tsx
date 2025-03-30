const sendSMS = async (data: any) => {
    console.log(data)
    console.log(`${import.meta.env.VITE_BACKEND_API}/sms/send`)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/sms/send`, {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
    return response.json();
};

export default sendSMS;
