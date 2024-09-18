import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("858ebf25-4e51-44a2-943a-4ace96dab3f5", API_KEY);
  }

  return headers;
}
