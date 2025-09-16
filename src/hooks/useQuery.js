// src/hooks/useQuery.js
import { useEffect, useState, useCallback } from "react";

export default function useQuery(fn, deps = []) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setPending(true);
    setError(null);
    try {
      const out = await fn();
      setData(out);
    } catch (e) {
      setError(e);
    } finally {
      setPending(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { run(); }, [run]);

  return { data, pending, error, refetch: run };
}
