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
        layer: 3,
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

  return (
    <>
      <GridLayout
        className="layout !h-[100dvh]"
        cols={23}
        compactType={null}
        width={
          typeof window !== "undefined" ? window.parent.screen.width : 1200
        }
        rowHeight={60}
        isResizable={false}
        preventCollision={true}
        onDragStop={onLayoutChange}
        onDrop={onDrop}
        isDroppable={true}
      >
        {searchData?.data?.seatMap[0]?.store_seat_map[0]?.seat_map?.map(
          (seat: any, index: any) => {
            switch (seat.type) {
              case 0:
                return (
                  <div
                    key={seat.id}
                    data-grid={{
                      x: Number(seat.location.split("/")[0]),
                      y: Number(seat.location.split("/")[1]),
                      w: 1,
                      h: 1,
                    }}
                    className={
                      "relative text-xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-natural"
                    }
                  >
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
        )}
      </GridLayout>
      <div
        className={
          showMenu
            ? "absolute top-[20dvh] h-[60dvh] w-[300px] p-5 border-secondary border-8 bg-primary rounded-xl left-[50px] transition-all"
            : "absolute top-[20dvh] h-[60dvh] w-[300px] p-5 border-secondary border-8 bg-primary rounded-xl left-[-300px] transition-all"
        }
      >
        <div
          className="absolute right-[-40px] top-[calc(50%-50px)] text-black h-[100px] w-[20px] flex justify-center items-center font-bold"
          onClick={() => {
            setShowMenu((showMenu) => !showMenu);
          }}
        >
          {showMenu ? "〈" : "　〉"}
        </div>
        <h3 className="text-accent font-bold text-lg">配置パーツ</h3>
        <div
          draggable
          unselectable="on"
          className={
            "droppable-element text-2xl flex !h-[60px] !w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black font-bold text-accent shadow-md transition-all bg-natural"
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
      </div>
    </>
  );
}
