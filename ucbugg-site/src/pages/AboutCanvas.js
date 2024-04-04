import React, { forwardRef } from "react";
import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";

const AboutCanvas = forwardRef((props, ref) => {
  const { pastFacilitatorsView } = ref;
  return <View track={pastFacilitatorsView}></View>;
});

export default AboutCanvas;
