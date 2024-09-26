import { API_AUTH_LOGIN } from "../constants";

export async function login({ email, password }) {
  const response = await fetch(API_AUTH_LOGIN, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const { data } = await response.json(); 
    const { accessToken: token, ...user } = data; 
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); 
    return data;
  }
  throw new Error("Login failed");
}
