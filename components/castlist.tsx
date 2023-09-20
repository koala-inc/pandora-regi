"use client";

import useSWR, { preload } from "swr";
import client from "@/connection";
import Loading from "./loading";
import { searchCastQuery } from "@/gqls/query/casts";
import ErrorMessage from "./errorMessage";

preload(searchCastQuery, (q) =>
  client.request(q, {
    store_code: 1,
  })
);

export default function CastList() {
  const { data, error, isLoading } = useSWR<SEARCH_CASTS>(
    searchCastQuery,
    (q) =>
      client.request(q, {
        store_code: 1,
      })
  );
  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  return <>{data && data.cast[0].store_cast[0].cast[0].name}</>;
}
