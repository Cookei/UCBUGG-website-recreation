import React, { forwardRef, useState } from "react";
import styles from "../styles/Home.module.css";
import storyBoardingImage from "../assets/images/projects/2tailz.png";
import modelingImage from "../assets/images/projects/bandits.png";
import shadingImage from "../assets/images/projects/Chopsticks.png";
import riggingImage from "../assets/images/projects/curiousballoon.png";
import animatingImage from "../assets/images/projects/dailycommute.png";
import compositingImage from "../assets/images/projects/elle.png";
import defaultImage from "../assets/images/projects/extinguished.png";

function PipelineInfoUpdate({ pipelineState }) {

    const getPipelineTitle = () => {
        switch (pipelineState) {
            case 'storyBoarding': return "Story Boarding";
            case 'modeling': return "Modeling";
            case 'shading': return "Shading";
            case 'rigging': return "Rigging";
            case 'animating': return "Animating";
            case 'compositing': return "Compositing";
            default: return "Pipeline Title";
        }
    };

    const getPipelineInfo = () => {
        switch (pipelineState) {
            case 'storyBoarding': return "Story Boarding info";
            case 'modeling': return "Modeling info";
            case 'shading': return "Shading info";
            case 'rigging': return "Rigging info";
            case 'animating': return "Animating info";
            case 'compositing': return "Compositing info";
            default: return "what are you looking for?asdfhasdfasd;fhaoshdf;iuashdfi;aso;dhfaiusdhf;ashdf;aiuhdfo'ihsdfakod;hfaishdfoiahs;doknc;uiashdifjak;fuowoefh'oasdfojhas;dfhaslidfbjasdbfauishdf;iuohbseifjasjfd;oashd;fusbaejfsjasadfasfas";
        }
    };

    const getPipelineImage = () => {
        switch (pipelineState) {
            case 'storyBoarding': return storyBoardingImage;
            case 'modeling': return modelingImage;
            case 'shading': return shadingImage;
            case 'rigging': return riggingImage;
            case 'animating': return animatingImage;
            case 'compositing': return compositingImage;
            default: return defaultImage;
        }
    };

    return (
        <div>
            <div id={styles.pipelineTitle}>
                <p>{getPipelineTitle()}</p>
            </div>
            <div id={styles.pipelineIllustration}>
                <div id={styles.pipelineDescription}>
                    <p>{getPipelineInfo()}</p>
                </div>
                <div id={styles.pipelineImage}>
                    <img src={getPipelineImage()} className={styles.iconImage} />
                </div>
            </div>
        </div>
    );
}

export default PipelineInfoUpdate;