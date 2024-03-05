import React from "react";
import styles from "../styles/Lab.module.css";
import { Link } from "wouter";

const LabCard = (props) => {
  const { name, path } = props;
  return (
    <Link to={`labs/${path}`} className={styles.labCard}>
      {name.replace(/_/g, " ")}
    </Link>
  );
};

export default LabCard;
