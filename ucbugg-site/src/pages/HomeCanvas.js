import React, { forwardRef, useRef } from "react";
import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
  Sphere,
  useHelper,
} from "@react-three/drei";
import HelperGrid from "../models/HelperGrid";
import CameraRig from "../components/CameraRig";
import { SpotLightHelper } from "three";
const SplashModel = React.lazy(() => import("../models/SplashModel"));

const HomeCanvas = forwardRef((props, ref) => {
  const { splashView, timelineRefs } = ref;
  const {
    storyboardingRef,
    modelingRef,
    shadingRef,
    riggingRef,
    animatingRef,
    compositingRef,
  } = timelineRefs;

  return (
    <>
      <SplashView ref={splashView} />
      <StoryboardingView ref={storyboardingRef} />
      <ModelingView ref={modelingRef} />
      <ShadingView ref={shadingRef} />
      <RiggingView ref={riggingRef} />
      <AnimatingView ref={animatingRef} />
      <CompositingView ref={compositingRef} />
    </>
  );
});

const SplashView = forwardRef((props, ref) => {
  return (
    <View track={ref} index={1}>
      <PerspectiveCamera makeDefault position={[3.5, 1.5, 4.5]} />
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

const StoryboardingView = forwardRef((props, ref) => {
  return <View track={ref}></View>;
});

const ModelingView = forwardRef((props, ref) => {
  return <View track={ref}></View>;
});

const ShadingView = forwardRef((props, ref) => {
  const light = useRef();

  return (
    <View track={ref}>
      <Sphere scale={2.5} />
      <spotLight ref={light} intensity={0.2} position={[0, 1, 0]} />
    </View>
  );
});

const RiggingView = forwardRef((props, ref) => {
  return <View track={ref}></View>;
});

const AnimatingView = forwardRef((props, ref) => {
  return <View track={ref}></View>;
});

const CompositingView = forwardRef((props, ref) => {
  return <View track={ref}></View>;
});

export default HomeCanvas;
