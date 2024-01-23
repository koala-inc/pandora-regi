import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import Button from "@/components/templates/button";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";
import Toggle from "@/components/templates/toggle4";

export default function OrderAdd() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Schema> = (data) => alert(JSON.stringify(data));

  const [addModal, setAddModal] = useState(false);

  const baitais = [
    {
      prefCode: 1,
      prefName: "媒体A",
    },
    {
      prefCode: 2,
      prefName: "媒体A",
    },
    {
      prefCode: 3,
      prefName: "媒体C",
    },
  ];

  const syokai = [
    {
      prefCode: 1,
      prefName: "ドリンク",
    },
    {
      prefCode: 1,
      prefName: "ピッチャー",
    },
    {
      prefCode: 1,
      prefName: "割り物",
    },
    {
      prefCode: 1,
      prefName: "フード",
    },
    {
      prefCode: 1,
      prefName: "サービス",
    },
  ];

  const kikan = [
    {
      prefCode: 1,
      prefName: "割り物",
    },
  ];

  return (
    <>
      <Control>
        <Border
          className="my-2 w-full"
          size="p-4 flex flex-col min-h-[calc(98dvh-40px)] overflow-scroll"
          black
        >
          <p className="w-full text-left">オーダーを検索</p>
          <form
            className="flex w-full flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">ID</label>
              <input
                type="number"
                {...register("age")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="IDを入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                オーダー名
              </label>
              <input
                {...register("firstName")}
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="オーダー名を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                小カテゴリ
              </label>
              <select
                {...register("kikan")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
              >
                {kikan.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                オーダー種別
              </label>
              <select
                {...register("kikan")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
              >
                {syokai.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="ml-auto mr-4 flex flex-col justify-end">
              <Button natural>
                <input type="submit" value="検索" />
              </Button>
            </div>
            <div className="mr-4 flex flex-col justify-end">
              <Button natural>
                <input type="submit" value="クリア" />
              </Button>
            </div>
          </form>
          <table className="table table-xs mt-2 min-h-[500px]">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>オーダー名</th>
                <th>小カテゴリ</th>
                <th>オーダー種別</th>
                <th>キッチン送信</th>
                <th>料金</th>
                <th>
                  <label>編集</label>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </Border>
      </Control>
      <nav
        className="absolute bottom-[15px] right-[15px] z-10 cursor-pointer"
        onClick={() => setAddModal(true)}
      >
        <Border rounded="rounded-full" size="h-[50px] w-[50px] p-[12px]">
          <Image
            src={"/assets/add.svg"}
            width={26}
            height={26}
            className="!h-full !w-full"
            alt=""
          />
        </Border>
      </nav>
      {addModal && (
        <Modal setModal={setAddModal}>
          <Border className="w-full" size="p-4 flex flex-col" black>
            <p className="w-full text-left">新規オーダー登録</p>
            <form
              className="flex w-full flex-wrap"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">ID</label>
                <input
                  type="number"
                  {...register("age")}
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="IDを入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  オーダー名
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="オーダー名を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  小カテゴリ
                </label>
                <select
                  {...register("kikan")}
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                >
                  {kikan.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  オーダー種別
                </label>
                <select
                  {...register("kikan")}
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                >
                  {syokai.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  キッチン送信
                </label>
                <Toggle />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  料金
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="料金を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  検索ワード①
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="検索ワード①を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  検索ワード②
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="検索ワード②を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  検索ワード③
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="検索ワード③を入力"
                />
              </div>

              <div className="ml-auto mr-4 flex flex-col justify-end">
                <Button natural>
                  <input type="submit" value="登録" />
                </Button>
              </div>
            </form>
          </Border>
        </Modal>
      )}
    </>
  );
}
