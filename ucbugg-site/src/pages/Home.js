import React, { forwardRef, useState } from "react";
import styles from "../styles/Home.module.css";
import appStyles from "../styles/App.module.css";
import mayaIconImage from "../assets/homePageIcon/maya-logo.jpg";
import rendermanIconImage from "../assets/homePageIcon/rrm-logo.jpg";
import creativecloudIconImage from "../assets/homePageIcon/cs-logo.jpeg";
import substancePainterImage from "../assets/homePageIcon/adobe-substance-3d-painter-icon.png";
import aftereffectIconImage from "../assets/homePageIcon/AELOGO.png";
import PipelineInfoUpdate from "../components/PipelineUpdate";
import SDHRoomImage from "../assets/images/home page/SDH200.jpg";

import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
  Sphere,
  useHelper,
} from "@react-three/drei";
import HelperGrid from "../models/HelperGrid";
import CameraRig from "../components/CameraRig";
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
          {/* HDR for lighting */}
          <Environment files="rainforest_trail_1k.hdr" />
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
          </div>
          <div style={{ flexGrow: 1 }} />
        </div>
      </section>
      <section id={styles.announcementSection}>
        <div className={styles.block}>
          <h1>Who we are</h1>
          {/* prettier-ignore */}
          <p>
            UCBUGG will soon be accepting applications for the
            <span> Fall 2023 </span> semester! Come to our online infosession on
            <span> August 28th </span> or <span>August 30th</span>. Both of these
            infosessions will cover the same material, so you need only come to one.
            During our info session we will be going over the application process,
            as well as logistics for the course. UCBUGG does not expect students or
            applicants to have any prior experience for the basic curriculum as we will be
            teaching you everything you need to know for the application at our
            first session.
          </p>
          <div className={styles.iconImageBlock}>
            <img src={mayaIconImage} className={styles.iconImage} />
            <img src={creativecloudIconImage} className={styles.iconImage} />
            <img src={rendermanIconImage} className={styles.iconImage} />
            <img src={aftereffectIconImage} className={styles.iconImage} />
            <img src={substancePainterImage} className={styles.iconImage} />
          </div>
        </div>
        <div style={{ maxWidth: "300px", width: "100%" }} />
        <div></div>
      </section>
      <section id={styles.pipelineSection}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <div id={styles.timelineContainer}>
              <div className={styles.horizontalLine} />
              <div className={styles.triangle} />
            </div>
            <div id={styles.pipelineButtons}>
              <div
                onClick={() => setPipelineState("storyBoarding")}
                className={styles.pipelineButton}
              >
                <View className={styles.timelineModelView}>
                  <Sphere />
                </View>
                <div className={styles.verticalLine} />
                <h3>Storyboarding</h3>
              </div>
              <div
                onClick={() => setPipelineState("modeling")}
                className={styles.pipelineButton}
              >
                <View className={styles.timelineModelView}>
                  <Sphere />
                </View>
                <div className={styles.verticalLine} />
                <h3>Modeling</h3>
              </div>
              <div
                onClick={() => setPipelineState("shading")}
                className={styles.pipelineButton}
              >
                <View className={styles.timelineModelView}>
                  <Sphere />
                </View>
                <div className={styles.verticalLine} />
                <h3>Shading</h3>
              </div>
              <div
                onClick={() => setPipelineState("rigging")}
                className={styles.pipelineButton}
              >
                <View className={styles.timelineModelView}>
                  <Sphere />
                </View>
                <div className={styles.verticalLine} />
                <h3>Rigging</h3>
              </div>
              <div
                onClick={() => setPipelineState("animating")}
                className={styles.pipelineButton}
              >
                <View className={styles.timelineModelView}>
                  <Sphere />
                </View>
                <div className={styles.verticalLine} />
                <h3>Animating</h3>
              </div>
              <div
                onClick={() => setPipelineState("compositing")}
                className={styles.pipelineButton}
              >
                <View className={styles.timelineModelView}>
                  <Sphere />
                </View>
                <div className={styles.verticalLine} />
                <h3>Compositing</h3>
              </div>
            </div>
          </div>
          <PipelineInfoUpdate pipelineState={pipelineState} />
        </div>
      </section>
      <section id={styles.directionSection}>
        <div className={styles.SDHImageContainer}>
          <img src={SDHRoomImage} className={styles.SDHImageBlock} />
        </div>
        <div className={styles.SDHTextBlock}>
          <h1>SDH 200</h1>
          <div className={styles.SDHSmallTextBlock}>
            <h1>Mon/Weds</h1>
            <h1>7:00 pm - 9:00 pm</h1>
          </div>
          <button className={styles.SDHButton}>
            <h1>Apply Now!</h1>
          </button>
        </div>
        <div></div>
      </section>
    </>
  );
};

export default Home;
