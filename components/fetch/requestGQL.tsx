"use client";

import useSWR, { preload } from "swr";
import client from "@/connection";
import { RequestDocument, Variables } from "graphql-request";
import Loading from "@/components/templates/loading";
import ErrorMessage from "@/components/templates/errorMessage";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function RequestGQL({
  gql,
  variables,
}: {
  gql: string;
  variables?: Variables;
}) {
  preload(gql, (q: RequestDocument) =>
    client.request(q, { ...variables, ...defaultVariables })
  );
  const { data, error, isLoading } = useSWR<any>(gql, (q: RequestDocument) =>
    client.request(q, { ...variables, ...defaultVariables })
  );
  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  return data;
}
