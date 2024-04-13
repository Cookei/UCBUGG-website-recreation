import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import storyBoardingImage from "../assets/homePageIcon/storyboardingExample.png";
import modelingImage from "../assets/homePageIcon/modelingExample.png";
import shadingImage from "../assets/homePageIcon/shadingExample.png";
import riggingImage from "../assets/homePageIcon/riggingExample.png";
import animatingImage from "../assets/homePageIcon/animatingExample.gif";
import compositingImage from "../assets/homePageIcon/compositingExample.png";

function PipelineInfoUpdate({ pipelineState }) {
  const [pipelineTitle, setPipelineTitle] = useState();
  const [pipelineDescription, setpipelineDescription] = useState();
  const [pipelineImg, setpipelineImg] = useState();

  const getPipelineTitle = (state) => {
    switch (state) {
      case "storyBoarding":
        return "Storyboarding";
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
        return "Storyboarding is the process of drafting out a sketch of your film through a series of small images. They can range from being incredibly detailed to being simple stick figures! The goal is to get a sense of what the final film is going to look like and for future animators to use it as reference. Storyboards also help realize how camera angles, zooming, panning, and overall shot composition works, allowing for a rapid way to revise and edit before anything is finalized.";
      case "modeling":
        return "Modeling is the first stage of the process. Oftentimes, before modeling, several reference drawings are drawn from different perspectives. From there, using those references, slowly but surely the 2D image is transformed into a 3D model. Keeping in mind core modeling concepts like maintaining topology, proportion, and adaptability is important for ensuring a smooth animating process later on!";
      case "shading":
        return "Shading is the process of applying texture and coloring an object in response to light. Concepts like specular, refraction, base color, and roughness are used to determine the material of an object, and make it look good in various lighting conditions. Additionally, the process of UV mapping is used in order to apply hand drawn textures onto the model!";
      case "rigging":
        return "Rigging is the process of giving a skeleton to your model and giving it the ability to move. A rig is a set of bones that control what parts of your model move, and skinning is the process of controlling how much those parts move. Rigging allows your static model to start moving and is the step before animating. Rigging can range from being very simple to incredibly complicated and intricate tech. The better the rig is, the easier it is to animate!";
      case "animating":
        return "Animating is the near final stage of the process in which you keyframe your character, setting its movements and making it do cool actions! The principles of animation are important here in order to make the movement fluid, bouncy, or strong. From squash and stretch to blur lines and anticipation, the principles of animation propel your scene from static movements to dramatic and intense action!";
      case "compositing":
        return "Compositing is the process of rendering, combining different sections of film, and applying post-process edits and effects. Compositing is an incredibly expansive skill that can change the entire emotion of your scene, from dramatic movie-like pieces to bright and colorful cartoons. Compositing is the final touch that you apply to your animation to polish it.";
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
