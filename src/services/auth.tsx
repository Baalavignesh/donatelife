const LoginUser = async (username: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};


const registerUser = async (userData: any) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  

  return response.json();
};


const registerDonar = async (orgData: any) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/registerdonor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orgData),
  });

  

  return response.json();
};

export { LoginUser, registerUser, registerDonar };
