import React from "react";
import styles from "../styles/Lab.module.css";

const LabCategory = (props) => {
  const { title, selectCallback, lineDirection } = props;
  if (title == undefined) return <div />;
  let counter = 0;

  return (
    <div className={styles.categoryWrapper}>
      {lineDirection
        ? lineDirection.map((e) => {
            counter++;
            return <div key={counter} className={styles[e]} />;
          })
        : null}
      <a
        className={styles.category}
        onClick={() => {
          if (selectCallback != undefined) {
            selectCallback(title);
          }
        }}
      >
        {title}
      </a>
    </div>
  );
};

export default LabCategory;
