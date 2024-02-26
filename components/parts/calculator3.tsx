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

export default function Calculator3({
  result,
  setResult,
  setIsCalculator,
}: any) {
  // const [result, setResult] = useState("");
  const [tax, setTax] = useState(false);
  const max = 99;

  const [isHour, setIsHour] = useState(false);
  const [isHourTrue, setIsHourTrue] = useState(false);
  const [hour, setHour] = useState("00");

  const [isMinite, setIsMinite] = useState(false);
  const [isMiniteTrue, setIsMiniteTrue] = useState(false);
  const [minite, setMinite] = useState("00");

  const [miniteType, setMiniteType] = useState(5);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCast, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});

  const searchData = useSWR<any>(searchCast, fetcher);
  const [castNames, setCastNames] = useState("");

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => {}}
    >
      <div
        className="relative h-[690px] w-[470px] rounded-md border border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => {}}
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
        <div className="m-3 h-[50px] rounded-md text-black bg-white border-black border flex justify-end items-center">
          <p className="pr-3">{castNames}</p>
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
        <div className="flex flex-wrap justify-start h-[360px] overflow-scroll">
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
                            "mx-1 my-2 flex w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] px-1 py-4 leading-4 tracking-wider " +
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
        <div className="flex mt-2 justify-center">
          <div
            onClick={() => {
              setIsCalculator(false);
            }}
          >
            <Button natural>確定</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
