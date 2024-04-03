import React, { forwardRef } from "react";
import styles from "../styles/About.module.css";

const About = forwardRef((props, ref) => {
  return (
    <>
      <section id={styles.projectSection}>
        <div ref={ref} />
      </section>
      <section id={styles.historySection}>
        <h1>A Brief History</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut
            quam felis. Nunc malesuada sodales vulputate. Ut eu risus a quam
            hendrerit pharetra. Duis elementum augue eget dictum iaculis. Aenean
            vitae ex ut velit condimentum interdum eget a justo. Vivamus
            fringilla enim hendrerit eros mattis bibendum. Sed accumsan lectus
            justo, ullamcorper scelerisque turpis tincidunt ac. Nulla ut
            hendrerit nulla, in venenatis tortor.
          </p>
        </div>
      </section>
      <section id={styles.staffSection}></section>
    </>
  );
});

export default About;
