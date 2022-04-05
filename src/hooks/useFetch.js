import { useState, useEffect } from "react";

export function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setPending(true);
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();

        setData(json);
        setPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch request was aborted.");
        } else {
          console.log(err);
          setError("Could not fetch data.");
        }
        setPending(false);
      }
    };

    if (method === "GET") {
      fetchData();
    } else if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, pending, error, postData };
}
