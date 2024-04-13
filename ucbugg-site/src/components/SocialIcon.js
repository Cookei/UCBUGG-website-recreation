import React from "react";

const SocialIcon = ({ icon, link }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#ffccbb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "all",
        padding: "5px",
        margin: "5px",
      }}
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
