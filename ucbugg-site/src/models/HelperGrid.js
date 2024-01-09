import { useThree } from "@react-three/fiber";
import React from "react";

const HelperGrid = () => {
  const viewport = useThree((state) => state.viewport);
  const SPLASH_OFFSET = [-viewport.width / 5, -1.5, viewport.width / 5];
  return (
    <mesh>
      <gridHelper position={SPLASH_OFFSET} />
    </mesh>
  );
};

export default HelperGrid;
