import { motion } from "framer-motion";
import Border from "@/components/templates/border";

export default function Control({ children }: { children: any }) {
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
        className="absolute left-[210px] top-1/2 z-0 h-[98dvh] w-[calc(100dvw-300px)] -translate-y-1/2"
      >
        <Border size="h-full min-h-[calc(98dvh-10px)] min-w-full px-4 py-2 flex flex-col justify-start items-center">
          {children}
        </Border>
      </motion.div>
    </>
  );
}
