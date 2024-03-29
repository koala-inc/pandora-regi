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
    searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
      (data: any, index: any) => {
        updateSeatMapDate.map((seatMap: any) => {
          if (data.id == seatMap.i) {
            if (data.location != String(seatMap.x + "/" + seatMap.y)) {
              client.request(updateSeatMap, {
                ...defaultVariables,
                id: seatMap.i,
                location: String(seatMap.x + "/" + seatMap.y),
              });
            }
          }
        });
      }
    );
  };

  const onDrop = (layout: any, layoutItem: any, _event: any) => {
    client
      .request(createSeatMap, {
        ...defaultVariables,
        name: ID2 + "#" + ID + "#" + ID3,
        location: String(layoutItem.x + "/" + layoutItem.y),
        layer: tabMenu == 0 ? 3 : tabMenu == 1 ? 2 : tabMenu == 2 ? 1 : 0,
        text_value: tabMenu == 2 ? textValue : "",
        image_url: tabMenu == 1 ? textValue : "",
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
  const [ID2, setID2] = useState("A");
  const [ID3, setID3] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [positionMode, setPositionMode] = useState(false);
  const [tabMenu, setTabMenu] = useState(0);
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <GridLayout
        className={
          tabMenu == 0
            ? "layout absolute left-0 top-0 !h-[100dvh] !w-[100dvw]"
            : "layout absolute left-0 top-0 z-[-1] !h-[100dvh] !w-[100dvw] opacity-30"
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
        isDraggable={deleteMode || tabMenu != 0 ? false : true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            if (seat.layer == 3) {
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
                    "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-natural text-xl font-bold text-accent"
                  }
                >
                  {deleteMode && tabMenu == 0 ? (
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
                  {seat.name.split("#")[0] +
                    seat.name.split("#")[1] +
                    seat.name.split("#")[2]}
                </div>
              );
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className={
          tabMenu == 1
            ? "layout absolute left-0 top-0 !h-[100dvh] !w-[100dvw]"
            : "layout absolute left-0 top-0 z-[-1] !h-[100dvh] !w-[100dvw] opacity-30"
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
        allowOverlap={true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            if (seat.layer == 2) {
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
                    seat.image_url == "/seatMap/line.svg" ||
                    seat.image_url == "/seatMap/middle-line.svg" ||
                    seat.image_url == "/seatMap/short-line.svg" ||
                    seat.image_url == "/seatMap/substract.svg" ||
                    seat.image_url == "/seatMap/substract-right.svg" ||
                    seat.image_url == "/seatMap/substract-left.svg" ||
                    seat.image_url == "A" ||
                    seat.image_url == "B" ||
                    seat.image_url == "C" ||
                    seat.image_url == "D" ||
                    seat.image_url == "E" ||
                    seat.image_url == "F" ||
                    seat.image_url == "S" ||
                    seat.image_url == "V" ||
                    seat.image_url == "I" ||
                    seat.image_url == "P"
                      ? "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center text-5xl font-bold text-[#4f38107b]"
                      : "relative flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
                  }
                >
                  {deleteMode && tabMenu == 1 ? (
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
                  {seat.image_url == "A" ? (
                    "A"
                  ) : seat.image_url == "B" ? (
                    "B"
                  ) : seat.image_url == "C" ? (
                    "C"
                  ) : seat.image_url == "D" ? (
                    "D"
                  ) : seat.image_url == "E" ? (
                    "E"
                  ) : seat.image_url == "F" ? (
                    "F"
                  ) : seat.image_url == "S" ? (
                    "S"
                  ) : seat.image_url == "V" ? (
                    "V"
                  ) : seat.image_url == "I" ? (
                    "I"
                  ) : seat.image_url == "P" ? (
                    "P"
                  ) : (
                    <Image
                      width={30}
                      height={30}
                      className={"drag-none !h-full !w-full !select-none"}
                      src={seat.image_url}
                      alt=""
                    />
                  )}
                </div>
              );
            }
          }
        )}
      </GridLayout>
      <GridLayout
        className={
          tabMenu == 2
            ? "layout absolute left-0 top-0 !h-[100dvh] !w-[100dvw]"
            : "layout absolute left-0 top-0 z-[-1] !h-[100dvh] !w-[100dvw] opacity-30"
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
        isDraggable={deleteMode || tabMenu != 2 ? false : true}
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
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-[#93b69c] text-balck";
                  break;
                case "床黄":
                  color =
                    "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center font-bold bg-[#f2f2b0] text-balck";
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
                  {deleteMode && tabMenu == 2 ? (
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
            ? !positionMode
              ? "absolute left-[50px] top-[20dvh] z-50 h-[60dvh] w-[300px] rounded-xl rounded-t-none border-8 border-black bg-stone-400 p-5 transition-all"
              : "absolute right-[50px] top-[20dvh] z-50 h-[60dvh] w-[300px] rounded-xl rounded-t-none border-8 border-black bg-stone-400 p-5 transition-all"
            : !positionMode
            ? "absolute left-[-300px] top-[20dvh] z-50 h-[60dvh] w-[300px] rounded-xl rounded-t-none border-8 border-black bg-stone-400 p-5 transition-all"
            : "absolute right-[-300px] top-[20dvh] z-50 h-[60dvh] w-[300px] rounded-xl rounded-t-none border-8 border-black bg-stone-400 p-5 transition-all"
        }
      >
        <div
          className={
            tabMenu == 0
              ? "z-99 absolute left-[-8px] top-[-56px] rounded-t-xl border-8 border-b-0 border-black bg-stone-400 px-5 py-3 text-white"
              : "z-99 absolute left-[-8px] top-[-56px] rounded-t-xl border-8 border-b-0 border-black bg-stone-400 px-5 py-3 text-white opacity-50"
          }
          onClick={() => {
            setTabMenu(0);
            setID("1");
            setID2("A");
            setID3("");
          }}
        >
          席配置
        </div>
        <div
          className={
            tabMenu == 1
              ? "z-99 absolute left-[91px] top-[-56px] rounded-t-xl border-8 border-b-0 border-black bg-stone-400 px-5 py-3 text-white"
              : "z-99 absolute left-[91px] top-[-56px] rounded-t-xl border-8 border-b-0 border-black bg-stone-400 px-5 py-3 text-white opacity-50"
          }
          onClick={() => {
            setTabMenu(1);
            setID("1");
            setID2("A");
            setID3("");
          }}
        >
          ｵﾌﾞｼﾞｪ
        </div>
        <div
          className={
            tabMenu == 2
              ? "z-99 absolute left-[189.5px] top-[-56px] whitespace-nowrap rounded-t-xl border-8 border-b-0 border-black bg-stone-400 px-5 py-3 text-white"
              : "z-99 absolute left-[189.5px] top-[-56px] whitespace-nowrap rounded-t-xl border-8 border-b-0 border-black bg-stone-400 px-5 py-3 text-white opacity-50"
          }
          onClick={() => {
            setTabMenu(2);
            setID("1");
            setID2("A");
            setID3("");
          }}
        >
          壁配置
        </div>
        {!positionMode ? (
          <div
            className="absolute right-[-40px] top-[calc(50%-50px)] flex h-[100px] w-[20px] items-center justify-center font-bold text-black"
            onClick={() => {
              setShowMenu((showMenu) => !showMenu);
            }}
          >
            {showMenu ? "〈" : "　〉"}
          </div>
        ) : (
          <div
            className="absolute left-[-50px] top-[calc(50%-50px)] flex h-[100px] w-[20px] items-center justify-center font-bold text-black"
            onClick={() => {
              setShowMenu((showMenu) => !showMenu);
            }}
          >
            {showMenu ? "　〉" : "〈"}
          </div>
        )}
        <div className="flex justify-around">
          <Button
            onClick={() => setDeleteMode((deleteMode) => !deleteMode)}
            natural
            className={deleteMode ? "" : "opacity-50"}
          >
            削除モード
          </Button>
          <Button
            onClick={() => setPositionMode((positionMode) => !positionMode)}
            natural
          >
            {positionMode ? "左表示へ" : "右表示へ"}
          </Button>
        </div>
        <h3 className="mt-5 text-lg font-bold text-black">配置パーツ</h3>
        {tabMenu == 0 ? (
          <>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-natural text-xl font-bold text-accent shadow-md"
              }
            >
              {ID2 + ID + ID3}
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-bold text-black">卓番設定</h3>
            <div className="flex flex-col justify-end">
              <div className="flex">
                <select
                  className="mr-2 h-[45px] w-[60px] rounded-md bg-black px-2 text-center text-3xl font-bold text-white"
                  onChange={(e) => {
                    setID2(e.target.value);
                  }}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                  <option value="K">K</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="N">N</option>
                  <option value="O">O</option>
                  <option value="P">P</option>
                  <option value="Q">Q</option>
                  <option value="R">R</option>
                  <option value="S">S</option>
                  <option value="T">T</option>
                  <option value="U">U</option>
                  <option value="V">V</option>
                  <option value="W">W</option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
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
                <select
                  className="mr-2 h-[45px] w-[80px] rounded-md bg-black px-2 text-center text-3xl font-bold text-white"
                  onChange={(e) => {
                    setID3(e.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value={`'`}>{`'`}</option>
                  <option value={`''`}>{`''`}</option>
                  <option value={`'''`}>{`'''`}</option>
                </select>
              </div>
            </div>
          </>
        ) : tabMenu == 1 ? (
          <div className="flex max-h-[80%] flex-wrap justify-start overflow-scroll">
            <div className="w-full text-2xl text-black">席関連</div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/armchair.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/armchair.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/armchair-left.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/armchair-left.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/armchair-right.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/armchair-right.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/armchair-up.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/armchair-up.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/dry-clean.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/dry-clean.svg"}
                alt=""
              />
            </div>
            <div className="mt-3 w-full text-2xl text-black">線関連</div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/line.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/line.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/middle-line.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/middle-line.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/short-line.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/short-line.svg"}
                alt=""
              />
            </div>
            <div
              className={
                "flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/substract.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/substract.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/substract-right.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/substract-right.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/substract-left.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/substract-left.svg"}
                alt=""
              />
            </div>
            <div className="mt-3 w-full text-2xl text-black">アイテム</div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/cashier.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/cashier.svg"}
                alt=""
              />
            </div>

            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/checkroom.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/checkroom.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/door.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/door.svg"}
                alt=""
              />
            </div>

            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/exit.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/exit.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/hair-dryer.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/hair-dryer.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/imac.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/imac.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/karaoke.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/karaoke.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/locker-room.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/locker-room.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/shelf.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/shelf.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/smartphone.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/smartphone.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/smoke.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/smoke.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/towel.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/towel.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/tablet.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/tablet.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/wc-women.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/wc-women.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/wc-men.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/wc-men.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/wine.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/wine.svg"}
                alt=""
              />
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-2xl font-bold"
              }
              onDragStart={() => {
                setTextValue("/seatMap/objects/cutlery.svg");
              }}
            >
              <Image
                width={30}
                height={30}
                className={"!h-full !w-full !select-none"}
                src={"/seatMap/objects/cutlery.svg"}
                alt=""
              />
            </div>
            <div className="mt-3 w-full text-2xl text-black">文字関連</div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("A");
              }}
            >
              A
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("B");
              }}
            >
              B
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("C");
              }}
            >
              C
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("D");
              }}
            >
              D
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("E");
              }}
            >
              E
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("F");
              }}
            >
              F
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("S");
              }}
            >
              S
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("V");
              }}
            >
              V
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("I");
              }}
            >
              I
            </div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center p-2 text-5xl font-bold text-[#4f38107b]"
              }
              onDragStart={() => {
                setTextValue("P");
              }}
            >
              P
            </div>
          </div>
        ) : tabMenu == 2 ? (
          <div className="flex flex-wrap justify-start">
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center bg-[#93b69c] text-2xl font-bold text-black shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床緑");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center bg-red-300 text-2xl font-bold text-black shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床赤");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center bg-[#f2f2b0] text-2xl font-bold text-black shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床黄");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center bg-black text-2xl font-bold text-black shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床黒");
              }}
            ></div>
            <div
              draggable
              unselectable="on"
              className={
                "droppable-element flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center bg-white text-2xl font-bold text-black shadow-md transition-all"
              }
              onDragStart={() => {
                setTextValue("床白");
              }}
            ></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
