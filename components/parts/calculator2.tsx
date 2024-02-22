"use client";

import { useState } from "react";
import Image from "next/image";

export default function Calculator2() {
  const [result, setResult] = useState("");
  const [tax, setTax] = useState(false);
  const max = 99;

  const [isHour, setIsHour] = useState(false);
  const [hour, setHour] = useState("00");

  const [isMinite, setIsMinite] = useState(false);
  const [minite, setMinite] = useState("00");

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black/70 p-10 text-white"
      onClick={() => {}}
    >
      <div
        className="relative h-[400px] w-[300px] rounded-md border border-secondary bg-primary p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full border-4 border-secondary"
          onClick={() => {}}
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
          <div
            className={
              isHour
                ? "flex h-[60px] w-[45%] mx-2 items-center justify-center tracking-widest rounded-md bg-neutral-900 px-3 text-4xl text-white border border-blue-300"
                : "flex h-[60px] w-[45%] mx-2 items-center justify-center tracking-widest rounded-md bg-neutral-900 px-3 text-4xl text-white"
            }
            onClick={() => {
              setIsMinite(false);
              setIsHour((isHour) => !isHour);
            }}
          >
            {hour}
          </div>
          <div className="flex h-[60px] w-[10%] mx-2 items-center justify-center tracking-widest px-3 text-4xl text-white">
            :
          </div>
          <div
            className={
              isMinite
                ? "flex h-[60px] w-[45%] mx-2 items-center justify-center tracking-widest rounded-md bg-neutral-900 px-3 text-4xl text-white border border-blue-300"
                : "flex h-[60px] w-[45%] mx-2 items-center justify-center tracking-widest rounded-md bg-neutral-900 px-3 text-4xl text-white"
            }
            onClick={() => {
              setIsHour(false);
              setIsMinite((isMinite) => !isMinite);
            }}
          >
            {minite}
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
                        setHour((hour) => hour.slice(1) + "7");
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
                        setMinite((minite) => minite.slice(1) + "7");
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
                        setHour((hour) => hour.slice(1) + "8");
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
                        setMinite((minite) => minite.slice(1) + "8");
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
                        setHour((hour) => hour.slice(1) + "9");
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
                        setMinite((minite) => minite.slice(1) + "9");
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
                        setHour((hour) => hour.slice(1) + "4");
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
                        setMinite((minite) => minite.slice(1) + "4");
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
                        setHour((hour) => hour.slice(1) + "5");
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
                        setMinite((minite) => minite.slice(1) + "5");
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
                        setHour((hour) => hour.slice(1) + "6");
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
                        setMinite((minite) => minite.slice(1) + "6");
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
                        setHour((hour) => hour.slice(1) + "1");
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
                        setMinite((minite) => minite.slice(1) + "1");
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
                        setHour((hour) => hour.slice(1) + "2");
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
                        setMinite((minite) => minite.slice(1) + "2");
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
                        setHour((hour) => hour.slice(1) + "3");
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
                        setMinite((minite) => minite.slice(1) + "3");
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
                      setHour((hour) => hour.slice(1) + "0");
                    } else {
                      setHour("00");
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
                    setMinite("00");
                  } else {
                    if (Number(minite) < 6) {
                      setMinite((minite) => minite.slice(1) + "0");
                    } else {
                      setMinite("00");
                    }
                    setIsHour(false);
                    setIsMinite(false);
                  }
                }
              }}
            >
              0
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-white bg-accent text-black shadow-2xl"
              onClick={() => {
                if (isHour) {
                  setHour("00");
                }
                if (isMinite) {
                  setMinite("00");
                }
                if (!isMinite && !isHour) {
                  setHour("00");
                  setMinite("00");
                }
              }}
            >
              C
            </div>
          </div>
          <div className="flex items-center justify-center text-2xl">
            <div
              className="flex h-[60px] w-[90%] items-center justify-center rounded-md border border-white bg-neutral-700 text-black shadow-2xl"
              onClick={() => {
                if (isHour) {
                  setIsHour(false);
                  setIsMinite(true);
                }
                if (isMinite) {
                  setIsHour(false);
                  setIsMinite(false);
                }
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
