import React, { useEffect, useState, useRef } from "react";
// import { Routes, Route } from "react-router-dom";
import data from "./labExport";
import styles from "../styles/Lab.module.css";
import LabCategories from "../components/LabCategories";
import LabCategory from "../components/LabCategory";
import LabCard from "../components/LabCard";
import { motion } from "framer-motion";
import labSchedule from "../assets/Syllabus/labSchedule.json";
import BottomBanner from "../assets/homePageIcon/stupidbottombannerhillsblahugh.svg";

const Labs = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const categoryTopElem = useRef(null);
  const [todaysPath, setTodaysPath] = useState();

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
  const [date, setDate] = useState(new Date("Apr 10, 2024"));

  const imlosingmymind = (name) => {
    let basicOrAdvanced = null;

    let firstDofW = firstDayOfWeek(date, 0);
    if (labSchedule[firstDofW] == undefined) {
      return;
    }
    let obj = labSchedule[firstDofW];

    const aaaaa = () => {
      let findBasic = obj.basic.includes(name);
      let findAdvanced = obj.advanced.includes(name);
      if (findBasic && findAdvanced) {
        basicOrAdvanced = "both";
      } else if (findBasic) {
        basicOrAdvanced = "basic";
      } else if (findAdvanced) {
        basicOrAdvanced = "advanced";
      }
    };
    if (date - new Date(obj.real_date) >= 0) {
      aaaaa();
    } else {
      firstDofW = firstDayOfWeek(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7),
        0
      );
      if (labSchedule[firstDofW] == undefined) {
        return;
      }
      obj = labSchedule[firstDofW];
      aaaaa();
    }

    return basicOrAdvanced;
  };

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
              let fixedName = key
                .toLowerCase()
                .split("_")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              let basicOrAdvanced = imlosingmymind(fixedName);
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={cardVariants}
                  name={fixedName}
                  basicOrAdvanced={basicOrAdvanced}
                  image={value.thumbnail ? value.thumbnail : null}
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
              let fixedName = key
                .toLowerCase()
                .split("_")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              let basicOrAdvanced = imlosingmymind(fixedName);
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={cardVariants}
                  name={fixedName}
                  basicOrAdvanced={basicOrAdvanced}
                  image={value.thumbnail ? value.thumbnail : null}
                />
              );
            })}
          </motion.div>
        </motion.div>
      );
    }
    if (data["Basic"] == undefined && data["Advanced"] == undefined) {
      returnArray.push(
        <motion.div key={counter} variants={cardVariants}>
          <motion.div
            className={styles.labRow}
            key={counter + "row"}
            variants={categoryVariants}
          >
            {Object.entries(data).map((element) => {
              let [key, value] = element;
              counter++;
              let fixedName = key
                .toLowerCase()
                .split("_")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              let basicOrAdvanced = imlosingmymind(fixedName);
              return (
                <MotionLabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  variants={cardVariants}
                  name={fixedName}
                  basicOrAdvanced={basicOrAdvanced}
                  image={value.thumbnail ? value.thumbnail : null}
                />
              );
            })}
          </motion.div>
        </motion.div>
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
      <h1>Labs</h1>
      <br />
      <motion.div
        id={styles.categoryGridContainer}
        initial="default"
        animate={!show == false ? "default" : "reveal"}
        variants={{
          default: {
            backgroundColor: "#ccc4ce21",
            flexGrow: 0,
            borderRadius: "5px",
            borderBottom: "2px var(--line-color) solid",
            marginBottom: "50px",
          },
          reveal: {
            backgroundColor: "#f5fbff48",
            flexGrow: 1,
            borderRadius: "5px 5px 0 0",
            borderBottom: 0,
            marginBottom: "0px",
          },
        }}
      >
        <LabCategory
          style={{
            transition: "opacity 100ms",
            opacity: selectedCategory == null ? 0 : 1,
          }}
          title={"See all labs"}
          ref={categoryTopElem}
          selectCallback={(selected) => {
            setShow(true);
          }}
        />
        {/* {selectedCategory == null ? (
          <LabCategory
            style={{ visibility: "hidden" }}
            title={"View This Week's Lab"}
            ref={categoryTopElem}
          />
        ) : (
          <LabCategory
            title={"See all labs"}
            ref={categoryTopElem}
            selectCallback={(selected) => {
              setShow(true);
            }}
          />
        )} */}

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
              height: "auto",
              opacity: 1,
              transition: {
                when: "beforeChildren",
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
      <img
        src={BottomBanner}
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
      />
    </section>
  );
};

function firstDayOfWeek(dateObject, firstDayOfWeekIndex) {
  const dayOfWeek = dateObject.getDay(),
    firstDayOfWeek = new Date(dateObject),
    diff =
      dayOfWeek >= firstDayOfWeekIndex
        ? dayOfWeek - firstDayOfWeekIndex
        : 6 - dayOfWeek;

  firstDayOfWeek.setDate(dateObject.getDate() - diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  return firstDayOfWeek;
}

export default Labs;
