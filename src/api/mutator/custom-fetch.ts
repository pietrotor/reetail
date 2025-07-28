export const baseURL = import.meta.env.VITE_BACKEND_URL;

type Params = Record<string, string | number | boolean>;

export async function customFetch<T>(
  {
    url,
    method,
    params,
    data,
    headers: requestHeaders,
    ...rest
  }: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    params?: any;
    data?: unknown;
    responseType?: string;
    signal?: AbortSignal;
  },
  options?: {
    headers?: Record<string, string>;
  }
): Promise<T> {
  // Create the full base URL by combining the baseUrl and the relative url
  const fullUrl = new URL(url, baseURL);
  const token = localStorage.getItem("token");

  if (params) {
    // Create a URLSearchParams object from the params object
    const searchParams = convertUrlSearchParams(params);
    // Append the search parameters to the full URL
    fullUrl.search = searchParams.toString();
  }

  let body: BodyInit | undefined;

  if (data instanceof FormData) {
    body = data;
  } else if (data) {
    body = JSON.stringify(data);
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  let mergedHeaders: HeadersInit | undefined = {
    ...defaultHeaders,
    ...requestHeaders,
    ...options?.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  // If it's a FormData, remove the Content-Type header
  if (data instanceof FormData) {
    delete mergedHeaders["Content-Type"];
  }

  const response = await fetch(fullUrl, {
    method,
    body,
    headers: mergedHeaders,
    signal: rest.signal,
  });

  let json;

  try {
    if (response.headers.get("content-type")?.includes("application/json")) {
      json = await response.json();
    } else {
      json = await response.text();
    }
  } catch (error) {
    console.error({ error });
  }

  if (!response.ok) {
    console.error({ error: json });
    const message = json.message || json.detail || "An error occurred";
    throw new Error(message);
  }

  return json;
}

export default customFetch;

// // In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
// export type ErrorType<Error> = Error;
// // In case you want to wrap the body type (optional)
// // (if the custom instance is processing data before sending it, like changing the case for example)
// export type BodyType<BodyData> = BodyData;

// https://stackoverflow.com/questions/59889140/different-output-from-encodeuricomponent-vs-urlsearchparams
function fixedEncodeURIComponent(str: string | number | boolean) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function convertUrlSearchParams(params: Params) {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${fixedEncodeURIComponent(key)}=${fixedEncodeURIComponent(value)}`
    )
    .join("&");
}
