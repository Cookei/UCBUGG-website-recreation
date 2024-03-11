import React, { forwardRef } from "react";
import styles from "../styles/Lab.module.css";
import { Link } from "wouter";
import logo from "../assets/Syllabus/logo.png";

const LabCard = forwardRef((props, ref) => {
  const { name, path } = props;
  let displayName = [];
  name
    .replace(/_/g, " ")
    .split(" ")
    .forEach((element) => {
      displayName.push(element[0].toUpperCase() + element.substring(1));
    });
  displayName = displayName.join(" ");
  return (
    <Link ref={ref} to={`labs/${path}`} className={styles.labCard}>
      <div className={styles.labCardImageWrapper}>
        <img src={logo} />
      </div>
      <h4>{displayName}</h4>
    </Link>
  );
});

export default LabCard;
