"use client";

// 開発用コンポーネント
import DevTool from "@/components/debug/devTool";

// コンポーネント
import Background from "@/components/parts/background";
import HomeButton from "@/components/templates/homeButton";
import Border from "@/components/templates/border";
import Border2 from "@/components/master/border";
import SubBorder from "@/components/templates/subBorder";
import Button from "@/components/templates/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import { useState } from "react";
import Toggle from "@/components/templates/toggle4";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import Image from "next/image";

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[147.5px] w-[90%] px-1 py-2">{children}</SubBorder>;
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
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();

  if (isHeader || isFooter || isCard || isControl) {
    setIsHeader(false);
    setIsFooter(false);
    setIsCard(false);
    setIsControl(false);
  }

  return (
    <main className="relative h-full w-full">
      <Background />
      <SubBorder size="h-[100px] ml-[1.5%] px-[5px] w-[1450px]">
        <nav className="flex w-[10em] items-start justify-start rounded-md border-4 border-white bg-neutral-900 p-1">
          <div className="ml-3 flex flex-col items-start justify-center">
            <div className="w-[3em] text-center text-[0.9rem] font-bold text-accent">
              　
            </div>
            <div className="w-[3em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              組数
            </div>
            <div className="w-[3em] text-center text-[0.9rem] font-bold text-white">
              客数
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-accent">
              伝票
            </div>
            <div className="w-[5em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
        </nav>
        <nav className="ml-2 flex w-[445px] items-start justify-start rounded-md border-4 border-white bg-neutral-900 p-1">
          <div className="ml-3 flex flex-col items-start justify-center">
            <div className="w-[3em] text-center text-[0.9rem] font-bold text-accent">
              　
            </div>
            <div className="w-[3em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              組数
            </div>
            <div className="w-[3em] text-center text-[0.9rem] font-bold text-white">
              客数
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-accent">
              合計
            </div>
            <div className="w-[5em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-accent">
              同伴
            </div>
            <div className="w-[5em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-accent">
              指名
            </div>
            <div className="w-[5em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-accent">
              場内
            </div>
            <div className="w-[5em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-accent">
              フリー
            </div>
            <div className="w-[5em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[5em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
        </nav>
        <nav className="ml-2 flex w-[780px] items-start justify-start rounded-md border-4 border-white bg-neutral-900 p-1">
          <div className="ml-3 flex flex-col items-start justify-center">
            <div className="w-[3em] text-center text-[0.9rem] font-bold text-accent">
              　
            </div>
            <div className="w-[3em] border-b border-white text-center text-[0.9rem] font-bold text-white ">
              件数
            </div>
            <div className="w-[3em] text-center text-[0.9rem] font-bold text-white">
              金額
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-accent">
              現金
            </div>
            <div className="w-[8em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-accent">
              カード
            </div>
            <div className="w-[8em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-accent">
              ポイント
            </div>
            <div className="w-[8em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-accent">
              掛
            </div>
            <div className="w-[8em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-accent">
              未会計
            </div>
            <div className="w-[8em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-accent">
              会計済
            </div>
            <div className="w-[8em] border-b border-white text-center text-[0.9rem] font-bold text-white">
              0
            </div>
            <div className="w-[8em] text-center text-[0.9rem] font-bold text-white">
              0
            </div>
          </div>
        </nav>
      </SubBorder>
      <Border
        className="mx-auto my-2 w-[98%]"
        size="p-4 flex !justify-start flex-col min-h-[calc(98dvh-130px)] overflow-scroll"
      >
        <div className="mb-4 flex h-[80px] w-full">
          <div className="flex items-center justify-center rounded-md border-4 border-white bg-black">
            <form
              className="ml-6 flex h-[50px] w-[100px] flex-wrap"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex h-full w-[190px] flex-col items-start justify-center">
                <label className="text-xs font-bold text-accent">
                  会計内容表示
                </label>
                <Toggle />
              </div>
            </form>
            <form
              className="ml-7 mr-3 flex h-[50px] w-full flex-wrap justify-start"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex h-full w-[110px] flex-col items-start justify-center">
                <label className="text-xs font-bold text-accent">指名</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder=""
                />
              </div>
              <div className="flex h-full w-[110px] flex-col items-start justify-center">
                <label className="text-xs font-bold text-accent">顧客名</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder=""
                />
              </div>
              <div className="flex h-full w-[110px] flex-col items-start justify-center">
                <label className="text-xs font-bold text-accent">
                  販促スタッフ
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                  placeholder=""
                />
              </div>
              <div className="mt-2 flex h-full w-[60px] flex-col items-center justify-center">
                <Border
                  rounded="rounded-full"
                  size="h-[32px] w-[32px] p-[4px] bg-search"
                >
                  <Image
                    src={"/assets/search.svg"}
                    width={26}
                    height={26}
                    className="!h-full !w-full"
                    alt=""
                  />
                </Border>
              </div>
              <div className="mt-2 flex h-full w-[60px] flex-col items-center justify-center">
                <Border
                  rounded="rounded-full"
                  size="h-[32px] w-[32px] p-[4px] bg-reset"
                >
                  <Image
                    src={"/assets/reset.svg"}
                    width={26}
                    height={26}
                    className="!h-full !w-full"
                    alt=""
                  />
                </Border>
              </div>
            </form>
          </div>
          <div className="ml-6 flex items-center justify-center rounded-md border-4 border-white bg-black">
            <form
              className="flex h-[50px] w-full flex-wrap"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex h-full w-[185px] flex-col items-start justify-center">
                <div className="flex w-full justify-center">
                  <div className="flex w-[4em] flex-col items-center justify-center">
                    <label className="text-xs font-bold text-accent">
                      未会計
                    </label>
                    <input
                      type="checkbox"
                      {...register("check")}
                      className="h-[30px] w-[30px] rounded-md px-2 text-sm"
                    />
                  </div>
                  <div className="ml-[10px] flex w-[4em] flex-col items-center justify-center">
                    <label className="text-xs font-bold text-accent">
                      会計済
                    </label>
                    <input
                      type="checkbox"
                      {...register("check")}
                      className="h-[30px] w-[30px] rounded-md px-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-[650px] w-full rounded-md border-4 border-white bg-black p-4">
          <form
            className="flex h-[70px] w-full flex-wrap justify-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-[60px] flex-col items-center justify-center">
              <label className="text-xs font-bold text-accent">売振</label>
              <input
                type="checkbox"
                {...register("check")}
                className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">伝票番号</label>
              000000
            </div>
            <div className="flex h-full w-[60px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">卓番</label>
              A1
            </div>
            <div className="flex h-full w-[60px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">人数</label>2
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">顧客名</label>
              田中
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">指名</label>
              あい
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">
                促進スタッフ
              </label>
              さとう
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">
                キープボトル
              </label>
              たなか
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">区分</label>-
            </div>
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">
                セット内容
              </label>
              -
            </div>
            <div className="flex h-full w-[90px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">入店時間</label>-
            </div>
            <div className="flex h-full w-[90px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">退店時間</label>-
            </div>
            {/* <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">割引</label>-
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">
              加算ポイント
            </label>
            -
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">現金</label>-
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">カード</label>-
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">掛</label>-
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">ポイント</label>-
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">合計</label>0
          </div> */}
            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">領収書</label>
              未発行
            </div>

            <div className="flex h-full w-[110px] flex-col items-start justify-center">
              <Button natural>
                <input type="button" value="修正" />
              </Button>
            </div>
          </form>
        </div>
      </Border>
      <HomeButton />
      <DevTool />
    </main>
  );
}
