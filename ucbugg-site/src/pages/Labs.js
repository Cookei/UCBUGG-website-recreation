import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { Route, Link } from "wouter";
import WebsiteData from "../UCBUGG_Website_Data.json";
import data from "./labExport";
import styles from "../styles/Lab.module.css";
import logo from "../assets/Syllabus/logo.png";
import LabCategories from "../components/LabCategories";
import LabCategory from "../components/LabCategory";
import LabCard from "../components/LabCard";

const Labs = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  function generateCategoryInfo(data, name) {
    if (data == null) return;
    const returnArray = [];
    if (data["Basic"] != undefined) {
      returnArray.push(
        <div>
          <h1>Basic</h1>
          <div className={styles.labRow}>
            {Object.entries(data["Basic"]).map((element) => {
              let [key, value] = element;
              return (
                <LabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  name={key}
                />
              );
            })}
          </div>
        </div>
      );
    }
    if (data["Advanced"] != undefined) {
      returnArray.push(
        <div>
          <h1>Advanced</h1>
          <div className={styles.labRow}>
            {Object.entries(data["Advanced"]).map((element) => {
              let [key, value] = element;
              return (
                <LabCard
                  path={value.markdown[1]}
                  key={key}
                  className={styles.labCard}
                  name={key}
                />
              );
            })}
          </div>
        </div>
      );
    }
    if (data["Basic"] == undefined && data["Advanced"] == undefined) {
      returnArray.push(
        Object.entries(data).map((element) => {
          let [key, value] = element;
          return (
            <LabCard
              path={value.markdown[1]}
              key={key}
              className={styles.labCard}
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
    console.log(selectedCategoryData);
  }, [selectedCategory]);

  return (
    <section>
      <h1>All Labs</h1>
      <LabCategory title="View this week's Lab" />
      <div id={styles.categoryContainer}>
        <LabCategories
          onSelect={(selected) => {
            setSelectedCategory(selected);
          }}
        />
      </div>
      <div
        id={styles.categoryData}
        className={selectedCategory == undefined ? styles.hidden : styles.shown}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {selectedCategory}
        </h1>
        <div>{selectedCategoryData}</div>
      </div>
      {/* <div>{selectedCategoryData}</div>
      <div id={styles.categoryContainer}>
        {WebsiteData["Lab Order"].map((e) => {
          return (
            <div>
              <div
                className={styles.category}
                onClick={() => setSelectedCategory(e)}
              >
                <img src={logo} />
              </div>
              <div>{e}</div>
            </div>
          );
        })}
      </div> */}
    </section>
  );
};

export default Labs;
