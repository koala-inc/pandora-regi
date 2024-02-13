"use client";

import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Tabs, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import ReactFlow, { useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

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

export default function SeatEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodes2, setNodes2, onNodesChange2] = useNodesState(initialNodes2);
  const [opened, { toggle }] = useDisclosure();
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        コンポーネント
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
        <br />
        コンポーネント設定
        <br />
        席ID：
        <select>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
          <option>E</option>
          <option>F</option>
          <option>G</option>
          <option>H</option>
          <option>I</option>
          <option>J</option>
          <option>K</option>
          <option>L</option>
          <option>M</option>
          <option>N</option>
          <option>O</option>
          <option>P</option>
          <option>Q</option>
          <option>R</option>
          <option>S</option>
          <option>T</option>
          <option>U</option>
          <option>V</option>
          <option>W</option>
          <option>X</option>
          <option>Y</option>
          <option>Z</option>
        </select>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
          <option>24</option>
          <option>25</option>
          <option>26</option>
        </select>
        <br />
        サイズ：
        <input type="text" value={50} /> × <input type="text" value={100} />
        <br />
        画像：なし
        <br />
      </AppShell.Navbar>
      <AppShell.Main>
        <Tabs variant="outline" defaultValue="background">
          <Tabs.List>
            <Tabs.Tab
              value="background"
              leftSection={<IconPhoto style={iconStyle} />}
            >
              背景
            </Tabs.Tab>
            <Tabs.Tab
              value="front"
              leftSection={<IconMessageCircle style={iconStyle} />}
            >
              席
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              leftSection={<IconSettings style={iconStyle} />}
            >
              設定
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="background" className="relative w-full h-full">
            <div
              className={
                "absolute top-0 left-0 w-[70dvw] h-[70dvh] -z-50 opacity-25"
              }
            >
              <ReactFlow
                snapToGrid={true}
                snapGrid={[50, 50]}
                nodes={nodes2}
                onNodesChange={onNodesChange2}
              />
            </div>
            <div className={"absolute top-0 left-0 w-[70dvw] h-[70dvh]"}>
              <ReactFlow
                snapToGrid={true}
                snapGrid={[50, 50]}
                nodes={nodes}
                onNodesChange={onNodesChange}
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="front" className="relative w-full h-full">
            <div
              className={
                "absolute top-0 left-0 w-[70dvw] h-[70dvh] -z-50 opacity-25"
              }
            >
              <ReactFlow
                snapToGrid={true}
                snapGrid={[50, 50]}
                nodes={nodes}
                onNodesChange={onNodesChange}
              />
            </div>
            <div className={"absolute top-0 left-0 w-[70dvw] h-[70dvh]"}>
              <ReactFlow
                snapToGrid={true}
                snapGrid={[50, 50]}
                nodes={nodes2}
                onNodesChange={onNodesChange2}
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings">
            <div className="relative">
              <div className="map grayscale brightness-0 opacity-30 top-[3px!important] left-[3px!important]">
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-xl justify-center border border-black bg-natural font-bold text-3xl text-accent transition-all [grid-area:2/5]"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/5]"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center border border-black border-l-0 border-r-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/4]"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/3] rotate-180"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/8]"
                  }
                ></div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center border border-black border-l-0 border-r-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/7]"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/6] rotate-180"
                  }
                ></div>

                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-tr-xl justify-center border border-black border-l-0 border-b-0 bg-natural font-bold text-3xl text-accent transition-all"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center border border-black border-l-0 border-b-0 border-r-0 bg-natural font-bold text-3xl text-accent transition-all"
                  }
                >
                  1
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center bg-natural font-bold text-3xl text-accent transition-all"
                  }
                >
                  1
                </div>
              </div>
              <div className="map">
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-xl justify-center border border-black bg-natural font-bold text-3xl text-accent transition-all [grid-area:2/5]"
                  }
                >
                  <span className="opacity-30">99</span>
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/5]"
                  }
                ></div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center border border-black border-l-0 border-r-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/4]"
                  }
                >
                  <span className="opacity-30">1</span>
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/3] rotate-180"
                  }
                ></div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/8]"
                  }
                ></div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center border border-black border-l-0 border-r-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/7]"
                  }
                >
                  <span className="opacity-30">1</span>
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-r-xl justify-center border border-black border-l-0 bg-natural font-bold text-3xl text-accent transition-all [grid-area:4/6] rotate-180"
                  }
                ></div>

                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center rounded-tr-xl justify-center border border-black border-l-0 border-b-0 bg-natural font-bold text-3xl text-accent transition-all"
                  }
                >
                  <span className="opacity-30">1</span>
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center border border-black border-l-0 border-b-0 border-r-0 bg-natural font-bold text-3xl text-accent transition-all"
                  }
                >
                  <span className="opacity-30">1</span>
                </div>
                <div
                  className={
                    "mt-2 relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center bg-natural font-bold text-3xl text-accent transition-all"
                  }
                >
                  <span className="opacity-30">1</span>
                </div>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
}
