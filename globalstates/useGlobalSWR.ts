import { useEffect } from "react";
import useSWR from "swr";

export default function useGlobalSWR<T>(key: string, initialData: T) {
  const { data = initialData, mutate } = useSWR<T>(key, null, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  useEffect(() => {
    mutate((_data) => _data || initialData, false);
  }, [mutate, initialData]);

  return { data, mutate };
}
