import { useEffect, useState } from "react";
type error = boolean;
export function useFetch<Payload>(url: string): {
  data: Payload | null;
  loading: boolean;
  error: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<error>(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(url)
      .then((resp) => resp.json())
      .then((data: Payload) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => setError(true));
  }, [url]);
  return {
    data,
    loading,
    error,
  };
}
