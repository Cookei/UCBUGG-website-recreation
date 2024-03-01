import React, { forwardRef } from "react";
import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import HelperGrid from "../models/HelperGrid";
import CameraRig from "../components/CameraRig";
import SplashModel from "../models/SplashModel";

const HomeCanvas = forwardRef((props, ref) => {
  const { splashView } = ref;
  return (
    <View track={splashView}>
      <PerspectiveCamera
        makeDefault
        position={[3.5, 1.5, 4.5]}
      ></PerspectiveCamera>
      <CameraRig SPLASH_OFFSET={[3.5, 1.5, 4.5]} />
      <GradientTexture
        attach="background"
        stops={[0, 1]}
        colors={["#faf7f9", "#e1f0f5"]}
        size={1024}
      />
      <ambientLight intensity={1} />
      {/* HDR for lighting */}
      <Environment files="rainforest_trail_1k.hdr" />
      <HelperGrid />
      <SplashModel />
    </View>
  );
});

export default HomeCanvas;
