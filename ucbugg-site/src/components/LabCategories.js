import React from "react";
import LabCategory from "./LabCategory";

const LabCategories = (props) => {
  const { onSelect } = props;
  return (
    <>
      <LabCategory
        selectCallback={onSelect}
        title="Introduction To Maya"
      ></LabCategory>
      <LabCategory />
      <LabCategory />
      <LabCategory />
      {/* ------- */}
      <LabCategory
        selectCallback={onSelect}
        title="Pre-Production"
      ></LabCategory>
      <LabCategory selectCallback={onSelect} title="Modeling"></LabCategory>
      <LabCategory selectCallback={onSelect} title="Rigging"></LabCategory>
      <LabCategory />
      {/* ------- */}
      <LabCategory />
      <LabCategory selectCallback={onSelect} title="Shading"></LabCategory>
      <LabCategory selectCallback={onSelect} title="Animating"></LabCategory>
      <LabCategory
        selectCallback={onSelect}
        title="Post-Production"
      ></LabCategory>
      {/* ------- */}
      <LabCategory />
      <LabCategory selectCallback={onSelect} title="Lighting"></LabCategory>
      <LabCategory selectCallback={onSelect} title="Effects"></LabCategory>
      <LabCategory />
    </>
  );
};

export default LabCategories;
