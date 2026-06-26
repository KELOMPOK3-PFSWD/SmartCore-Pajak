import { BASE_URL } from "./baseUrl";

type ApiOptions = {
  method?: string;
  data?: any;
  headers?: HeadersInit;
};

export default async function api(
  endpoint: string,
  options: ApiOptions = {}
) {
  const { method = "GET", data, headers = {} } = options;

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  // Handle response tanpa body (204 No Content)
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  const result = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      result?.error ||
      result?.message ||
      "Request Failed"
    );
  }

  return result;
}