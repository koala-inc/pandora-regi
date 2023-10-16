import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/validations/test";
import Button from "@/components/templates/button";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/parts/modal";

export default function StaffList() {
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
      prefName: "紹介A",
    },
    {
      prefCode: 2,
      prefName: "紹介B",
    },
    {
      prefCode: 3,
      prefName: "紹介C",
    },
  ];

  const kikan = [
    {
      prefCode: 1,
      prefName: "入店日",
    },
    {
      prefCode: 2,
      prefName: "誕生日",
    },
    {
      prefCode: 3,
      prefName: "退店日",
    },
  ];

  const hanbai = [
    {
      prefCode: 1,
      prefName: "スタッフ",
    },
    {
      prefCode: 2,
      prefName: "販売促進",
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
          <p className="w-full text-left">スタッフを検索</p>
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
                スタッフ/販売促進
              </label>
              <select
                {...register("baitai")}
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
              >
                {hanbai.map((pref) => {
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
              <label className="mt-3 text-xs font-bold text-accent">氏名</label>
              <input
                {...register("firstName")}
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="氏名を入力"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                フリガナ
              </label>
              <input
                {...register("firstName")}
                className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                placeholder="フリガナを入力"
              />
              {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mt-3 text-xs font-bold text-accent">
                電話番号
              </label>
              <input
                type="tel"
                {...register("tel")}
                className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                placeholder="電話番号を入力"
              />
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
                <th>氏名</th>
                <th>住所</th>
                <th>電話番号</th>
                <th>入店日</th>
                <th>退店日</th>
                <th>
                  <label>編集</label>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr>
              <tr>
                <td>1000</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">あや</div>
                      <div className="text-sm opacity-50">
                        田中店子（タナカタナコ）
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  東京都中央区丸の内1-1-1
                  <br />
                  丸の内センタービル1F
                </td>
                <td>000-0000-0000</td>
                <td>1,000円</td>
                <td>30,000円</td>
                <td>2000/01/01</td>
                <td>-</td>
                <th>
                  <button className="btn btn-ghost btn-xs">編集</button>
                </th>
              </tr> */}
            </tbody>
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
            <p className="w-full text-left">新規スタッフ登録</p>
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
                  キャスト名
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="源氏名を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  本名
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="本名を入力"
                />
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  フリガナ
                </label>
                <input
                  {...register("firstName")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                  placeholder="フリガナを入力"
                />
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  時給
                </label>
                <input
                  type="number"
                  {...register("age2")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  placeholder="時給を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  日給
                </label>
                <input
                  {...register("age3")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  placeholder="日給を入力"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  入店日
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="mr-2 h-[30px] rounded-md px-2 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  生年月日
                </label>
                <input
                  type="date"
                  {...register("birthday")}
                  className="mr-2 h-[30px] rounded-md px-2 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  住所
                </label>
                <input
                  {...register("address")}
                  className="mr-2 h-[30px] w-[17rem] rounded-md px-2 text-sm"
                  placeholder="住所を入力"
                />
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  電話番号
                </label>
                <input
                  type="tel"
                  {...register("tel")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  placeholder="電話番号を入力"
                />
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  その他
                </label>
                <input
                  {...register("address")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                  placeholder="備考を入力"
                />
                {errors.firstName?.message && (
                  <p>{errors.firstName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mt-3 text-xs font-bold text-accent">
                  媒体
                </label>
                <select
                  {...register("baitai")}
                  className="mr-2 h-[30px] w-[7rem] rounded-md px-2 text-sm"
                >
                  <option value="" selected disabled>
                    媒体を選択
                  </option>
                  {baitais.map((pref) => {
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
                  紹介者
                </label>
                <select
                  {...register("syokai")}
                  className="mr-2 h-[30px] w-[8rem] rounded-md px-2 text-sm"
                >
                  <option value="" selected disabled>
                    紹介者を選択
                  </option>
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
