import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsAnimateGlobal from "@/globalstates/isAnimate";

function ContentHeader({ children }: { children: any }) {
  return (
    <SubBorder size="min-h-[calc(20dvh-15px)] w-full px-4 py-2">
      {children}
    </SubBorder>
  );
}

function Content({ children }: { children: any }) {
  return (
    <Border size="min-h-[calc(80dvh-40px)] w-full px-4 py-2">{children}</Border>
  );
}

export default function Control({ children }: { children: any }) {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "easeInOut",
          bounce: 0,
          duration: 0.15,
          delay: 0.15,
        }}
        className="absolute left-[390px] top-1/2 z-20 min-h-[calc(100dvh-30px)] min-w-[calc(100dvw-405px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
        }}
      >
        <ContentHeader>{children}</ContentHeader>
        <Content>{children}</Content>
      </motion.div>
    </>
  );
}
