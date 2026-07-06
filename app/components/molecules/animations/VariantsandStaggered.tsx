"use client";
import { motion } from "motion/react";

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 1, delayChildren: 5 },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// good for menus, dropdowns, lists, heros
const FeatureList = ({}) => {
  const features = ["Fast", "Declarative", "Powerful", "Fun"];
  return (
    <motion.ul variants={container} initial="hidden" animate="visible">
      {features.map((feature) => (
            <motion.li key={feature} variants={item}>{feature}</motion.li>
        ))}

      {/* <h3>Fast</h3>
      <h3>Declarative</h3>
      <h3>Powerful</h3>
      <h3>Fun</h3> */}
    </motion.ul>
  );
};

export default FeatureList;
