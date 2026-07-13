"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StackPush() {
  const [phase, setPhase] = useState<"idle" | "attacking" | "replaced">("idle");

  useEffect(() => {
    const cycle = async () => {
      while (true) {
        // wait before attack
        await new Promise((r) => setTimeout(r, 1000));
        setPhase("attacking");

        // wait for attack animation
        await new Promise((r) => setTimeout(r, 1000));
        setPhase("replaced");

        // show replaced briefly
        await new Promise((r) => setTimeout(r, 5000));
        setPhase("idle");
      }
    };

    cycle();
  }, []);

  return (
    <div className="flex gap-8 p-5 h-[24*3] items-center dark:text-white">
      {/* LEFT STACK */}
      <div className="flex flex-col">
        <motion.div layout className="w-14 h-11 ml-10 rounded-xl relative">
          <Image
            src={`/assets/outof2.png`}
            alt={"out of jimmys head image"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // width={100}
            // height={100}
            fill
            priority
            className="w-auto h-auto bg-transparent"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {phase !== "replaced" ? (
            <div className="flex items-end">
              <motion.div
                key="j"
                layout
                animate={{
                  x: phase === "attacking" ? -200 : 0,
                  opacity: phase === "attacking" ? 0 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-10 h-14 rounded-xl relative"
              >
                <Image
                  src={`/assets/j.png`}
                  alt={"j"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                key="i"
                layout
                animate={{
                  y: phase === "attacking" ? -100 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-10 h-16 rounded-xl relative"
              >
                <Image
                  src={`/assets/i.png`}
                  alt={"i"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain dark:drop-shadow-[0_0_3px_white]"
                />
              </motion.div>

              <motion.div
                key="mmy"
                layout
                animate={{
                  x: phase === "attacking" ? -200 : 0,
                  opacity: phase === "attacking" ? 0 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-28.5 h-14 rounded-xl relative"
              >
                <Image
                  src={`/assets/mmys.png`}
                  alt={"mmys"}
                  fill
                  sizes="(max-width: 368px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain"
                />
              </motion.div>
            </div>
          ) : (
            <div className="flex items-end">
              <motion.div
                key="iasas"
                layout
                initial={{ x: 200 }}
                animate={{
                  x: phase === "replaced" ? 0 : 200,
                  opacity: phase === "replaced" ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-10 h-16 rounded-xl relative font-bold font-federant text-6xl"
              >
                d
              </motion.div>
              <motion.div
                key="ias"
                layout
                initial={{ y: -100 }}
                animate={{
                  y: phase === "replaced" ? 0 : -200,
                  opacity: phase === "replaced" ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-10 h-16 rounded-xl relative"
              >
                <Image
                  src={`/assets/i.png`}
                  alt={"out of jimmys head image"}
                  //   width={100}
                  //   height={100}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain dark:drop-shadow-[0_0_3px_white]"
                />
              </motion.div>
              <motion.div
                key="mmyas"
                layout
                initial={{ x: 200 }}
                animate={{
                  x: phase === "replaced" ? 0 : 200,
                  opacity: phase === "replaced" ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-28.5 h-14 rounded-xl relative text-5xl font-bold font-federant"
              >
                {/* <Image
                  src={`/assets/saac.png`}
                  alt={"out of jimmys head image"}
                  //   width={100}
                  //   height={100}
                  fill
                  priority
                  //   className="w-auto h-fit bg-transparent"
                /> */}
                {"FU's"}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div layout className="w-24.75 h-12 mx-12 rounded-xl relative">
          <Image
            src={`/assets/head.png`}
            alt={"out of jimmys head image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </motion.div>
      </div>

      {/* RIGHT ATTACKER */}
      <AnimatePresence>
        {phase === "attacking" && (
          <motion.div
            key="attackasd"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              x: { duration: 1, ease: "easeInOut" },
              opacity: { duration: 0.8, ease: "easeOut" },
            }}
            className="w-13 h-13 rounded-xl text-4xl font-bold line-through"
          >
            difu
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
