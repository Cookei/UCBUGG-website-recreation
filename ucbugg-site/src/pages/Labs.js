import React, { useEffect, useState, useRef } from "react";
// import { Routes, Route } from "react-router-dom";
import data from "./labExport";
import styles from "../styles/Lab.module.css";
import LabCategories from "../components/LabCategories";
import LabCategory from "../components/LabCategory";
import LabCard from "../components/LabCard";
import { motion } from "framer-motion";

const Labs = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const categoryTopElem = useRef(null);

  const categoryVariants = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        staggerChildren: 0.3,
      },
    },
    show: {
      y: -5,
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const MotionLabCard = motion(LabCard);

  function generateCategoryInfo(data, name) {
    let counter = 0;
    if (data == null) return;
    const returnArray = [];
    if (data["Basic"] != undefined) {
      returnArray.push(
        <motion.div key={counter} variants={categoryVariants} initial="hidden">
          <motion.h1 key={counter + "h1"}>Basic</motion.h1>
          <motion.div className={styles.labRow} key={counter + "row"}>
            {Object.entries(data["Basic"]).map((element) => {
              let [key, value] = element;
              counter++;
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={categoryVariants}
                  name={key}
                />
              );
            })}
          </motion.div>
        </motion.div>
      );
    }
    if (data["Advanced"] != undefined) {
      returnArray.push(
        <motion.div key={counter} variants={categoryVariants} initial="hidden">
          <motion.h1 key={counter + "h1"}>Advanced</motion.h1>
          <motion.div className={styles.labRow} key={counter + "row"}>
            {Object.entries(data["Advanced"]).map((element) => {
              let [key, value] = element;
              counter++;
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={categoryVariants}
                  name={key}
                />
              );
            })}
          </motion.div>
        </motion.div>
      );
    }
    if (data["Basic"] == undefined && data["Advanced"] == undefined) {
      returnArray.push(
        Object.entries(data).map((element) => {
          let [key, value] = element;
          counter++;
          return (
            <MotionLabCard
              path={value.markdown[1]}
              key={key}
              className={styles.labCard}
              variants={categoryVariants}
              name={key}
            />
          );
        })
      );
    }
    return returnArray;
  }

  useEffect(() => {
    if (selectedCategory == null || selectedCategory == undefined) return;
    const selectedData = selectedCategory.replace(/[ -]/g, "_");
    setSelectedCategoryData(
      generateCategoryInfo(data[selectedData], selectedData)
    );
  }, [selectedCategory]);

  return (
    <section id={styles.labSection}>
      <h1>All Labs</h1>
      <br />
      <motion.div
        id={styles.categoryGridContainer}
        initial="default"
        animate={selectedCategoryData == null ? "default" : "reveal"}
        variants={{
          default: {
            backgroundColor: "#ccc4ce21",
          },
          reveal: {
            backgroundColor: "#f5fbff48",
          },
        }}
      >
        <LabCategory title="View this week's Lab" ref={categoryTopElem} />
        <LabCategories
          onSelect={(selected) => {
            setSelectedCategory(selected);
          }}
        />
        <motion.div
          id={styles.categoryData}
          initial="hidden"
          animate={selectedCategoryData != null ? "show" : "hidden"}
          variants={{
            hidden: {
              height: "0",
              transition: {
                staggerChildren: 0.5,
              },
            },
            show: {
              height: "100%",
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          <motion.h1
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectedCategory}
          </motion.h1>
          <motion.div variants={categoryVariants}>
            {selectedCategoryData}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Labs;
