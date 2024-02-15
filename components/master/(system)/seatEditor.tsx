"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/master/border";
import SeatMap from "@/components/templates/seatMap";
import Image from "next/image";
import Link from "next/link";
import ReactFlow, { useEdgesState, useNodesState } from "reactflow";
import ReactFullscreeen from "react-easyfullscreen";

const initialNodes = [
  { id: "10", position: { x: 200, y: 100 }, data: { label: "木" } },
  { id: "11", position: { x: 200, y: 200 }, data: { label: "壁" } },
  { id: "12", position: { x: 200, y: 300 }, data: { label: "トイレ" } },
];

const initialNodes2 = [
  { id: "1", position: { x: 200, y: 100 }, data: { label: "A1" } },
  { id: "2", position: { x: 200, y: 200 }, data: { label: "A2" } },
  { id: "3", position: { x: 200, y: 300 }, data: { label: "A3" } },
  { id: "4", position: { x: 200, y: 400 }, data: { label: "B1" } },
];

export default function SeatEditor({ onExit, setMasterActivePage }: any) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodes2, setNodes2, onNodesChange2] = useNodesState(initialNodes2);

  return (
    <>
      <SeatMap />

      <Link
        href={"/master"}
        onClick={() => {
          onExit();
          setMasterActivePage("");
        }}
      >
        <nav className="absolute right-[15px] top-[15px] z-50 cursor-pointer">
          <Border rounded="rounded-full" size="h-[56px] w-[56px] p-3">
            <Image
              src={"/assets/close.svg"}
              width={26}
              height={26}
              className="!h-full !w-full"
              alt=""
            />
          </Border>
        </nav>
      </Link>
      <div className="absolute top-[20dvh] h-[60dvh] w-[300px] p-5 border-black border-8 bg-primary rounded-xl left-[50px]">
        <h3 className="text-accent font-bold text-lg">モード</h3>
        <select className="rounded-md">
          <option>席配置モード</option>
          <option>背景モード</option>
        </select>
        <hr className="my-4" />
        <h3 className="text-accent font-bold text-lg">コンポーネント</h3>
        <div
          className={
            "relative mt-2 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-xl border border-black bg-natural text-3xl font-bold text-accent transition-all"
          }
        ></div>
        <hr className="my-4" />
        <h3 className="text-accent font-bold text-lg">コンポーネント設定</h3>
        <p className="text-white">サイズ</p>
        <select className="rounded-md">
          <option>2倍</option>
          <option>3倍</option>
          <option>4倍</option>
          <option>5倍</option>
          <option>6倍</option>
        </select>
        <p className="text-white">タイプ</p>
        <select className="rounded-md">
          <option>画像</option>
          <option>テキスト</option>
        </select>
      </div>
      {/* <div className="absolute bottom-[15px] left-[15px] z-50 h-[50px] w-[50px]">
        <Image
          src="/assets/add.svg"
          width={30}
          height={30}
          className="!h-full !w-full"
          alt=""
        />
      </div> */}
    </>
  );
}
