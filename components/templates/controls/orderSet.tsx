import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsAnimateGlobal from "@/globalstates/isAnimate";
import Button from "../button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import { useState } from "react";
import Toggle from "../toggle";

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[147.5px] w-[90%] px-4 py-2">{children}</SubBorder>;
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

export default function ControlOrderSet() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [activeTab, setActiveTab] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Schema> = (data) => alert(JSON.stringify(data));

  const seatAlphabet = [
    {
      prefCode: "A",
      prefName: "A",
    },
    {
      prefCode: "B",
      prefName: "B",
    },
    {
      prefCode: "C",
      prefName: "C",
    },
  ];
  const seatNumber = [
    {
      prefCode: "1",
      prefName: "1",
    },
    {
      prefCode: "2",
      prefName: "2",
    },
    {
      prefCode: "3",
      prefName: "3",
    },
  ];
  const type = [
    {
      prefCode: "なし",
      prefName: "なし",
    },
    {
      prefCode: "外販",
      prefName: "外販",
    },
    {
      prefCode: "案内所",
      prefName: "案内所",
    },
  ];
  const staff = [
    {
      prefCode: "スタッフ１",
      prefName: "スタッフ１",
    },
    {
      prefCode: "スタッフ２",
      prefName: "スタッフ２",
    },
    {
      prefCode: "スタッフ３",
      prefName: "スタッフ３",
    },
  ];

  const callTimeHour = [
    {
      prefCode: "00",
      prefName: "00",
    },
    {
      prefCode: "01",
      prefName: "01",
    },
    {
      prefCode: "02",
      prefName: "02",
    },
    {
      prefCode: "03",
      prefName: "03",
    },
  ];

  const callTimeMinite = [
    {
      prefCode: "00",
      prefName: "00",
    },
    {
      prefCode: "01",
      prefName: "01",
    },
    {
      prefCode: "02",
      prefName: "02",
    },
    {
      prefCode: "03",
      prefName: "03",
    },
  ];

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
        className="absolute left-[390px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-425px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <ContentHeader>
          <div className="flex">
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">卓番</label>
              <div className="flex flex-col">
                <select
                  {...register("baitai")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                >
                  {seatAlphabet.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
                <select
                  {...register("baitai")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                >
                  {seatNumber.map((pref) => {
                    return (
                      <option key={pref.prefCode} value={pref.prefCode}>
                        {pref.prefName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <Button>オーダー伝票</Button>
            <Button>復帰</Button>
          </div>
        </ContentHeader>
        <div className="tabs mt-3">
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 0
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(0)}
          >
            メイン
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 1
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(1)}
          >
            VIP
          </a>
          <a
            className={`tab tab-md mr-1 w-[7em] rounded-t-xl ${
              activeTab == 2
                ? "tab-active bg-primary text-white"
                : "tab-lifted bg-secondary text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            SWEET
          </a>
        </div>
        <div className="mt-[-1px] flex h-[520px] w-[1020px] rounded-b-xl rounded-r-xl bg-primary p-4 text-white">
          <div className="flex w-full overflow-x-scroll rounded-md border border-white bg-black p-4">
            <div
              className={
                "mx-auto flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              20:00~
            </div>
            <div
              className={
                "mx-auto flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              21:00~
            </div>
            <div
              className={
                "mx-auto flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-blue-500 bg-gradient-to-b from-[#c9f3f3] from-5% via-[#86b2b2] via-10% to-[#597777] p-2 text-center text-base leading-4 tracking-wider"
              }
            >
              22:00~
            </div>
          </div>
          <div className="flex">
            <select
              {...register("baitai")}
              className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
            >
              {type.map((pref) => {
                return (
                  <option key={pref.prefCode} value={pref.prefCode}>
                    {pref.prefName}
                  </option>
                );
              })}
            </select>
            <select
              {...register("baitai")}
              className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
            >
              {staff.map((pref) => {
                return (
                  <option key={pref.prefCode} value={pref.prefCode}>
                    {pref.prefName}
                  </option>
                );
              })}
            </select>
            <div className="badge badge-info gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              スタッフ名
            </div>
            <input type="checkbox" checked className="checkbox checkbox-md" />
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                ルームチャージ
              </label>
              <input
                type="number"
                {...register("age")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="チャージ料を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">人数</label>
              <input
                type="number"
                {...register("age")}
                defaultValue={1}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="人数を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                セット時間
              </label>
              <input
                type="number"
                {...register("age")}
                defaultValue={60}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="時間を入力"
              />
              <p>分</p>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">料金</label>
              <input
                type="number"
                {...register("age")}
                className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                placeholder="料金を入力"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                セット開始時間
              </label>
              <input
                type="date"
                {...register("birthday")}
                className="mr-2 h-[30px] rounded-md px-2 text-sm"
              />
              <p>〜</p>
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                終了時間
              </label>
              <input
                type="date"
                {...register("birthday")}
                className="mr-2 h-[30px] rounded-md px-2 text-sm"
              />
            </div>
            <Toggle />
            <div className="flex flex-col">
              <select
                {...register("baitai")}
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
              >
                {callTimeHour.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
              <select
                {...register("baitai")}
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
              >
                {callTimeMinite.map((pref) => {
                  return (
                    <option key={pref.prefCode} value={pref.prefCode}>
                      {pref.prefName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col">
              <p className="text-accent">指名種</p>
              <div className="flex flex-col">
                <Button className="min-w-[5rem]" natural>
                  本指
                </Button>
                <Button className="min-w-[5rem]" natural>
                  同伴
                </Button>
                <Button className="min-w-[5rem]" natural>
                  場内
                </Button>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-accent">キャスト検索</p>
              <div className="flex flex-col">
                <div className="flex">
                  <input
                    type="checkbox"
                    checked
                    className="checkbox checkbox-md"
                  />
                  <div className="flex flex-col">
                    <label className="mt-3 text-xs font-bold text-accent">
                      出勤中に絞り込む
                    </label>
                    <input
                      type="number"
                      {...register("age")}
                      className="mr-2 h-[30px] w-[6rem] rounded-md px-2 text-sm"
                      placeholder="チャージ料を入力"
                    />
                  </div>
                </div>
                <div className="flex">
                  <Button className="min-w-[5rem]" natural>
                    あ
                  </Button>
                  <Button className="min-w-[5rem]" natural>
                    は
                  </Button>
                </div>
                <div className="flex">
                  <Button className="min-w-[5rem]" natural>
                    か
                  </Button>
                  <Button className="min-w-[5rem]" natural>
                    ま
                  </Button>
                </div>
                <div className="flex">
                  <Button className="min-w-[5rem]" natural>
                    さ
                  </Button>
                  <Button className="min-w-[5rem]" natural>
                    や
                  </Button>
                </div>
                <div className="flex">
                  <Button className="min-w-[5rem]" natural>
                    た
                  </Button>
                  <Button className="min-w-[5rem]" natural>
                    ら
                  </Button>
                </div>
                <div className="flex">
                  <Button className="min-w-[5rem]" natural>
                    な
                  </Button>
                  <Button className="min-w-[5rem]" natural>
                    わ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
