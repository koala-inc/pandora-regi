"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { motion } from "framer-motion";
import Border2 from "@/components/templates/border";
import Toggle from "@/components/templates/toggle4";
import client from "@/connection";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/gqls/mutation/category";
import { searchCategory } from "@/gqls/query/category";
import { RequestDocument } from "graphql-request";
import Image from "next/image";
import { useState } from "react";
import useSWR, { preload } from "swr";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function ItemCategoryLists() {
  const [update, setUpdate] = useState(false);

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  preload(searchCategory, fetcher);

  const [searchForm, setSearchForm] = useState<any>({});
  const [createForm, setCreateForm] = useState<any>({});
  const [updateForm, setUpdateForm] = useState<any>({});
  const [addForm, setAddForm] = useState<any>({});

  const searchData = useSWR<any>(searchCategory, fetcher);
  const createData = useSWR<any>(createCategory, fetcher);
  const updateData = useSWR<any>(updateCategory, fetcher);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "easeInOut",
          bounce: 0,
          duration: 0.15,
          delay: 0.15,
        }}
        className="absolute left-[210px] top-1/2 z-0 h-[98dvh] w-[calc(100dvw-300px)] -translate-y-1/2"
      >
        <Border2 size="h-full max-h-[calc(98dvh-10px)] min-w-full px-4 py-2 flex flex-col justify-start !items-start">
          <div className="flex max-w-full overflow-scroll">
            {searchData?.data?.category[0]?.store_category[0]?.category?.map(
              (category: any, index: any) => {
                if (category.category_revision.parent_id == 0) {
                  addForm[category.id] == "";
                  return (
                    <div className="relative mr-4 w-[148px]" key={index}>
                      <Border
                        className="absolute right-[-5px] top-[0px]"
                        rounded="rounded-full"
                        size="h-[20px] w-[20px] p-[2px] text-red-600"
                      >
                        <div
                          className="ml-[1px] mt-[-3px] flex h-full w-full items-center justify-center"
                          onClick={() => {
                            client
                              .request(deleteCategory, {
                                id: category.id,
                                is_parent: 1,
                                ...defaultVariables,
                              })
                              .then(() => {
                                searchData.mutate(
                                  () =>
                                    client.request(searchCategory, {
                                      ...defaultVariables,
                                    }),
                                  {
                                    populateCache: true,
                                    revalidate: false,
                                  }
                                );
                              });
                          }}
                        >
                          ×
                        </div>
                      </Border>
                      <Border
                        className="my-2 w-full"
                        rounded="rounded-md border-white"
                        size="p-4 flex flex-col overflow-scroll"
                        black
                      >
                        <p className="text-accent">大カテゴリー</p>
                        <input
                          type="text"
                          className="mb-2 h-[30px] w-[7.5rem] rounded-md px-2 text-sm"
                          defaultValue={category.category_revision.name}
                          onBlur={(e) => {
                            updateData.mutate(
                              () =>
                                client.request(updateCategory, {
                                  id: category.id,
                                  name: e.target.value,
                                  ...defaultVariables,
                                }),
                              {
                                populateCache: true,
                                revalidate: false,
                              }
                            );
                          }}
                        />
                        <p className="text-accent">小カテゴリー</p>
                        {searchData?.data?.category[0]?.store_category[0]?.category?.map(
                          (subcategory: any, index: any) => {
                            if (
                              subcategory.category_revision.parent_id ==
                              category.id
                            ) {
                              return (
                                <div className="relative flex" key={index}>
                                  <input
                                    type="text"
                                    className="mb-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                                    defaultValue={
                                      subcategory.category_revision.name
                                    }
                                    onBlur={(e) => {
                                      updateData.mutate(
                                        () =>
                                          client.request(updateCategory, {
                                            id: subcategory.id,
                                            name: e.target.value,
                                            ...defaultVariables,
                                          }),
                                        {
                                          populateCache: true,
                                          revalidate: false,
                                        }
                                      );
                                    }}
                                  />
                                  <Border
                                    className="ml-[1px] mt-[3px] h-[23px] w-[24px]"
                                    rounded="rounded-full"
                                    size="h-[20px] w-[20px] p-[2px] text-red-600"
                                  >
                                    <div
                                      className="ml-[1px] mt-[-3px] flex h-full w-full items-center justify-center"
                                      onClick={() => {
                                        client
                                          .request(deleteCategory, {
                                            id: subcategory.id,
                                            ...defaultVariables,
                                          })
                                          .then(() => {
                                            searchData.mutate(
                                              () =>
                                                client.request(searchCategory, {
                                                  ...defaultVariables,
                                                }),
                                              {
                                                populateCache: true,
                                                revalidate: false,
                                              }
                                            );
                                          });
                                      }}
                                    >
                                      -
                                    </div>
                                  </Border>
                                </div>
                              );
                            }
                          }
                        )}
                        <Border
                          rounded="rounded-full"
                          size="h-[20px] w-[20px] p-[2px]"
                        >
                          <Image
                            src={"/assets/add.svg"}
                            width={16}
                            height={16}
                            className="!h-full !w-full"
                            alt=""
                            onClick={() => {
                              createData
                                .mutate(
                                  () =>
                                    client.request(createCategory, {
                                      name: "",
                                      parent_id: category.id,
                                      ...defaultVariables,
                                    }),
                                  {
                                    populateCache: true,
                                    revalidate: false,
                                  }
                                )
                                .then(() => {
                                  addForm[category.id] = "";
                                  searchData.mutate(
                                    () =>
                                      client.request(searchCategory, {
                                        ...defaultVariables,
                                      }),
                                    {
                                      populateCache: true,
                                      revalidate: false,
                                    }
                                  );
                                });
                            }}
                          />
                        </Border>
                      </Border>
                    </div>
                  );
                }
              }
            )}
            <div
              className="ml-2 mt-11 h-[45px] w-[45px]"
              onClick={() => {
                createData
                  .mutate(
                    () =>
                      client.request(createCategory, {
                        name: "",
                        parent_id: 0,
                        ...defaultVariables,
                      }),
                    {
                      populateCache: true,
                      revalidate: false,
                    }
                  )
                  .then(() => {
                    searchData.mutate(
                      () =>
                        client.request(searchCategory, {
                          ...defaultVariables,
                        }),
                      {
                        populateCache: true,
                        revalidate: false,
                      }
                    );
                  });
              }}
            >
              <Border rounded="rounded-full" size="h-[40px] w-[40px] p-[12px]">
                <Image
                  src={"/assets/add.svg"}
                  width={26}
                  height={26}
                  className="!h-full !w-full"
                  alt=""
                />
              </Border>
            </div>
          </div>
        </Border2>
      </motion.div>
    </>
  );
}
