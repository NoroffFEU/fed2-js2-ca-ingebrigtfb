import { API_SOCIAL_PROFILES } from "../constants";
import { headers as getHeaders } from "../headers";


export async function readProfile(username) {
  const userProfile = username || user?.name;

  const url = `${API_SOCIAL_PROFILES}/${userProfile}`;

  const token = localStorage.getItem("token");

  const requestHeaders = getHeaders(token);

  const response = await fetch(url, {
    headers: requestHeaders,
  });

  if (response.ok) {
    const { data } = await response.json();
    console.log(data);
    return data;
  }
  throw new Error(`Could not fetch profile for user with name: ${userProfile}`);
}

//export async function readProfiles(limit, page) {}