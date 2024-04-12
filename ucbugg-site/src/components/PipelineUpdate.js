import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import storyBoardingImage from "../assets/images/projects/2tailz.png";
import modelingImage from "../assets/images/projects/bandits.png";
import shadingImage from "../assets/images/projects/Chopsticks.png";
import riggingImage from "../assets/images/projects/curiousballoon.png";
import animatingImage from "../assets/images/projects/dailycommute.png";
import compositingImage from "../assets/images/projects/elle.png";

function PipelineInfoUpdate({ pipelineState }) {
  const [pipelineTitle, setPipelineTitle] = useState();
  const [pipelineDescription, setpipelineDescription] = useState();
  const [pipelineImg, setpipelineImg] = useState();

  const getPipelineTitle = (state) => {
    switch (state) {
      case "storyBoarding":
        return "Story Boarding";
      case "modeling":
        return "Modeling";
      case "shading":
        return "Shading";
      case "rigging":
        return "Rigging";
      case "animating":
        return "Animating";
      case "compositing":
        return "Compositing";
      default:
        return null;
    }
  };

  const getPipelineInfo = (state) => {
    switch (state) {
      case "storyBoarding":
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut quam felis. Nunc malesuada sodales vulputate. Ut eu risus a quam hendrerit pharetra. Duis elementum augue eget dictum iaculis. Aenean vitae ex ut velit condimentum interdum eget a justo. Vivamus fringilla enim hendrerit eros mattis bibendum. Sed accumsan lectus justo, ullamcorper scelerisque turpis tincidunt ac. Nulla ut hendrerit nulla, in venenatis tortor";
      case "modeling":
        return "Modeling info";
      case "shading":
        return "Shading info";
      case "rigging":
        return "Rigging info";
      case "animating":
        return "Animating info";
      case "compositing":
        return "Compositing info";
      default:
        return null;
    }
  };

  const getPipelineImg = (state) => {
    switch (state) {
      case "storyBoarding":
        return storyBoardingImage;
      case "modeling":
        return modelingImage;
      case "shading":
        return shadingImage;
      case "rigging":
        return riggingImage;
      case "animating":
        return animatingImage;
      case "compositing":
        return compositingImage;
      default:
        return null;
    }
  };

  useEffect(() => {
    setPipelineTitle(getPipelineTitle(pipelineState));
    setpipelineDescription(getPipelineInfo(pipelineState));
    setpipelineImg(getPipelineImg(pipelineState));
  }, [pipelineState]);

  return (
    <div
      id={styles.pipelineDataContainer}
      className={!pipelineState ? styles.hide : styles.show}
    >
      <h1>{pipelineTitle}</h1>
      <div id={styles.pipelineInfoContainer}>
        <div id={styles.pipelineDescription}>{pipelineDescription}</div>
        <div id={styles.pipelineImages}>
          <img src={pipelineImg} className={styles.pipelineImage} />
        </div>
      </div>
    </div>
  );
}

export default PipelineInfoUpdate;
