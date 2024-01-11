"use client";

import useSWR, { preload } from "swr";
import client from "@/connection";
import { RequestDocument, Variables } from "graphql-request";
import Loading from "@/components/templates/loading";
import ErrorMessage from "@/components/templates/errorMessage";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function useRequestGQL({
  gql,
  variables,
}: {
  gql: string;
  variables?: Variables;
}) {
  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...variables, ...defaultVariables });

  preload(gql, fetcher);

  const { data, error, isLoading } = useSWR(gql, fetcher);

  // if (isLoading) return <Loading />;
  // if (error) return <ErrorMessage message={error.message} />
  if (isLoading) return "読み込み中...";
  if (error) return "エラー" + error.message;
  return data;
}
