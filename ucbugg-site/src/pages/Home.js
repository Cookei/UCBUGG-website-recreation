import React, { forwardRef, useState } from "react";
import styles from "../styles/Home.module.css";
import mayaIconImage from "../assets/homePageIcon/maya-logo.jpg";
import rendermanIconImage from "../assets/homePageIcon/rrm-logo.jpg";
import creativecloudIconImage from "../assets/homePageIcon/cs-logo.jpeg";
import aftereffectIconImage from "../assets/homePageIcon/AELOGO.png";
import PipelineInfoUpdate from "./PipelineUpdate";
import SDHRoomImage from "../assets/images/home page/SDH200.jpg";

const Home = forwardRef((props, ref) => {
  const [pipelineState, setPipelineState] = useState(null);

  return (
    <>
      <section id={styles.splashSection}>
        <div ref={ref} className={styles.splashView}></div>
        <div id={styles.splashTitle}>
          <h1>UCBUGG</h1>
          <p id = {styles.splashText}>University of California at Berkeley Undergraduate Graphic Group</p>
        </div>
      </section>
      <section id={styles.announcementSection}>
        <div className={styles.block}>
          <h1>Who we are:</h1>
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
          </div>
        </div>
        <div></div>
      </section>
      <section id={styles.pipelineSection}>
        <div>
          {/* 3d screen for pipeline */}
          <div>
            <button onClick={() => setPipelineState("storyBoarding")}>
              Button storyBoarding
            </button>
          </div>
          <div>
            <button onClick={() => setPipelineState("modeling")}>
              Button modeling
            </button>
          </div>
          <div>
            <button onClick={() => setPipelineState("shading")}>
              Button shading
            </button>
          </div>
          <div>
            <button onClick={() => setPipelineState("rigging")}>
              Button rigging
            </button>
          </div>
          <div>
            <button onClick={() => setPipelineState("animating")}>
              Button animating
            </button>
          </div>
          <div>
            <button onClick={() => setPipelineState("compositing")}>
              Button compositing
            </button>
          </div>
        </div>
        <div>
          <PipelineInfoUpdate pipelineState={pipelineState} />
        </div>
      </section>
      <section id={styles.directionSection}>
        <div className={styles.SDHImageContainer}>
        <img src={SDHRoomImage} className={styles.SDHImageBlock} />
        </div>
        <div className={styles.SDHTextBlock}>
          <h1 >SDH 200</h1>
          <div className={styles.SDHSmallTextBlock}>
            <h1 >Mon/Weds</h1>
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
});

export default Home;
