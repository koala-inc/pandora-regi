import { motion } from "framer-motion";
import Image from "next/image";
import useIsFooterGlobal from "@/globalstates/isFooter";
import Button from "@/components/templates/button";
import Border from "@/components/templates/border";
import Link from "next/link";
import useIsAnimateGlobal from "@/globalstates/settings";

function Content() {
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <Border size="px-6 py-3">
      <div className="flex w-full flex-wrap items-start justify-around">
        <Link href={"/timecard"}>
          <Button className={"w-[8em]"}>タイムカード</Button>
        </Link>
        <Link href={"/dailyPayment"}>
          <Button className={"w-[8em]"}>送り/日払い</Button>
        </Link>
        <Link href={"/directSales"}>
          <Button className={"w-[8em]"} disabled>
            外販
          </Button>
        </Link>
        <Link href={"/receiptJournal"}>
          <Button className={"w-[8em]"} disabled>
            出納帳
          </Button>
        </Link>
        <Link href={"/listForm"}>
          <Button className={"w-[8em]"}>リスト票</Button>
        </Link>
        <Link href={"/baggage"}>
          <Button className={"w-[8em]"} disabled>
            荷物
          </Button>
        </Link>
        <Link href={"/customer"}>
          <Button className={"w-[8em]"} disabled>
            顧客
          </Button>
        </Link>
        <Button className={"w-[8em]"} disabled>
          ポイント
        </Button>
        <Link href={"/keepBottle"}>
          <Button className={"w-[8em]"} disabled>
            キープボトル
          </Button>
        </Link>
        <Link href={"/inventory"}>
          <Button className={"w-[8em]"} disabled>
            在庫
          </Button>
        </Link>
        <Link href={"/voucherHistory"}>
          <Button className={"w-[8em]"} disabled>
            キャスト
            <br />
            伝票履歴
          </Button>
        </Link>
        <Link href={"/master"}>
          <Button className={"w-[8em]"}>マスター</Button>
        </Link>
        <Button className={"w-[8em]"} disabled>
          ログ
        </Button>
        <Link href={"/callSlip"}>
          <Button className={"w-[8em]"} disabled>
            コール票発行
          </Button>
        </Link>
      </div>
    </Border>
  );
}

export default function Footer() {
  const [isAnimate] = useIsAnimateGlobal();

  return (
    <>
      {isAnimate.decoration ? (
        <motion.footer
          initial={{ bottom: -160 }}
          animate={{ bottom: 15 }}
          exit={{ bottom: -160 }}
          transition={{ ease: "easeInOut", bounce: 0, duration: 0.1 }}
          className="absolute bottom-[15px] left-1/2 z-30 h-auto w-[90%] max-w-[960px] -translate-x-1/2"
        >
          <Content />
        </motion.footer>
      ) : (
        <footer className="absolute bottom-[15px] left-1/2 z-30 h-auto w-[90%] max-w-[960px] -translate-x-1/2">
          <Content />
        </footer>
      )}
    </>
  );
}
