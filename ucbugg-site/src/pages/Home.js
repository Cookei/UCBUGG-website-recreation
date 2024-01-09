import React, { forwardRef } from "react";
import styles from "../styles/Home.module.css";

const Home = forwardRef((props, ref) => {
  return (
    <div>
      <section>
        <div className={styles.splashSection}>
          <div ref={ref} className={styles.splashView}></div>
          <div id={styles.splashTitle}>
            <h1>UCBUGG</h1>
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut
              quam felis. Nunc malesuada sodales vulputate. Ut eu risus a quam
              hendrerit pharetra. Duis elementum augue eget dictum iaculis.
              Aenean vitae ex ut velit condimentum interdum eget a justo.
              Vivamus fringilla enim hendrerit eros mattis bibendum. Sed
              accumsan lectus justo, ullamcorper scelerisque turpis tincidunt
              ac. Nulla ut hendrerit nulla, in venenatis tortor.
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Home;
