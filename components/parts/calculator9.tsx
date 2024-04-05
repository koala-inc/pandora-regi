"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../templates/button";

export default function Calculator9({ result, time, callback }: any) {
  // const [result, setResult] = useState("");
  const [tax, setTax] = useState(false);
  const max = 99;

  const [isHour, setIsHour] = useState(false);
  const [isHourTrue, setIsHourTrue] = useState(false);
  const [hour, setHour] = useState(time ? time.split(":")[0] : "00");

  const [isMinite, setIsMinite] = useState(true);
  const [isMiniteTrue, setIsMiniteTrue] = useState(false);
  const [minite, setMinite] = useState(time ? time.split(":")[1] : "00");

  const [miniteType, setMiniteType] = useState(5);
  const [result2, setResult2] = useState("");

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="relative h-[600px] w-[300px] rounded-md border border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => {
            result.isCallTimeCalculator = false;
          }}
        >
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-black bg-primary p-[6px]">
            <Image
              src={"/assets/close.svg"}
              width={18}
              height={18}
              className="z-10 !h-full !w-full"
              alt=""
            />
          </span>
        </div>
        <div className="flex">
          <p className="text-accent">分刻み</p>
        </div>
        <div className="flex">
          <Button
            natural
            className={miniteType == 1 ? "w-full" : "w-full opacity-50"}
            onClick={() => {
              setMiniteType(1);
            }}
          >
            1
          </Button>
          <Button
            natural
            className={miniteType == 5 ? "w-full" : "w-full opacity-50"}
            onClick={() => {
              setMiniteType(5);
            }}
          >
            5
          </Button>
          <Button
            natural
            className={miniteType == 15 ? "w-full" : "w-full opacity-50"}
            onClick={() => {
              setMiniteType(15);
            }}
          >
            15
          </Button>
          <Button
            natural
            className={miniteType == 30 ? "w-full" : "w-full opacity-50"}
            onClick={() => {
              setMiniteType(30);
            }}
          >
            30
          </Button>
        </div>
        <div className="flex">
          <div
            className="rounded-md　px-3 mx-2 flex h-[60px] w-[45%] rotate-180 items-center justify-center text-4xl tracking-widest text-white"
            onClick={() => {
              const num = Number(hour) + 1;
              if (num > 23) {
                setHour("00");
              } else if (num > 9) {
                setHour(String(num));
              } else {
                setHour("0" + String(num));
              }
            }}
          >
            <Image
              src={"/assets/sort-down.svg"}
              width={40}
              height={40}
              className="z-10"
              alt=""
            />
          </div>
          <div className="mx-2 flex h-[60px] w-[10%] items-center justify-center px-3 text-4xl tracking-widest text-white"></div>
          <div
            className="rounded-md　px-3 mx-2 flex h-[60px] w-[45%] rotate-180 items-center justify-center text-4xl tracking-widest text-white"
            onClick={() => {
              const num = Number(minite) + miniteType;
              if (num > 59) {
                if (num == 60) {
                  setMinite("00");
                } else {
                  if (num - 60 > 9) {
                    setMinite(String(num - 60));
                  } else {
                    setMinite("0" + String(num - 60));
                  }
                }
              } else if (num > 9) {
                setMinite(String(num));
              } else {
                setMinite("0" + String(num));
              }
            }}
          >
            <Image
              src={"/assets/sort-down.svg"}
              width={40}
              height={40}
              className="z-10"
              alt=""
            />
          </div>
        </div>
        <div className="flex">
          <div
            className={
              isHour
                ? "mx-2 flex h-[60px] w-[45%] items-center justify-center rounded-md border border-blue-300 bg-neutral-900 px-3 text-4xl tracking-widest text-white"
                : "mx-2 flex h-[60px] w-[45%] items-center justify-center rounded-md bg-neutral-900 px-3 text-4xl tracking-widest text-white"
            }
            onClick={() => {
              setIsMinite(false);
              setIsHour((isHour) => !isHour);
              setIsMiniteTrue(true);
            }}
          >
            {hour}
          </div>
          <div className="mx-2 flex h-[60px] w-[10%] items-center justify-center px-3 text-4xl tracking-widest text-white">
            :
          </div>
          <div
            className={
              isMinite
                ? "mx-2 flex h-[60px] w-[45%] items-center justify-center rounded-md border-2 border-blue-300 bg-neutral-900 px-3 text-4xl tracking-widest text-white"
                : "mx-2 flex h-[60px] w-[45%] items-center justify-center rounded-md bg-neutral-900 px-3 text-4xl tracking-widest text-white"
            }
            onClick={() => {
              setIsHour(false);
              setIsMinite((isMinite) => !isMinite);
              setIsHourTrue(true);
            }}
          >
            {minite}
          </div>
        </div>
        <div className="flex">
          <div
            className="rounded-md　px-3 mx-2 flex h-[60px] w-[45%] items-center justify-center text-4xl tracking-widest text-white"
            onClick={() => {
              const num = Number(hour) - 1;
              if (num < 0) {
                setHour("23");
              } else if (num > 9) {
                setHour(String(num));
              } else {
                setHour("0" + String(num));
              }
            }}
          >
            <Image
              src={"/assets/sort-down.svg"}
              width={40}
              height={40}
              className="z-10"
              alt=""
            />
          </div>
          <div className="mx-2 flex h-[60px] w-[10%] items-center justify-center px-3 text-4xl tracking-widest text-white"></div>
          <div
            className="rounded-md　px-3 mx-2 flex h-[60px] w-[45%] items-center justify-center text-4xl tracking-widest text-white"
            onClick={() => {
              const num = Number(minite) - miniteType;
              if (num < 0) {
                if (num == -1) {
                  setMinite("59");
                } else {
                  if (60 - Math.abs(num) > 9) {
                    setMinite(String(60 - Math.abs(num)));
                  } else {
                    setMinite("0" + String(60 - Math.abs(num)));
                  }
                }
              } else if (num > 9) {
                setMinite(String(num));
              } else {
                setMinite("0" + String(num));
              }
            }}
          >
            <Image
              src={"/assets/sort-down.svg"}
              width={40}
              height={40}
              className="z-10"
              alt=""
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 grid-rows-4 content-center items-center justify-center gap-4 text-3xl font-bold">
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("07");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("07");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 2) {
                        setHour((hour: any) => hour.slice(1) + "7");
                      } else {
                        setHour("07");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("07");
                      setIsHour(false);
                      setIsMinite(false);
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "7");
                      } else {
                        setMinite("07");
                      }
                      setIsHour(false);
                      setIsMinite(false);
                    }
                  }
                }
              }}
            >
              7
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("08");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("08");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 2) {
                        setHour((hour: any) => hour.slice(1) + "8");
                      } else {
                        setHour("08");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("08");
                      setIsHour(false);
                      setIsMinite(false);
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "8");
                      } else {
                        setMinite("08");
                      }
                      setIsHour(false);
                      setIsMinite(false);
                    }
                  }
                }
              }}
            >
              8
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("09");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("09");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 2) {
                        setHour((hour: any) => hour.slice(1) + "9");
                      } else {
                        setHour("09");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("09");
                      setIsHour(false);
                      setIsMinite(false);
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "9");
                      } else {
                        setMinite("09");
                      }
                      setIsHour(false);
                      setIsMinite(false);
                    }
                  }
                }
              }}
            >
              9
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("04");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("04");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 2) {
                        setHour((hour: any) => hour.slice(1) + "4");
                      } else {
                        setHour("04");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("04");
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "4");
                        setIsHour(false);
                        setIsMinite(false);
                      } else {
                        setMinite("04");
                      }
                    }
                  }
                }
              }}
            >
              4
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("05");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("05");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 2) {
                        setHour((hour: any) => hour.slice(1) + "5");
                      } else {
                        setHour("05");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("05");
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "5");
                        setIsHour(false);
                        setIsMinite(false);
                      } else {
                        setMinite("05");
                      }
                    }
                  }
                }
              }}
            >
              5
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("06");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("06");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 2) {
                        setHour((hour: any) => hour.slice(1) + "6");
                      } else {
                        setHour("06");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("06");
                      setIsHour(false);
                      setIsMinite(false);
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "6");
                      } else {
                        setMinite("06");
                      }
                      setIsHour(false);
                      setIsMinite(false);
                    }
                  }
                }
              }}
            >
              6
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("01");
                  setIsHour(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("01");
                    } else {
                      if (Number(hour) < 3) {
                        setHour((hour: any) => hour.slice(1) + "1");
                        setIsHour(false);
                        setIsMinite(true);
                      } else {
                        setHour("01");
                      }
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("01");
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "1");
                        setIsHour(false);
                        setIsMinite(false);
                      } else {
                        setMinite("01");
                      }
                    }
                  }
                }
              }}
            >
              1
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("02");
                  setIsHour(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("02");
                    } else {
                      if (Number(hour) < 3) {
                        setHour((hour: any) => hour.slice(1) + "2");
                        setIsHour(false);
                        setIsMinite(true);
                      } else {
                        setHour("02");
                      }
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("02");
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "2");
                        setIsHour(false);
                        setIsMinite(false);
                      } else {
                        setMinite("02");
                      }
                    }
                  }
                }
              }}
            >
              2
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (!isHour && !isMinite) {
                  setHour("03");
                  setIsMinite(true);
                } else {
                  if (isHour) {
                    if (
                      hour == "00" ||
                      hour == "03" ||
                      hour == "04" ||
                      hour == "05" ||
                      hour == "06" ||
                      hour == "07" ||
                      hour == "08" ||
                      hour == "09"
                    ) {
                      setHour("03");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      if (Number(hour) < 3) {
                        setHour((hour: any) => hour.slice(1) + "3");
                      } else {
                        setHour("03");
                      }
                      setIsHour(false);
                      setIsMinite(true);
                    }
                  }
                  if (isMinite) {
                    if (
                      minite == "00" ||
                      minite == "07" ||
                      minite == "08" ||
                      minite == "09"
                    ) {
                      setMinite("03");
                    } else {
                      if (Number(minite) < 6) {
                        setMinite((minite: any) => minite.slice(1) + "3");
                        setIsHour(false);
                        setIsMinite(false);
                      } else {
                        setMinite("03");
                      }
                    }
                  }
                }
              }}
            >
              3
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-natural text-black shadow-2xl"
              onClick={() => {
                if (isHour) {
                  if (
                    hour == "00" ||
                    hour == "03" ||
                    hour == "04" ||
                    hour == "05" ||
                    hour == "06" ||
                    hour == "07" ||
                    hour == "08" ||
                    hour == "09"
                  ) {
                    setHour("00");
                  } else {
                    if (Number(hour) < 3) {
                      setHour((hour: any) => hour.slice(1) + "0");
                      setIsHour(false);
                      setIsMinite(true);
                    } else {
                      setHour("00");
                    }
                  }
                }
                if (isMinite) {
                  if (
                    minite == "00" ||
                    minite == "07" ||
                    minite == "08" ||
                    minite == "09"
                  ) {
                    setMinite("00");
                  } else {
                    if (Number(minite) < 6) {
                      setMinite((minite: any) => minite.slice(1) + "0");
                      setIsHour(false);
                      setIsMinite(false);
                    } else {
                      setMinite("00");
                    }
                  }
                }
              }}
            >
              0
            </div>
          </div>
          <div className="col-start-2 col-end-4 row-start-4 flex items-center justify-center text-2xl">
            <div
              className="flex h-[60px] w-[90%] items-center justify-center rounded-md border border-white bg-neutral-700 text-black shadow-2xl"
              onClick={() => {
                if (callback) callback(hour, minite);
                result.isCallTimeCalculator = false;
              }}
            >
              <Image
                src={"/assets/enter.svg"}
                width={40}
                height={40}
                className="z-10"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
