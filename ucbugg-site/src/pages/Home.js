import React, { forwardRef } from "react";
import styles from "../styles/Home.module.css";

const Home = forwardRef((props, ref) => {
  return (
    <div>
      <section>
        <div>
          <div ref={ref} className={styles.splashView}></div>
          <div>Home</div>
        </div>
      </section>
    </div>
  );
});

export default Home;
