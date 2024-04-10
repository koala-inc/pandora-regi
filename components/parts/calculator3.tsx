"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../templates/button";
import { searchCast } from "@/gqls/query/cast";
import client from "@/connection";
import useSWR, { preload } from "swr";
import { RequestDocument } from "graphql-request";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

function Line({ ml }: { ml?: string }) {
  return (
    <div className={"flex flex-1 justify-between items-center " + ml}>
      <Image src={"/assets/line.svg"} width={26} height={26} alt="" />
      <div className="h-[0.9px] w-[calc(100%-56px)] rounded-full bg-secondary"></div>
      <Image
        src={"/assets/line.svg"}
        width={26}
        height={26}
        className="rotate-180"
        alt=""
      />
    </div>
  );
}

export default function Calculator3({ result, callback }: any) {
  // const [result, setResult] = useState("");
  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const searchData = useSWR<any>(searchCast, fetcher);
  const [castNames, setCastNames] = useState("");

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="relative h-[750px] w-[470px] rounded-md border-4 border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => {
            result.isCastsCalculator = false;
          }}
        >
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-black bg-primary p-[6px]">
            <Image
              src={"/assets/close.svg"}
              width={18}
              height={18}
              className="z-10 !h-full !w-full"
              alt=""
            />
          </span>
        </div>
        <div className="m-3 flex h-[50px] items-center justify-end rounded-md bg-black text-white">
          <p className="pr-3">
            {castNames?.replace(/ /g, ",").replace(/.$/, "")}
          </p>
        </div>
        <div className="my-3 flex justify-around">
          <Button
            className="min-w-[6rem]"
            natural
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            全て
          </Button>
          <Button className="min-w-[6rem]" natural onClick={() => {}}>
            出勤
          </Button>
        </div>
        <div className="my-4 flex w-full">
          <Line />
        </div>
        <div className="flex justify-around">
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 1,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            あ
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 2,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            か
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 3,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            さ
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 4,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            た
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 5,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            な
          </div>
        </div>
        <div className="mt-2 flex justify-around">
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 6,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            は
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 7,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            ま
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 8,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            や
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 9,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            ら
          </div>
          <div
            className={
              "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
            }
            onClick={() => {
              searchData.mutate(
                () =>
                  client.request(searchCast, {
                    name_ruby_syllabary_search_code: 10,
                    ...defaultVariables,
                  }),
                {
                  populateCache: true,
                  revalidate: false,
                }
              );
            }}
          >
            わ
          </div>
        </div>
        <div className="my-4 flex w-full">
          <Line />
        </div>
        <div className="flex h-[360px] flex-wrap justify-start overflow-scroll">
          <>
            {searchData?.data?.cast[0]?.store_cast[0]?.cast?.map(
              (cast: any) => {
                if (cast.leaving_date == null) {
                  const size = cast.name.length > 4 ? "text-xs" : "text-lg";
                  return (
                    <>
                      {cast.cast_code != 0 && (
                        <div
                          className={
                            "mx-1 my-2 flex w-[100px] h-[56px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] px-1 py-4 leading-4 tracking-wider " +
                            size
                          }
                          onClick={() => {
                            setCastNames(
                              (castNames) => castNames + cast.name + " "
                            );
                          }}
                        >
                          {cast.name}
                        </div>
                      )}
                    </>
                  );
                }
              }
            )}
          </>
        </div>
        <div className="mt-2 flex justify-center">
          <div
            onClick={() => {
              if (callback) callback(castNames);
              result.isCastsCalculator = false;
            }}
          >
            <Button natural>確定</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
