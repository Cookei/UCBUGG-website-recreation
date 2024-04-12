import React, { forwardRef } from "react";
import styles from "../styles/About.module.css";
import appStyles from "../styles/App.module.css";
import data from "./TatoeImgImports.js";
import historyImg from "../assets/images/about/ucbuggfamily_fall2019.jpg";

const About = forwardRef((props, ref) => {
  return (
    <>
      <section id={styles.projectSection}></section>
      <section id={styles.historySection}>
        <div id={styles.historyBlurb}>
          <h1>A Brief History</h1>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut
              quam felis. Nunc malesuada sodales vulputate. Ut eu risus a quam
              hendrerit pharetra. Duis elementum augue eget dictum iaculis.
              Aenean vitae ex ut velit condimentum interdum eget a justo.
              Vivamus fringilla enim hendrerit eros mattis bibendum. Sed
              accumsan lectus justo, ullamcorper scelerisque turpis tincidunt
              ac. Nulla ut hendrerit nulla, in venenatis tortor.
            </p>
            <img src={historyImg} />
          </div>
        </div>
      </section>
      <section id={styles.staffSection}>
        <h1>Current Facilitators</h1>
        <div className={styles.staffGrid}>
          {data.head_tatoes.map((e, i) => {
            return (
              <div key={i}>
                <div>
                  <img src={e.img} className={styles.staffImg} />
                  {e.name.match(/Senior/g) ? (
                    <h3>{e.name.match(/\S+/g).slice(0, -1).join(" ")}</h3>
                  ) : (
                    <h3>{e.name}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.staffGrid}>
          {data.normal_tatoes.map((e, i) => {
            return (
              <div key={i}>
                <div>
                  <img src={e.img} className={styles.staffImg} />
                  {e.name.match(/Senior/g) ? (
                    <h3>{e.name.match(/\S+/g).slice(0, -1).join(" ")}</h3>
                  ) : (
                    <h3>{e.name}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id={styles.pastFacilitatorsSection}>
        <h1 style={{ zIndex: 1, height: "fit-content" }}>Past Facilitators</h1>
        {/* <div ref={pastFacilitatorsView} className={appStyles.view} /> */}
        <div className={`${styles.staffGrid} ${styles.pastStaffGrid}`}>
          {data.past_tatoes.map((e, i) => {
            return (
              <div key={i}>
                <div>
                  <img src={e.img} />
                  {e.name.match(/Senior/g) ? (
                    <h3>{e.name.match(/\S+/g).slice(0, -1).join(" ")}</h3>
                  ) : (
                    <h3>{e.name}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
});

export default About;
