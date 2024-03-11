import React, { forwardRef, useState } from "react";
import styles from "../styles/Home.module.css";
import mayaIconImage from "../assets/homePageIcon/maya-logo.jpg";
import rendermanIconImage from "../assets/homePageIcon/rrm-logo.jpg";
import creativecloudIconImage from "../assets/homePageIcon/cs-logo.jpeg";
import aftereffectIconImage from "../assets/homePageIcon/AELOGO.png";
import PipelineInfoUpdate from './PipelineUpdate';

const Home = forwardRef((props, ref) => {
  const [pipelineState, setPipelineState] = useState(null);

  return (
    <div>
      <section id={styles.splashSection}>
        <div ref={ref} className={styles.splashView}></div>
        <div id={styles.splashTitle}>
          <h1>UCBUGG</h1>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut
            quam felis. Nunc malesuada sodales vulputate. Ut eu risus a quam
            hendrerit pharetra. Duis elementum augue eget dictum iaculis. Aenean
            vitae ex ut velit condimentum interdum eget a justo. Vivamus
            fringilla enim hendrerit eros mattis bibendum. Sed accumsan lectus
            justo, ullamcorper scelerisque turpis tincidunt ac. Nulla ut
            hendrerit nulla, in venenatis tortor.
          </h2>
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
        <div >
        </div>
      </section>
      <section id={styles.pipelineSection}>
        <div>
          {/* 3d screen for pipeline */}
          <div>
            <button onClick={() => setPipelineState('storyBoarding')}>Button storyBoarding</button>
          </div>
          <div>
            <button onClick={() => setPipelineState('modeling')}>Button modeling</button>
          </div>
          <div>
            <button onClick={() => setPipelineState('shading')}>Button shading</button>
          </div>
          <div>
            <button onClick={() => setPipelineState('rigging')}>Button rigging</button>
          </div>
          <div>
            <button onClick={() => setPipelineState('animating')}>Button animating</button>
          </div>
          <div>
            <button onClick={() => setPipelineState('compositing')}>Button compositing</button>
          </div>
        </div>
        <PipelineInfoUpdate pipelineState={pipelineState} />
      </section>
    </div>
  );
});

export default Home;
