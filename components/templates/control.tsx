import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import SubBorder from "@/components/templates/subBorder";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import useIsControlGlobal from "@/globalstates/isControl";
import useSeatPresetGlobal from "@/globalstates/seatPreset";

function ContentHeader({ children }: { children: any }) {
  return <SubBorder size="h-[147.5px] w-[90%] px-4 py-2">{children}</SubBorder>;
}

function Content({ children }: { children: any }) {
  return <Border size="h-[582.5px] w-full px-4 py-2">{children}</Border>;
}

export default function Control({ children }: { children: any }) {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();
  const [seatPreset, setSeatPreset] = useSeatPresetGlobal();

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
        className="absolute left-[390px] top-1/2 z-20 min-h-[745px] min-w-[calc(100dvw-425px)] -translate-y-1/2"
        onClick={() => {
          if (isHeader) setIsHeader(false);
          if (isFooter) setIsFooter(false);
          if (isControl) setIsControl(false);
          if (isCard) setIsCard(false);
          if (seatPreset) setSeatPreset("");
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (isHeader) setIsHeader(false);
            if (isFooter) setIsFooter(false);
          }}
        >
          <ContentHeader>{children}</ContentHeader>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (isHeader) setIsHeader(false);
            if (isFooter) setIsFooter(false);
          }}
        >
          <Content>{children}</Content>
        </div>
      </motion.div>
    </>
  );
}
