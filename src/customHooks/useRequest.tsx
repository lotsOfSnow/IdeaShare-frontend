import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { HttpMethod } from "../types/httpMethods";

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorText {
  message: string;
  errors: ValidationError[];
}

// use omit headers if sending form-data
function useRequest(
  // eslint-disable-next-line no-shadow
  method: HttpMethod,
  endpoint: string,
  authorize?: boolean,
  omitHeaders?: boolean
) {
  const selectAuth = (state: RootState) => state.auth;
  const { token } = useSelector(selectAuth);

  const [httpMethod, setHttpMethod] = useState(method);
  const [result, setResult] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorText, setErrorText] = useState<ErrorText | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<number>(-1);

  const getHeaders = () => {
    const requestHeaders: HeadersInit = new Headers();
    if (!omitHeaders) {
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("Accept", "application/javascript");
    }
    if (authorize) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    return requestHeaders;
  };

  const createRequest = (body?: BodyInit) => {
    const headers = getHeaders();
    const reqInit: RequestInit = {
      method: httpMethod,
      headers,
    };

    if (body) {
      reqInit.body = body;
    }

    return new Request(`${endpoint}`, reqInit);
  };

  const makeRequest = async (body?: BodyInit) => {
    setLoading(true);
    setLoaded(false);
    setSuccess(false);
    const response = await fetch(createRequest(body));

    try {
      setStatus(response.status);
      const responseResult = await response.json();
      setResult(responseResult);
      if (response.status >= 200 && response.status <= 300) {
        setError(false);
        setErrorText(null);
        setSuccess(true);
      } else {
        setErrorText(responseResult);
        setError(true);
        setSuccess(false);
      }
    } catch (err) {
      if (response.status === 204) {
        setSuccess(true);
        setError(false);
        setErrorText(null);
      } else {
        setSuccess(false);
        setError(true);
        setErrorText(err);
      }
    }

    setLoading(false);
    setLoaded(true);
  };

  return {
    result,
    loading,
    loaded,
    error,
    errorText,
    success,
    status,
    setHttpMethod,
    makeRequest,
  };
}

export default useRequest;
