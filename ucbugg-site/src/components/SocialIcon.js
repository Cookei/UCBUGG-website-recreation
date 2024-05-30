import React from "react";
import styles from "../styles/Home.module.css";


const SocialIcon = ({ icon, link }) => {
  return (
    <div className={styles.socialicon}>
      <a href={link} target="_blank" style={{ height: "100%", width: "100%" }}>
        <img
          src={icon}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </a>
    </div>
  );
};

export default SocialIcon;
