import { motion } from "framer-motion";

export default function Card({ children }: { children: any }) {
  return (
    <motion.div
      initial={{ left: -360 }}
      animate={{ left: 15 }}
      exit={{ left: -360 }}
      transition={{ ease: "easeInOut", bounce: 0, duration: 0.15 }}
      className="absolute left-[15px] top-1/2 z-20 min-w-[360px] -translate-y-1/2 rounded-md border border-black"
    >
      <div className="rounded-md border-4 border-secondary">
        <span className="flex min-h-[90dvh] items-center justify-center rounded-md border border-black bg-primary px-4 py-2">
          {children}
        </span>
      </div>
    </motion.div>
  );
}
