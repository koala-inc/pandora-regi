"use client";

// 開発用コンポーネント
import DevTool from "@/components/debug/devTool";

// コンポーネント
import Background from "@/components/parts/background";
import HomeButton from "@/components/templates/homeButton";
import Border from "@/components/templates/border";
import SubBorder from "@/components/templates/subBorder";
import Button from "@/components/templates/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import { useState } from "react";

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[147.5px] w-[90%] px-4 py-2">{children}</SubBorder>;
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

export default function Mater() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Schema> = (data) => alert(JSON.stringify(data));

  const [modal, setModal] = useState(false);

  return (
    <main className="relative h-full w-full">
      <Background />
      <SubBorder size="h-[100px] ml-[1.5%]">
        <div className="mx-4 w-full rounded-md border-4 border-white bg-neutral-900 px-1">
          <nav className="flex w-full items-start justify-around py-3">
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                出勤キャスト
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                在籍
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                体入/ヘルプ
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                日払人数/合計額
              </div>
              <div className="text-2xl font-bold text-white">0/0円</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                ヘアメイク
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                貸ドレス
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                店靴
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                送り人数/合計額
              </div>
              <div className="text-2xl font-bold text-white">0/0円</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                報酬支払人数/支払額合計
              </div>
              <div className="text-2xl font-bold text-white">0/0円</div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full text-[0.8rem] font-bold text-accent">
                未チェック
              </div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
          </nav>
        </div>
      </SubBorder>
      <Border
        className="mx-auto my-2 w-[98%]"
        size="p-4 flex !justify-start !items-start flex-col min-h-[calc(98dvh-250px)] overflow-scroll"
      >
        <div className="mb-4 flex w-[300px] justify-start">
          <form
            className="mr-6 flex h-[90px] w-full flex-wrap rounded-md border-4 border-white bg-neutral-900 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-[190px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                表示切替
              </label>
              <div className="flex">
                <Button natural>
                  <input type="button" value="スタッフ" />
                </Button>
                <Button natural className="ml-2">
                  <input type="button" value="キャスト" />
                </Button>
              </div>
            </div>
          </form>

          <form
            className="mr-6 flex h-[90px] w-[265px] flex-wrap rounded-md border-4 border-white bg-neutral-900 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-[265px] flex-col items-start justify-center">
              <div className="flex">
                <div className="flex w-[4em] flex-col items-center justify-center">
                  <label className="mb-1 text-xs font-bold text-accent">
                    在籍
                  </label>
                  <input
                    type="checkbox"
                    {...register("check")}
                    className="h-[23.5px] w-[30px] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="ml-[10px] flex w-[4em] flex-col items-center justify-center">
                  <label className="mb-1 text-xs font-bold text-accent">
                    体入ヘルプ
                  </label>
                  <input
                    type="checkbox"
                    {...register("check")}
                    className="h-[23.5px] w-[30px] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="ml-[10px] flex w-[4em] flex-col items-center justify-center">
                  <label className="mb-1 text-xs font-bold text-accent">
                    チェック済
                  </label>
                  <input
                    type="checkbox"
                    {...register("check")}
                    className="h-[23.5px] w-[30px] rounded-md px-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </form>
          <form
            className="mr-2 flex h-[90px] w-[750px] flex-wrap rounded-md border-4 border-white bg-neutral-900 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-full flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                フィルター
              </label>
              <div className="flex w-full items-center justify-around">
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  あ
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  か
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  さ
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  た
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  な
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  は
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  ま
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  や
                </div>
                <div
                  className={
                    "mr-2 flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  ら
                </div>
                <div
                  className={
                    "flex cursor-pointer items-center justify-center rounded-md bg-natural p-4 text-2xl leading-4 tracking-wider text-accent"
                  }
                  onClick={() => {}}
                >
                  わ
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="h-[625px] w-full rounded-md border-4 border-white bg-neutral-900 p-4">
          <form
            className="flex h-[70px] w-full flex-wrap justify-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">ID</label>
              000000
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                キャスト名
              </label>
              あい
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                日払い
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                ヘアメイク
              </label>
              <input
                type="checkbox"
                {...register("check")}
                className="h-[23.5px] w-[8rem] rounded-md px-2 text-sm"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                貸ドレス
              </label>
              <input
                type="checkbox"
                {...register("check")}
                className="h-[23.5px] w-[8rem] rounded-md px-2 text-sm"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <label className="mb-1 text-xs font-bold text-accent">店靴</label>
              <input
                type="checkbox"
                {...register("check")}
                className="h-[23.5px] w-[8rem] rounded-md px-2 text-sm"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">送り</label>
              <input
                type="number"
                {...register("age")}
                className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[140px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-secondary-accent">
                その他（領収なし控除）
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="mb-1 text-xs font-bold text-accent">
                全日支給額
              </label>
              000000
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center pt-5">
              <Button natural>
                <input
                  type="button"
                  value="全日詳細"
                  onClick={() => setModal(true)}
                />
              </Button>
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <label className="mb-1 text-xs font-bold text-accent">済</label>
              <input
                type="checkbox"
                {...register("check")}
                className="h-[23.5px] w-[8rem] rounded-md px-2 text-sm"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
          </form>

          {modal && (
            <form
              className="ml-[100px] flex h-[70px] w-full flex-wrap justify-start"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex h-full w-[20px] flex-col items-start justify-center">
                ∟
              </div>
              <div className="flex h-full w-[80px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-accent">
                  時給日給
                </label>
                時給
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-accent">
                  基本
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-accent">
                  バック
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-accent">
                  他支給
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-accent">
                  総支給
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-secondary-accent">
                  源泉徴収
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-secondary-accent">
                  厚生費
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-secondary-accent">
                  他控除
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-secondary-accent">
                  控除計
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[100px] flex-col items-start justify-center">
                <label className="mb-1 text-xs font-bold text-thirdary-accent">
                  差引
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="h-[23.5px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex h-full w-[70px] flex-col items-center justify-center pt-4">
                <Button natural>
                  <input
                    type="button"
                    onClick={() => setModal(false)}
                    value="明細"
                  />
                </Button>
              </div>
              <div className="flex h-full w-[70px] flex-col items-center justify-center pt-4">
                <Button natural>
                  <input
                    type="button"
                    onClick={() => setModal(false)}
                    value="消去"
                  />
                </Button>
              </div>
              <div className="flex h-full w-[70px] flex-col items-center justify-center pt-4">
                <Button natural>
                  <input
                    type="button"
                    onClick={() => setModal(false)}
                    value="固定"
                  />
                </Button>
              </div>
              <div className="flex h-full w-[70px] flex-col items-center justify-center pt-4">
                <Button natural>
                  <input
                    type="button"
                    onClick={() => setModal(false)}
                    value="割振"
                  />
                </Button>
              </div>
            </form>
          )}
        </div>
      </Border>

      <HomeButton />
      <DevTool />
    </main>
  );
}
