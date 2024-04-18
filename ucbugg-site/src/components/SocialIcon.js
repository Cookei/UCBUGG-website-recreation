import React, { useState } from "react";

const SocialIcon = ({ icon, link }) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: mouseOver ? "royalblue" : "#ffccbb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "all",
        padding: "5px",
        margin: "5px",
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
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
