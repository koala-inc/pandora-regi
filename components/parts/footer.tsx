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
    <Border size="px-5 py-3">
      <div className="flex w-full flex-wrap items-start justify-around pr-[65px]">
        <Button>タイムカード</Button>
        <Button disabled>送り/日払い</Button>
        <Button disabled>外販</Button>
        <Button disabled>出納帳</Button>
        <Button disabled>リスト票</Button>
        <Button disabled>荷物</Button>
        <Button disabled>顧客</Button>
        <Button disabled>ポイント</Button>
        <Button disabled>キープボトル</Button>
        <Button disabled>在庫</Button>
        <Button disabled>
          キャスト
          <br />
          伝票履歴
        </Button>
        <Link href={"/master"}>
          <Button>マスター</Button>
        </Link>
        <Button disabled>ログ</Button>
        <Button disabled>コール票発行</Button>
      </div>
      <nav
        className="absolute right-[25px] top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-black"
        onClick={() => setIsFooter(false)}
      >
        <div className="rounded-full border-4 border-secondary">
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
      </nav>
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
