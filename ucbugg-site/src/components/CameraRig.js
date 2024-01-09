import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";

const CameraRig = (props) => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  return useFrame(() => {
    camera.position.lerp(
      vec.set(
        props.SPLASH_OFFSET[0] + mouse.x / 2,
        props.SPLASH_OFFSET[1] + mouse.y / 2,
        camera.position.z
      ),
      0.1
    );
    camera.lookAt(0, 0, 0);
  });
};

export default CameraRig;
