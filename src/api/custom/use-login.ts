import { useState } from "react";

import { baseURL } from "../mutator/custom-fetch";

type Response = {
  access_token: string;
  token_type: string;
};

type Params = {
  body: {
    username: string;
    password: string;
  };
  onSuccess?: (response: Response) => void;
  onError?: (error: Error) => void;
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const onFetch = async ({ body, onSuccess, onError }: Params) => {
    setIsLoading(true);
    fetch(`${baseURL}/api/v1/users/login`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        grant_type: "password",
        username: body.username,
        password: body.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data: Response = await response.json();
        localStorage.setItem("token", data.access_token);
        onSuccess?.(data);
        setError(false);
      })
      .catch((error) => {
        onError?.(error);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    onFetch,
    isLoading,
    error,
  };
};
