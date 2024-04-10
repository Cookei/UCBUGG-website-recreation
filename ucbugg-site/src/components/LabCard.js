import React, { forwardRef, useEffect, useState } from "react";
import styles from "../styles/Lab.module.css";
import { Link } from "wouter";
import logo from "../assets/Syllabus/logo.png";

const LabCard = forwardRef((props, ref) => {
  const { name, path, basicOrAdvanced } = props;

  return (
    <Link ref={ref} to={`labs/${path}`} className={styles.labCard}>
      {basicOrAdvanced == "both" ? (
        <div className={styles.both} />
      ) : basicOrAdvanced == "basic" ? (
        <div className={styles.basic} />
      ) : basicOrAdvanced == "advanced" ? (
        <div className={styles.advanced} />
      ) : null}
      <div className={styles.labCardImageWrapper}>
        <img src={logo} />
      </div>
      <h4>{name}</h4>
    </Link>
  );
});

export default LabCard;
