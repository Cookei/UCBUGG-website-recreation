import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import appStyles from "../styles/App.module.css";
import mayaIconImage from "../assets/homePageIcon/maya-logo.jpg";
import rendermanIconImage from "../assets/homePageIcon/rrm-logo.jpg";
import creativecloudIconImage from "../assets/homePageIcon/cs-logo.jpeg";
import substancePainterImage from "../assets/homePageIcon/adobe-substance-3d-painter-icon.png";
import aftereffectIconImage from "../assets/homePageIcon/AELOGO.png";
import PipelineInfoUpdate from "../components/PipelineUpdate";
// import SDHRoomImage from "../assets/homePageIcon/SDH200.jpg";
import Soda330Image from "../assets/homePageIcon/Soda330Image.jpg";

import ModelingImage from "../assets/homePageIcon/modelingIcon.png";
import RiggingImage from "../assets/homePageIcon/riggingIcon.png";
import ShadingImage from "../assets/homePageIcon/shadingIcon.png";
import StoryboardingImage from "../assets/homePageIcon/storyboardingIcon.png";
import AnimatingImage from "../assets/homePageIcon/animatingIcon.png";
import CompositingImage from "../assets/homePageIcon/compositingIcon.png";
import Focks from "../assets/homePageIcon/focks.svg";
import BottomBanner from "../assets/homePageIcon/stupidbottombannerhillsblahugh.svg";
import oldlogo from "../assets/homePageIcon/oldlogo.svg";

import discordIcon from "../assets/homePageIcon/discord-mark-white.svg";
import emailIcon from "../assets/homePageIcon/email.svg";
import youtubeIcon from "../assets/homePageIcon/utub.svg";

import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import HelperGrid from "../models/HelperGrid";
import CameraRig from "../components/CameraRig";
import SocialIcon from "../components/SocialIcon";
import hdr from "../assets/models/rainforest_trail_1k.hdr";
import useWindowSize from "../components/useWindowSize";
const SplashModel = React.lazy(() => import("../models/SplashModel"));
const InfoseshModel = React.lazy(() => import("../models/InfoseshModel"));
// const ChristmasHatModel = React.lazy(() =>
//   import("../models/ChristmasHatModel")
// );

const Home = (props, ref) => {
  const [pipelineState, setPipelineState] = useState("storyBoarding");
  const [pipelineNum, setPipelineNum] = useState(0);

  const pipelineDict = {
    0: "storyBoarding",
    1: "modeling",
    2: "shading",
    3: "rigging",
    4: "animating",
    5: "compositing",
  };

  useEffect(() => {
    setPipelineNum(((pipelineNum % 6) + 6) % 6);
    setPipelineState(pipelineDict[pipelineNum]);
  }, [pipelineNum]);

  const size = useWindowSize();

  return (
    <>
      <div id={styles.adBanner}>
        <a href="https://forms.gle/Ysnk7TyUDETQZBDi7" target="_blank">
          <h1>UCBUGG Infosession Signup/Interest Form click here!</h1>
        </a>
      </div>
      <section id={styles.splashSection}>
        {size.width > 600 ? (
          <View index={1} className={appStyles.view}>
            <PerspectiveCamera makeDefault position={[3.5, 1.5, 4.5]} />
            <CameraRig SPLASH_OFFSET={[3.5, 1.5, 4.5]} />
            <GradientTexture
              attach="background"
              stops={[0, 1]}
              colors={["#faf7f9", "#e1f0f5"]}
              size={1024}
            />
            <ambientLight intensity={1} />
            <Environment files={hdr} />
            <HelperGrid />
            <SplashModel />
            {/* <ChristmasHatModel /> */}
            <InfoseshModel />
          </View>
        ) : null}
        <div id={styles.splashTitle}>
          <div style={{ flexGrow: 3 }} />
          <div id={styles.splashTitleBox}>
            <h1>UCBUGG</h1>
            <p id={styles.splashText}>
              University of California Berkeley Undergraduate Graphics Group
            </p>
            <div id={styles.socialIcons}>
              <SocialIcon icon={emailIcon} link="mailto:staff@ucbugg.com" />
              <SocialIcon
                icon={discordIcon}
                link="https://discord.gg/QTYFDrhw9y"
              />
              <SocialIcon
                icon={youtubeIcon}
                link="https://www.youtube.com/UCBUGG"
              />
            </div>
          </div>
          <div style={{ flexGrow: 1 }} />
        </div>
      </section>
      <section id={styles.announcementSection}>
        <div className={styles.block} id={styles.whoWeAreContainer}>
          <h1>Who we are</h1>
          {/* prettier-ignore */}
          <p>
            The UC Berkeley Undergraduate Graphics Group (UCBUGG) is a group of passionate students who want to introduce our fellow peers to the art of creating a 3D-animated short film. We run the UCBUGG DeCal, offering both a basic and advanced curriculum. This DeCal guides students of all skill levels through the entire production pipeline of creating an animated film, using software like Autodesk Maya, Adobe After Effects, and Pixar's Renderman. UCBUGG alumni have broke into the industry, working at places like Dreamworks, Pixar, and Sony Entertainment
          </p>
          <div className={styles.iconImageBlock}>
            <a
              href="https://www.autodesk.com/education/edu-software/overview?sorting=featured&filters=individual"
              target="_blank"
            >
              <img src={mayaIconImage} className={styles.iconImage} />
            </a>
            <a href="https://www.adobe.com/creativecloud.html" target="_blank">
              <img src={creativecloudIconImage} className={styles.iconImage} />
            </a>
            <a href="https://renderman.pixar.com/" target="_blank">
              <img src={rendermanIconImage} className={styles.iconImage} />
            </a>
            <a
              href="https://www.adobe.com/products/aftereffects.html"
              target="_blank"
            >
              <img src={aftereffectIconImage} className={styles.iconImage} />
            </a>
            <a
              href="https://www.adobe.com/products/substance3d/apps/painter.html"
              target="_blank"
            >
              <img src={substancePainterImage} className={styles.iconImage} />
            </a>
          </div>
        </div>
        <div id={styles.announcementSidePanel} />
        <div
          style={{
            position: "absolute",
            top: "375px",
            width: "100%",
            display: "flex",
          }}
        >
          <div style={{ flexGrow: 7 }} />
          <img
            src={Focks}
            style={{
              position: "relative",
              width: "400px",
            }}
            className={styles.backgroundImg}
          />
          <div style={{ flexGrow: 0.5 }} />
        </div>
      </section>
      <section id={styles.pipelineSection}>
        <div style={{ position: "relative", display: "flex" }}>
          <div style={{ flexGrow: 3 }} />
          <div id={styles.pipelineDiv}>
            <h1 style={{ fontSize: "3rem" }}>The Animation Pipeline</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative", marginBottom: "2rem" }}>
                <div id={styles.pipelineButtons}>
                  <div
                    onClick={() => {
                      setPipelineState("storyBoarding");
                      setPipelineNum(0);
                    }}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={StoryboardingImage}
                    />
                    <div
                      className={`${styles.verticalLine} ${
                        pipelineState == "storyBoarding" ? styles.active : ""
                      }`}
                    />
                    <h3>Storyboarding</h3>
                  </div>
                  <div
                    onClick={() => {
                      setPipelineState("modeling");
                      setPipelineNum(1);
                    }}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={ModelingImage}
                    />
                    <div
                      className={`${styles.verticalLine} ${
                        pipelineState == "modeling" ? styles.active : ""
                      }`}
                    />
                    <h3>Modeling</h3>
                  </div>
                  <div
                    onClick={() => {
                      setPipelineState("shading");
                      setPipelineNum(2);
                    }}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={ShadingImage}
                    />
                    <div
                      className={`${styles.verticalLine} ${
                        pipelineState == "shading" ? styles.active : ""
                      }`}
                    />
                    <h3>Shading</h3>
                  </div>
                  <div
                    onClick={() => {
                      setPipelineState("rigging");
                      setPipelineNum(3);
                    }}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={RiggingImage}
                    />
                    <div
                      className={`${styles.verticalLine} ${
                        pipelineState == "rigging" ? styles.active : ""
                      }`}
                    />
                    <h3>Rigging</h3>
                  </div>
                  <div
                    onClick={() => {
                      setPipelineState("animating");
                      setPipelineNum(4);
                    }}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={AnimatingImage}
                    />
                    <div
                      className={`${styles.verticalLine} ${
                        pipelineState == "animating" ? styles.active : ""
                      }`}
                    />
                    <h3>Animating</h3>
                  </div>
                  <div
                    onClick={() => {
                      setPipelineState("compositing");
                      setPipelineNum(5);
                    }}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={CompositingImage}
                    />
                    <div
                      className={`${styles.verticalLine} ${
                        pipelineState == "compositing" ? styles.active : ""
                      }`}
                    />
                    <h3>Compositing</h3>
                  </div>
                </div>
                <div id={styles.timelineContainer} style={{ zIndex: -1 }}>
                  <div className={styles.horizontalLine} />
                  <div className={styles.triangle} />
                </div>
              </div>
              <div style={{ position: "relative", display: "flex" }}>
                <PipelineInfoUpdate pipelineState={pipelineState} />
                <a
                  className={styles.prev}
                  onClick={() => {
                    setPipelineNum(pipelineNum - 1);
                  }}
                >
                  &#10094;
                </a>
                <a
                  className={styles.next}
                  onClick={() => {
                    setPipelineNum(pipelineNum + 1);
                  }}
                >
                  &#10095;
                </a>
              </div>
            </div>
          </div>
          <div style={{ flexGrow: 1 }} />
          <div
            style={{
              position: "absolute",
              top: "150px",
              width: "100%",
              display: "flex",
            }}
          >
            <div style={{ flexGrow: 1 }} />
            <img
              src={oldlogo}
              style={{
                position: "relative",
                width: "300px",
              }}
              className={styles.backgroundImg}
            />
            <div style={{ flexGrow: 7 }} />
          </div>
        </div>
      </section>
      <section id={styles.directionSection}>
        <div className={styles.SDHImageContainer} style={{ zIndex: 1 }}>
          <a href="https://maps.app.goo.gl/Me496cmvq8oSQxVS8" target="_blank">
            <img src={Soda330Image} />
          </a>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "aboslute", flexGrow: 1 }} />
          <a
            className={styles.SDHTextBlock}
            href="https://maps.app.goo.gl/Me496cmvq8oSQxVS8"
            target="_blank"
            style={{
              pointerEvents: "auto",
            }}
          >
            <h1>Schedule</h1>
            <div className={styles.SDHSmallTextBlock}>
              Monday or Friday
              <br />
              7:00 - 9:00pm
              <br />
              <br />
              <span style={{ textDecoration: "underline" }}>Soda 330</span>
            </div>
            {/* <button className={styles.SDHButton}>
              <h1>Apply Now!</h1>
            </button> */}
          </a>
          <div style={{ position: "aboslute", flexGrow: 5 }} />
        </div>
        <img
          src={BottomBanner}
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        />
      </section>
    </>
  );
};

export default Home;
