import React, { forwardRef, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import appStyles from "../styles/App.module.css";
import mayaIconImage from "../assets/homePageIcon/maya-logo.jpg";
import rendermanIconImage from "../assets/homePageIcon/rrm-logo.jpg";
import creativecloudIconImage from "../assets/homePageIcon/cs-logo.jpeg";
import substancePainterImage from "../assets/homePageIcon/adobe-substance-3d-painter-icon.png";
import aftereffectIconImage from "../assets/homePageIcon/AELOGO.png";
import PipelineInfoUpdate from "../components/PipelineUpdate";
import SDHRoomImage from "../assets/homePageIcon/SDH200.jpg";

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
const SplashModel = React.lazy(() => import("../models/SplashModel"));

const Home = (props, ref) => {
  const [pipelineState, setPipelineState] = useState(null);

  return (
    <>
      <section id={styles.splashSection}>
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
        </View>
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
            The UC Berkeley Undergraduate Graphics Group (UCBUGG) is a group of passionate students who want to introduce our fellow peers to the art of creating a 3D-animated short film. We run the UCBUGG DeCal, offering both a basic and advanced curriculum. This DeCal guides students of all skill levels through the entire production pipeline of creating an animated film, using software like Autodesk Maya, Adobe After Effects, and Pixar's Renderman. UCBUGG alumni have broke into the industry, working at places like Dreamworks, Pixar, and Sony Interactive Entertainment
          </p>
          <div className={styles.iconImageBlock}>
            <img src={mayaIconImage} className={styles.iconImage} />
            <img src={creativecloudIconImage} className={styles.iconImage} />
            <img src={rendermanIconImage} className={styles.iconImage} />
            <img src={aftereffectIconImage} className={styles.iconImage} />
            <img src={substancePainterImage} className={styles.iconImage} />
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
                <div id={styles.timelineContainer}>
                  <div className={styles.horizontalLine} />
                  <div className={styles.triangle} />
                </div>
                <div id={styles.pipelineButtons}>
                  <div
                    onClick={() => setPipelineState("storyBoarding")}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={StoryboardingImage}
                    />
                    <div className={styles.verticalLine} />
                    <h3>Storyboarding</h3>
                  </div>
                  <div
                    onClick={() => setPipelineState("modeling")}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={ModelingImage}
                    />
                    <div className={styles.verticalLine} />
                    <h3>Modeling</h3>
                  </div>
                  <div
                    onClick={() => setPipelineState("shading")}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={ShadingImage}
                    />
                    <div className={styles.verticalLine} />
                    <h3>Shading</h3>
                  </div>
                  <div
                    onClick={() => setPipelineState("rigging")}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={RiggingImage}
                    />
                    <div className={styles.verticalLine} />
                    <h3>Rigging</h3>
                  </div>
                  <div
                    onClick={() => setPipelineState("animating")}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={AnimatingImage}
                    />
                    <div className={styles.verticalLine} />
                    <h3>Animating</h3>
                  </div>
                  <div
                    onClick={() => setPipelineState("compositing")}
                    className={styles.pipelineButton}
                  >
                    <img
                      className={styles.timelineModelImg}
                      src={CompositingImage}
                    />
                    <div className={styles.verticalLine} />
                    <h3>Compositing</h3>
                  </div>
                </div>
              </div>
              <PipelineInfoUpdate pipelineState={pipelineState} />
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
          <img src={SDHRoomImage} />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div style={{ position: "aboslute", flexGrow: 1 }} />
          <a
            className={styles.SDHTextBlock}
            href="https://maps.app.goo.gl/MYg3EeWBrpotrWBi6"
            target="_blank"
          >
            <h1>Schedule</h1>
            <div className={styles.SDHSmallTextBlock}>
              Monday or Wednesday
              <br />
              7:00 - 9:00pm 200
              <br />
              <br />
              200 Sutardja Dai Hall
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
