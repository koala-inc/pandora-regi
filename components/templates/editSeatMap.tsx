import Seat from "@/components/templates/seat";
import seatMap from "@/configs/seatMap";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsPurchaseOrderGlobal from "@/globalstates/isPurchaseOrder";
import useIsLockGlobal from "@/globalstates/isLock";
import usePurchaseOrderGlobal from "@/globalstates/purchaseOrder";
import useSeatPresetGlobal from "@/globalstates/seatPreset";
import EditSeat from "./editSeat";
import client from "@/connection";
import { RequestDocument } from "graphql-request";
import useSWR, { preload } from "swr";

import React, { useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { searchSeatArea, searchSeatMap } from "@/gqls/query/seat";
import {
  createSeatMap,
  deleteSeatMap,
  updateSeatMap,
} from "@/gqls/mutation/seat";
import { searchUser } from "@/gqls/query/user";
import Border2 from "../master/border";
import Button from "./button";

const defaultVariables = {
  store_code: process.env.NEXT_PUBLIC_STORE_CODE || "",
};

export default function EditSeatMap() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isPurchaseOrder, setIsPurchaseOrder] = useIsPurchaseOrderGlobal();
  const [purchaseOrder, setPurchaseOrder] = usePurchaseOrderGlobal();
  const [isLock, setIsLock] = useIsLockGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();

  const fetcher = (q: RequestDocument) =>
    client.request(q, { ...defaultVariables });

  const searchData = useSWR<any>(searchSeatMap, fetcher);

  const onLayoutChange = (updateSeatMapDate: any) => {
    updateSeatMapDate.map((seatMap: any) => {
      client.request(updateSeatMap, {
        ...defaultVariables,
        id: seatMap.i,
        location: String(seatMap.x + "/" + seatMap.y),
      });
    });
  };

  const onDrop = (layout: any, layoutItem: any, _event: any) => {
    client
      .request(createSeatMap, {
        ...defaultVariables,
        name: ID,
        location: String(layoutItem.x + "/" + layoutItem.y),
        layer: tabMenu == 0 ? 3 : 1,
        text_value: tabMenu == 1 ? textValue : "",
        type: 0,
      })
      .then(() => {
        searchData.mutate(
          () =>
            client.request(searchSeatMap, {
              ...defaultVariables,
            }),
          {
            populateCache: true,
            revalidate: false,
          }
        );
      });
  };

  const [ID, setID] = useState("1");
  const [showMenu, setShowMenu] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [tabMenu, setTabMenu] = useState(0);
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <GridLayout
        className={
          tabMenu == 0
            ? "absolute top-0 left-0 layout !h-[100dvh] !w-[100dvw]"
            : "absolute top-0 left-0 layout !h-[100dvh] !w-[100dvw] opacity-30 z-[-1]"
        }
        cols={133}
        compactType={null}
        verticalCompact={false}
        width={2000}
        rowHeight={5}
        isResizable={false}
        preventCollision={true}
        onDragStop={onLayoutChange}
        onDrop={onDrop}
        isDroppable={true}
        isDraggable={deleteMode || tabMenu != 0 ? false : true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            if (seat.layer == 3) {
              switch (seat.type) {
                case 0:
                  return (
                    <div
                      key={seat.id}
                      data-grid={{
                        x: Number(seat.location.split("/")[0]),
                        y: Number(seat.location.split("/")[1]),
                        w: 4,
                        h: 4,
                      }}
                      className={
                        "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent bg-natural"
                      }
                    >
                      {deleteMode ? (
                        <Border2
                          className="absolute right-[-20px] top-[-15px]"
                          rounded="rounded-full"
                          size="h-[28px] w-[28px] p-[6px]"
                        >
                          <div
                            onClick={() => {
                              client
                                .request(deleteSeatMap, {
                                  id: seat.id,
                                  ...defaultVariables,
                                })
                                .then(() => {
                                  searchData.mutate(
                                    () =>
                                      client.request(searchSeatMap, {
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
                            <Image
                              src={"/assets/close.svg"}
                              width={26}
                              height={26}
                              className="!h-full !w-full"
                              alt=""
                            />
                          </div>
                        </Border2>
                      ) : (
                        <></>
                      )}
                      A{String(seat.name).toLocaleUpperCase()}
                    </div>
                  );
                case 1:
                  return (
                    <Image
                      key={index}
                      width={30}
                      height={30}
                      className={seat.area + " !w-full !h-full"}
                      src={seat.objectUrl}
                      alt=""
                    />
                  );
                case 2:
                  return (
                    <EditSeat
                      key={index}
                      id={seat.id}
                      area={seat.area}
                      bg={
                        isLock > 1
                          ? " bg-green-200 opacity-90"
                          : purchaseOrder[0].id != seat.id
                          ? " bg-natural"
                          : " bg-blue-200 opacity-90"
                      }
                      onClick={() => {
                        if (isLock < 2) {
                          setIsCard(true);
                          if (isControl != "") setIsControl("");
                        } else if (isLock == 2) {
                          setIsLock(3);
                        }
                      }}
                    >
                      {seat.body}
                    </EditSeat>
                  );
              }
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className={
          tabMenu == 1
            ? "absolute top-0 left-0 layout !h-[100dvh] !w-[100dvw]"
            : "absolute top-0 left-0 layout !h-[100dvh] !w-[100dvw] opacity-30 z-[-1]"
        }
        cols={133}
        compactType={null}
        width={2000}
        rowHeight={5}
        isResizable={false}
        preventCollision={true}
        onDragStop={onLayoutChange}
        onDrop={onDrop}
        isDroppable={true}
        isDraggable={deleteMode || tabMenu != 1 ? false : true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            if (seat.layer == 1) {
              let color =
                "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center border border-black font-bold bg-white text-balck";
              switch (seat.text_value) {
                case "床赤":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-red-300 text-balck";
                  break;
                case "床緑":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-green-300 text-balck";
                  break;
                case "床黄":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-yellow-300 text-balck";
                  break;
                case "床黒":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-black text-balck";
                  break;
                case "床白":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-white text-balck";
                  break;
              }
              return (
                <div
                  key={seat.id}
                  data-grid={{
                    x: Number(seat.location.split("/")[0]),
                    y: Number(seat.location.split("/")[1]),
                    w: 4,
                    h: 4,
                  }}
                  className={color}
                >
                  {deleteMode ? (
                    <Border2
                      className="absolute right-[-20px] top-[-15px]"
                      rounded="rounded-full"
                      size="h-[28px] w-[28px] p-[6px]"
                    >
                      <div
                        onClick={() => {
                          client
                            .request(deleteSeatMap, {
                              id: seat.id,
                              ...defaultVariables,
                            })
                            .then(() => {
                              searchData.mutate(
                                () =>
                                  client.request(searchSeatMap, {
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
                        <Image
                          src={"/assets/close.svg"}
                          width={26}
                          height={26}
                          className="!h-full !w-full"
                          alt=""
                        />
                      </div>
                    </Border2>
                  ) : (
                    <></>
                  )}
                  {seat.text_value == "木" ||
                  seat.text_value == "壁" ||
                  seat.text_value == "ﾄｲﾚ"
                    ? seat.text_value
                    : ""}
                </div>
              );
            }
          }
        )}
      </GridLayout>
      <div
        className={
          showMenu
            ? "absolute top-[20dvh] h-[60dvh] w-[300px] p-5 border-secondary border-8 bg-primary rounded-xl rounded-tl-none left-[50px] transition-all"
            : "absolute top-[20dvh] h-[60dvh] w-[300px] p-5 border-secondary border-8 bg-primary rounded-xl rounded-tl-none left-[-300px] transition-all"
        }
      >
        <div
          className={
            tabMenu == 0
              ? "absolute text-white top-[-56px] left-[-8px] px-5 py-3 z-99 border-secondary rounded-t-xl border-8 border-b-0 bg-primary"
              : "absolute text-white top-[-56px] left-[-8px] px-5 py-3 z-99 border-secondary rounded-t-xl border-8 border-b-0 bg-primary opacity-50"
          }
          onClick={() => {
            setTabMenu(0);
          }}
        >
          席配置
        </div>
        <div
          className={
            tabMenu == 1
              ? "absolute text-white top-[-56px] left-[85px] px-5 py-3 z-99 border-secondary rounded-t-xl border-8 border-b-0 bg-primary"
              : "absolute text-white top-[-56px] left-[85px] px-5 py-3 z-99 border-secondary rounded-t-xl border-8 border-b-0 bg-primary opacity-50"
          }
          onClick={() => {
            setTabMenu(1);
          }}
        >
          背景
        </div>
        <div
          className={
            tabMenu == 2
              ? "absolute text-white top-[-56px] left-[165px] px-5 py-3 z-99 border-secondary rounded-t-xl border-8 border-b-0 bg-primary"
              : "absolute text-white top-[-56px] left-[165px] px-5 py-3 z-99 border-secondary rounded-t-xl border-8 border-b-0 bg-primary opacity-50"
          }
          onClick={() => {
            setTabMenu(2);
          }}
        >
          壁紙
        </div>
        <div
          className="absolute right-[-40px] top-[calc(50%-50px)] text-black h-[100px] w-[20px] flex justify-center items-center font-bold"
          onClick={() => {
            setShowMenu((showMenu) => !showMenu);
          }}
        >
          {showMenu ? "〈" : "　〉"}
        </div>
        <Button
          onClick={() => setDeleteMode((deleteMode) => !deleteMode)}
          natural
          className={deleteMode ? "" : "opacity-50"}
        >
          削除モード
        </Button>
        <h3 className="text-accent font-bold text-lg mt-5">配置パーツ</h3>
        {tabMenu == 0 ? (
          <>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md bg-natural"
              }
            >
              A{String(ID).toLocaleUpperCase()}
            </div>
            <hr className="my-4" />
            <h3 className="text-accent font-bold text-lg">卓番設定</h3>
            <div className="flex flex-col justify-end">
              <div className="flex">
                <select className="mr-2 h-[45px] w-[60px] rounded-md bg-black px-2 text-center text-3xl font-bold text-white">
                  <option value="A">A</option>
                </select>
                <select
                  className="mr-2 h-[45px] w-[80px] rounded-md bg-black px-2 text-center text-3xl font-bold text-white"
                  onChange={(e) => {
                    setID(e.target.value);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="76">76</option>
                  <option value="77">77</option>
                  <option value="78">78</option>
                  <option value="79">79</option>
                  <option value="80">80</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                  <option value="86">86</option>
                  <option value="87">87</option>
                  <option value="88">88</option>
                  <option value="89">89</option>
                  <option value="90">90</option>
                  <option value="91">91</option>
                  <option value="92">92</option>
                  <option value="93">93</option>
                  <option value="94">94</option>
                  <option value="95">95</option>
                  <option value="96">96</option>
                  <option value="97">97</option>
                  <option value="98">98</option>
                  <option value="99">99</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-start flex-wrap">
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center border border-black font-bold text-black bg-white shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("木");
              }}
            >
              木
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center border border-black font-bold text-black bg-white shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("壁");
              }}
            >
              壁
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center border border-black font-bold text-black bg-white shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("ﾄｲﾚ");
              }}
            >
              ﾄｲﾚ
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold text-black bg-green-300 shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床緑");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold text-black bg-red-300 shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床赤");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold text-black bg-yellow-300 shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床黄");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold text-black bg-black shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床黒");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold text-black bg-white shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床白");
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}
