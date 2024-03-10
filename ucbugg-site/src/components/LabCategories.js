import React from "react";
import LabCategory from "./LabCategory";

const LabCategories = (props) => {
  const { onSelect } = props;
  return (
    <>
      <LabCategory
        selectCallback={onSelect}
        title="Introduction To Maya"
        lineDirection={["lineDown"]}
      />
      <LabCategory />
      <LabCategory />
      <LabCategory />
      {/* ------- */}
      <LabCategory
        selectCallback={onSelect}
        title="Pre-Production"
        lineDirection={["lineRight"]}
      />
      <LabCategory
        selectCallback={onSelect}
        title="Modeling"
        lineDirection={["lineDown", "lineRight"]}
      />
      <LabCategory
        selectCallback={onSelect}
        title="Rigging"
        lineDirection={["lineDown"]}
      />
      <LabCategory />
      {/* ------- */}
      <LabCategory />
      <LabCategory
        selectCallback={onSelect}
        title="Shading"
        lineDirection={["lineDown"]}
      />
      <LabCategory
        selectCallback={onSelect}
        title="Animating"
        lineDirection={["lineDown", "lineRight"]}
      />
      <LabCategory selectCallback={onSelect} title="Post-Production" />
      {/* ------- */}
      <LabCategory />
      <LabCategory selectCallback={onSelect} title="Lighting" />
      <LabCategory selectCallback={onSelect} title="Effects" />
      <LabCategory />
    </>
  );
};

export default LabCategories;
