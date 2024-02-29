import { motion } from "framer-motion";
import Border from "@/components/templates/border";

// グローバルステート
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";

function Content({ children }: { children: any }) {
  return (
    <Border size="min-h-[745px] h-[95dvh] max-h-[820px] px-2 py-6">
      {children}
    </Border>
  );
}

export default function Card({ children }: { children: any }) {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <>
      <motion.div
        initial={{ left: -360 }}
        animate={{ left: 15 }}
        exit={{ left: -360 }}
        transition={{ ease: "easeInOut", bounce: 0, duration: 0.15 }}
        className="absolute left-[15px] top-1/2 z-20 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <Content>{children}</Content>
      </motion.div>
    </>
  );
}
