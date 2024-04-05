import React, { forwardRef, useEffect, useState } from "react";
import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
  Image,
  Circle,
  GradientType,
} from "@react-three/drei";
import melchan from "../assets/aboutPage/melchan.png";
import CameraRig from "../components/CameraRig";
import data from "./TatoeImgImports.js";
import { invalidate, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const AboutCanvas = forwardRef((props, ref) => {
  const { pastFacilitatorsView } = ref;
  const [scrollCircleHover, setScrollCircleHover] = useState(false);

  return (
    <View track={pastFacilitatorsView} index={1}>
      <CameraRig SPLASH_OFFSET={[0, 0, 4]} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <GradientTexture
        attach="background"
        stops={[0, 0.5, 1]}
        colors={["#faf7f9", "#f3c0da", "#faf7f9"]}
        size={10}
        type={GradientType.Radial}
      />
      <ambientLight intensity={1} />
      <Environment files="rainforest_trail_1k.hdr" />
      {/* <Image url={melchan} transparent position={[0, 0, 0.3]} /> */}
      <Tatoe imgUrl={melchan} position={[0, 0, 0.3]} scale={0.3} />
      <Circle
        scale={2.5}
        args={[1, 100, 100]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setScrollCircleHover(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setScrollCircleHover(false);
        }}
      >
        <meshBasicMaterial
          opacity={0.5}
          color={scrollCircleHover ? "#ee9b81" : "#e9a590"}
          transparent
        />
      </Circle>
    </View>
  );
});

const Tatoe = (props) => {
  const { imgUrl, position, scale } = props;
  //   return <Image url={imgUrl} transparent position={position}></Image>;
  const texture = useLoader(TextureLoader, imgUrl);
  return (
    <mesh position={position} scale={scale}>
      <circleGeometry attach={"geometry"} />
      <meshBasicMaterial attach={"material"} transparent map={texture} />
    </mesh>
  );
};

export default AboutCanvas;
