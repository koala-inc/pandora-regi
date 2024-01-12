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
            <div className="text-2xl font-bold text-white">0/¥0</div>
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
            <div className="text-2xl font-bold text-white">0/¥0</div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-full text-[0.8rem] font-bold text-accent">
              報酬支払人数/支払額合計
            </div>
            <div className="text-2xl font-bold text-white">0/¥0</div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-full text-[0.8rem] font-bold text-accent">
              未チェック
            </div>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
        </nav>
      </SubBorder>
      <Border
        className="mx-auto my-2 w-[98%]"
        size="p-4 flex !justify-start flex-col min-h-[calc(98dvh-250px)] overflow-scroll"
        black
      >
        <form
          className="flex h-[70px] w-full flex-wrap justify-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">ID</label>
            000000
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">キャスト名</label>
            あい
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">日払い</label>
            <input
              type="number"
              {...register("age")}
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
              placeholder="0"
            />
          </div>
          <div className="flex h-full w-[70px] flex-col items-center justify-center">
            <label className="text-xs font-bold text-accent">ヘアメイク</label>
            <input
              type="checkbox"
              {...register("check")}
              className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
            />
            {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
          </div>
          <div className="flex h-full w-[70px] flex-col items-center justify-center">
            <label className="text-xs font-bold text-accent">貸ドレス</label>
            <input
              type="checkbox"
              {...register("check")}
              className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
            />
            {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
          </div>
          <div className="flex h-full w-[70px] flex-col items-center justify-center">
            <label className="text-xs font-bold text-accent">店靴</label>
            <input
              type="checkbox"
              {...register("check")}
              className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
            />
            {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">送り</label>
            <input
              type="number"
              {...register("age")}
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
              placeholder="0"
            />
          </div>
          <div className="flex h-full w-[140px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-secondary-accent">
              その他（領収なし控除）
            </label>
            <input
              type="number"
              {...register("age")}
              className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
              placeholder="0"
            />
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <label className="text-xs font-bold text-accent">全日支給額</label>
            000000
          </div>
          <div className="flex h-full w-[110px] flex-col items-start justify-center">
            <Button natural>
              <input
                type="button"
                value="全日詳細"
                onClick={() => setModal(true)}
              />
            </Button>
          </div>
          <div className="flex h-full w-[70px] flex-col items-center justify-center">
            <label className="text-xs font-bold text-accent">済</label>
            <input
              type="checkbox"
              {...register("check")}
              className="h-[30px] w-[8rem] rounded-md px-2 text-sm"
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
              <label className="text-xs font-bold text-accent">時給日給</label>
              時給
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">基本</label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">バック</label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">他支給</label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">総支給</label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-secondary-accent">
                源泉徴収
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-secondary-accent">
                厚生費
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-secondary-accent">
                他控除
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-secondary-accent">
                控除計
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[100px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-thirdary-accent">
                差引
              </label>
              <input
                type="number"
                {...register("age")}
                className="h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="0"
              />
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <Button natural>
                <input
                  type="button"
                  onClick={() => setModal(false)}
                  value="明細"
                />
              </Button>
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <Button natural>
                <input
                  type="button"
                  onClick={() => setModal(false)}
                  value="消去"
                />
              </Button>
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
              <Button natural>
                <input
                  type="button"
                  onClick={() => setModal(false)}
                  value="固定"
                />
              </Button>
            </div>
            <div className="flex h-full w-[70px] flex-col items-center justify-center">
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
      </Border>
      <div className="mx-auto my-2 flex w-[98%]">
        <Border
          className="w-[240px]"
          size="p-4 flex !justify-start flex-col min-h-[100px] overflow-scroll"
        >
          <form
            className="flex h-[70px] w-full flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-[190px] flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">表示切替</label>
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
        </Border>
        <Border
          className="ml-[1%] w-[265px]"
          size="p-4 flex !justify-start flex-col min-h-[100px] overflow-scroll"
        >
          <form
            className="flex h-[70px] w-full flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-[265px] flex-col items-start justify-center">
              <div className="flex">
                <div className="flex w-[4em] flex-col items-center justify-center">
                  <label className="text-xs font-bold text-accent">在籍</label>
                  <input
                    type="checkbox"
                    {...register("check")}
                    className="h-[30px] w-[30px] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="ml-[10px] flex w-[4em] flex-col items-center justify-center">
                  <label className="text-xs font-bold text-accent">
                    体入ヘルプ
                  </label>
                  <input
                    type="checkbox"
                    {...register("check")}
                    className="h-[30px] w-[30px] rounded-md px-2 text-sm"
                  />
                </div>
                <div className="ml-[10px] flex w-[4em] flex-col items-center justify-center">
                  <label className="text-xs font-bold text-accent">
                    チェック済
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
        </Border>
        <Border
          className="ml-[1%] w-[605px]"
          size="p-4 flex !justify-start flex-col min-h-[100px] overflow-scroll"
        >
          <form
            className="flex h-[70px] w-full flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-full flex-col items-start justify-center">
              <label className="text-xs font-bold text-accent">
                フィルター
              </label>
              <div className="flex items-center justify-center">
                <Button natural>
                  <input type="button" value="あ" />
                </Button>
                <Button natural>
                  <input type="button" value="か" />
                </Button>
                <Button natural>
                  <input type="button" value="さ" />
                </Button>
                <Button natural>
                  <input type="button" value="た" />
                </Button>
                <Button natural>
                  <input type="button" value="な" />
                </Button>
                <Button natural>
                  <input type="button" value="は" />
                </Button>
                <Button natural>
                  <input type="button" value="ま" />
                </Button>
                <Button natural>
                  <input type="button" value="や" />
                </Button>
                <Button natural>
                  <input type="button" value="ら" />
                </Button>
                <Button natural>
                  <input type="button" value="わ" />
                </Button>
              </div>
            </div>
          </form>
        </Border>
      </div>
      <HomeButton />
      <DevTool />
    </main>
  );
}
