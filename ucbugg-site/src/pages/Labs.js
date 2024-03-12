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
      y: 5,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: -5,
      opacity: 0,
    },
    show: {
      y: -5,
      opacity: 1,
    },
  };

  const MotionLabCard = motion(LabCard);

  function generateCategoryInfo(data, name) {
    let counter = 0;
    if (data == null) return;
    const returnArray = [];
    if (data["Basic"] != undefined) {
      returnArray.push(
        <motion.div key={counter} variants={cardVariants}>
          <motion.h1 key={counter + "h1"} variants={categoryVariants}>
            Basic
          </motion.h1>
          <motion.div
            className={styles.labRow}
            key={counter + "row"}
            variants={categoryVariants}
          >
            {Object.entries(data["Basic"]).map((element) => {
              let [key, value] = element;
              counter++;
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={cardVariants}
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
        <motion.div key={counter} variants={cardVariants}>
          <motion.h1 key={counter + "h1"} variants={categoryVariants}>
            Advanced
          </motion.h1>
          <motion.div
            className={styles.labRow}
            key={counter + "row"}
            variants={categoryVariants}
          >
            {Object.entries(data["Advanced"]).map((element) => {
              let [key, value] = element;
              counter++;
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={cardVariants}
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
              variants={cardVariants}
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

  const [show, setShow] = useState(true);

  return (
    <section id={styles.labSection}>
      <h1>All Labs</h1>
      <br />
      <motion.div
        id={styles.categoryGridContainer}
        initial="default"
        animate={!show == null ? "default" : "reveal"}
        variants={{
          default: {
            backgroundColor: "#ccc4ce21",
          },
          reveal: {
            backgroundColor: "#f5fbff48",
          },
        }}
      >
        {selectedCategory == null ? (
          <LabCategory title={"View This Week's Lab"} ref={categoryTopElem} />
        ) : (
          <LabCategory
            title={"See all labs"}
            ref={categoryTopElem}
            selectCallback={(selected) => {
              setShow(true);
            }}
          />
        )}

        <LabCategories
          onSelect={(selected) => {
            setSelectedCategory(selected);
            setShow(false);
          }}
          show={selectedCategory == null}
        />
        <motion.div
          initial="hidden"
          id={styles.categoryData}
          animate={!show ? "show" : "hidden"}
          onAnimationComplete={(definition) => {
            if (definition == "hidden") {
              setShow(true);
              setSelectedCategory(null);
              setSelectedCategoryData(null);
              console.log(1);
            }
          }}
          variants={{
            hidden: {
              height: 0,
              opacity: 0,
              transition: {
                when: "afterChildren",
              },
            },
            show: {
              height: "100%",
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h1
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            variants={categoryVariants}
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
