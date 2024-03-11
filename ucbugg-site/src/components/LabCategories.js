import React, { forwardRef, useEffect, useState } from "react";
import LabCategory from "./LabCategory";
import { motion } from "framer-motion";
import styles from "../styles/Lab.module.css";

const LabCategories = (props) => {
  const { onSelect } = props;
  const [hide, setHide] = useState(false);
  const [selected, setSelected] = useState(null);

  const MotionLabCategory = motion(LabCategory);

  const variants = {
    show: {
      visibility: "visible",
      height: "100%",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    hidden: {
      visibility: "hidden",
      height: "0",
      transition: {
        when: "afterChildren",
        staggerChildren: 0.03,
      },
    },
  };

  const LabVariants = {
    show: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  const selectFunc = (selected) => {
    setHide(true);
    setSelected(selected);
  };
  return (
    <motion.div
      id={styles.categoryContainer}
      animate={hide ? "hidden" : "show"}
      variants={variants}
      onAnimationComplete={(definition) => {
        if (definition == "hidden") {
          onSelect(selected);
        }
      }}
    >
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Introduction To Maya"
        lineDirection={["lineDown"]}
        variants={LabVariants}
      />
      <MotionLabCategory variants={LabVariants} />
      <MotionLabCategory variants={LabVariants} />
      <MotionLabCategory variants={LabVariants} />
      {/* ------- */}
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Pre-Production"
        lineDirection={["lineRight"]}
        variants={LabVariants}
      />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Modeling"
        lineDirection={["lineDown", "lineRight"]}
        variants={LabVariants}
      />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Rigging"
        lineDirection={["lineDown"]}
        variants={LabVariants}
      />
      <MotionLabCategory variants={LabVariants} />
      {/* ------- */}
      <MotionLabCategory variants={LabVariants} />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Shading"
        lineDirection={["lineDown"]}
        variants={LabVariants}
      />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Animating"
        lineDirection={["lineDown", "lineRight"]}
        variants={LabVariants}
      />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Post-Production"
        variants={LabVariants}
      />
      {/* ------- */}
      <MotionLabCategory variants={LabVariants} />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Lighting"
        variants={LabVariants}
      />
      <MotionLabCategory
        selectCallback={selectFunc}
        title="Effects"
        variants={LabVariants}
      />
      <MotionLabCategory variants={LabVariants} />
    </motion.div>
  );
};

export default LabCategories;
