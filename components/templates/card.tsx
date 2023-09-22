import { motion } from "framer-motion";
import Border from "./border";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";

export default function Card({ children }: { children: any }) {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <motion.div
      initial={{ left: -360 }}
      animate={{ left: 15 }}
      exit={{ left: -360 }}
      transition={{ ease: "easeInOut", bounce: 0, duration: 0.15 }}
      className="absolute left-[15px] top-1/2 z-20 min-w-[360px] -translate-y-1/2"
      onClick={() => {
        if (isHeader) setIsHeader(false);
        if (isFooter) setIsFooter(false);
      }}
    >
      <Border size="min-h-[90dvh] px-4 py-2">{children}</Border>
    </motion.div>
  );
}
