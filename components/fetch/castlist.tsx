"use client";

import useSWR, { preload } from "swr";
import client from "@/connection";
import Loading from "@/components/templates/loading";
import { searchCastQuery } from "@/gqls/query/casts";
import ErrorMessage from "@/components/templates/errorMessage";

const gql = searchCastQuery;
const variables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

preload(gql, (q) => client.request(q, variables));

export default function CastList() {
  const { data, error, isLoading } = useSWR<SEARCH_CASTS>(gql, (q) =>
    client.request(q, variables)
  );
  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  return <>{data && data.cast[0].store_cast[0].cast[0].name}</>;
}
