import { motion } from "framer-motion";
import Border from "@/components/templates/border";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsAnimateGlobal from "@/globalstates/isAnimate";
import OrderSet from "./controls/orderSet";
import OrderItemAdd from "./controls/orderItemAdd";
import useIsControlGlobal from "@/globalstates/isControl";
import useIsControlOrderItemAddGlobal from "@/globalstates/controls/isControlOrderItemAdd";
import useIsControlOrderSetGlobal from "@/globalstates/controls/isControlOrderSet";
import OrderEnd from "./controls/orderEnd";
import useIsControlOrderEndGlobal from "@/globalstates/controls/isControlOrderEnd";

function Content({ children }: { children: any }) {
  return (
    <Border size="min-h-[745px] h-[95dvh] max-h-[820px] px-4 py-6">
      {children}
    </Border>
  );
}

export default function Card({ children }: { children: any }) {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isControl, setIsControl] = useIsControlGlobal();
  const [isControlOrderSet, setIsControlOrderSet] =
    useIsControlOrderSetGlobal();
  const [isControlOrderItemAdd, setIsControlOrderItemAdd] =
    useIsControlOrderItemAddGlobal();
  const [isControlOrderEnd, setIsControlOrderEnd] =
    useIsControlOrderEndGlobal();
  const [isAnimate] = useIsAnimateGlobal();

  return (
    <>
      {isAnimate.decoration ? (
        <>
          <motion.div
            initial={{ left: -360 }}
            animate={{ left: 15 }}
            exit={{ left: -360 }}
            transition={{ ease: "easeInOut", bounce: 0, duration: 0.15 }}
            className="absolute left-[15px] top-1/2 z-20 -translate-y-1/2"
            onClick={() => {
              if (isHeader) setIsHeader(false);
              if (isFooter) setIsFooter(false);
            }}
          >
            {/* <Content>{children}</Content> */}
            <Content>-</Content>
            {isControlOrderSet && <OrderSet />}
            {isControlOrderItemAdd && <OrderItemAdd />}
            {isControlOrderEnd && <OrderEnd />}
          </motion.div>
        </>
      ) : (
        <div
          className="absolute left-[15px] top-1/2 z-20 min-w-[360px] -translate-y-1/2"
          onClick={() => {
            if (isHeader) setIsHeader(false);
            if (isFooter) setIsFooter(false);
          }}
        >
          <Content>{children}</Content>
        </div>
      )}
    </>
  );
}
