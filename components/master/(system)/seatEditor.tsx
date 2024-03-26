"use client";

import Control from "@/components/master/(component)/control";
import Border from "@/components/templates/border";
import Image from "next/image";
import Link from "next/link";
import ReactFlow, { useEdgesState, useNodesState } from "reactflow";
import ReactFullscreeen from "react-easyfullscreen";
import EditSeatMap from "@/components/templates/editSeatMap";

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
      <EditSeatMap />

      <Link
        href={"/master"}
        onClick={() => {
          window.location.reload();
        }}
      >
        <nav className="absolute right-[15px] top-[15px] z-50 cursor-pointer">
          <Border rounded="rounded-full" size="h-[50px] w-[50px] p-3">
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
