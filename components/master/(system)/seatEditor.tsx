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
        <p className="text-white">席ID</p>
        <div className="flex">
          <select className="rounded-md">
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
          <select className="rounded-md">
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
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
            <option>60</option>
            <option>61</option>
            <option>62</option>
            <option>63</option>
            <option>64</option>
            <option>65</option>
            <option>66</option>
            <option>67</option>
            <option>68</option>
            <option>69</option>
            <option>70</option>
            <option>71</option>
            <option>72</option>
            <option>73</option>
            <option>74</option>
            <option>75</option>
            <option>76</option>
            <option>77</option>
            <option>78</option>
            <option>79</option>
            <option>80</option>
            <option>81</option>
            <option>82</option>
            <option>83</option>
            <option>84</option>
            <option>85</option>
            <option>86</option>
            <option>87</option>
            <option>88</option>
            <option>89</option>
            <option>90</option>
            <option>91</option>
            <option>92</option>
            <option>93</option>
            <option>94</option>
            <option>95</option>
            <option>96</option>
            <option>97</option>
            <option>98</option>
            <option>99</option>
          </select>
        </div>
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
