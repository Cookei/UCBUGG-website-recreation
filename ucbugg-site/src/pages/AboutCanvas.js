import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  View,
  GradientTexture,
  Environment,
  PerspectiveCamera,
  Circle,
  GradientType,
  Text,
} from "@react-three/drei";
import melchan from "../assets/aboutPage/melchan.png";
import CameraRig from "../components/CameraRig";
import data from "./TatoeImgImports.js";
import {
  extend,
  invalidate,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { TextureLoader, Vector2, Vector3 } from "three";
import { GlitchPass } from "three-stdlib";

const AboutCanvas = forwardRef((props, ref) => {
  const { pastFacilitatorsView } = ref;
  const [scrollPercentage, setScrollPercentage] = useState(1);
  const texture = useLoader(TextureLoader, melchan);
  const totalCircles = Math.floor(Object.keys(data.past_tatoes).length / 8);
  const maxRadius = Math.pow(2, totalCircles);
  const increment = maxRadius / 8 / 2;

  useEffect(() => {
    console.log(scrollPercentage);
  }, [scrollPercentage]);

  extend({ GlitchPass });

  return (
    <View track={pastFacilitatorsView} index={1}>
      <GradientTexture
        attach="background"
        stops={[0, 0.5, 1]}
        colors={["#faf7f9", "#f3c0da", "#faf7f9"]}
        size={10}
        type={GradientType.Radial}
      />
      <ambientLight intensity={1} />
      <Environment files="rainforest_trail_1k.hdr" />
      <mesh position={[0, 0, 0.3]} scale={0.3}>
        <circleGeometry attach={"geometry"} />
        <meshBasicMaterial attach={"material"} transparent map={texture} />
      </mesh>
      {data.past_tatoes.map((e, i) => {
        const numElem = 8;
        const circleNum = Math.floor(i / numElem);
        const circleIndex = i % 8;
        const radius = 2 * circleNum + 1;
        const rotate = circleNum % 2 == 1 ? 0.5 : 0;
        const xPos =
          radius *
          Math.cos(
            ((360 / numElem) * (circleIndex + 1 + rotate) * Math.PI) / 180
          );
        const yPos =
          radius *
          Math.sin(
            ((360 / numElem) * (circleIndex + 1 + rotate) * Math.PI) / 180
          );
        const scale = 1.2 * Math.pow(1.2, circleNum / 2) - 0.8;
        return (
          <Tatoe
            imgUrl={e.img}
            position={[
              xPos * scrollPercentage,
              yPos * scrollPercentage,
              0.3 + circleNum * 0.2 * scrollPercentage,
            ]}
            initalPos={[xPos, yPos, 0.3 + circleNum * 0.2]}
            scale={scale * scrollPercentage}
            defaultScale={scale}
            key={"" + circleNum + circleIndex}
            name={e.name}
            scrollPercentage={scrollPercentage}
          />
        );
      })}
      <ScrollCircle
        handleScroll={(event) => {
          console.log("event.deltaY:", event.deltaY);
          const deltaY = event.deltaY / 100;
          const change = deltaY / 10;
          const lowerBound = 0.2;
          setScrollPercentage((prevVal) => {
            if (prevVal + change > 1) {
              return 1;
            } else if (prevVal + change < lowerBound) {
              return lowerBound;
            }
            return prevVal + change;
          });
        }}
        maxRadius={maxRadius}
      />
      <CameraRig SPLASH_OFFSET={[0, 0, 4]} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
    </View>
  );
});

const Tatoe = (props) => {
  const { imgUrl, position, scale, name, initalPos, defaultScale } = props;
  const texture = useLoader(TextureLoader, imgUrl);
  const meshRef = useRef();
  const vec = new Vector3(position[0], position[1], position[2]);
  const scaleVec = new Vector3(defaultScale, defaultScale, defaultScale);

  useEffect(() => {
    vec.set(position[0], position[1], position[2]);
  }, [position]);

  useEffect(() => {
    scaleVec.set(scale, scale, scale);
  }, [scale]);

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    meshRef.current.position.lerp(vec, delta * 5);
    meshRef.current.scale.lerp(scaleVec, delta * 5);
  });

  return (
    <group ref={meshRef} position={initalPos}>
      <mesh scale={defaultScale}>
        <circleGeometry attach={"geometry"} />
        <meshBasicMaterial attach={"material"} transparent map={texture} />
      </mesh>
      <Text
        color="#504d4f"
        anchorX="center"
        anchorY="top"
        position={[0, -defaultScale, 0]}
        scale={0.5 * defaultScale}
        maxWidth={defaultScale * 1.2}
      >
        {name}
      </Text>
    </group>
  );
};

const ScrollCircle = (props) => {
  const { handleScroll, maxRadius } = props;

  const [scrollCircleHover, setScrollCircleHover] = useState(false);

  const preventDefault = useCallback((event) => {
    event = event || window.event;
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.returnValue = false;
  }, []);

  useEffect(() => {
    document.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <Circle
      scale={2.5}
      args={[1, 100, 100]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setScrollCircleHover(true);
        document.addEventListener("wheel", preventDefault, { passive: false });
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setScrollCircleHover(false);
        document.removeEventListener("wheel", preventDefault, false);
      }}
    >
      <meshBasicMaterial
        opacity={0.5}
        color={scrollCircleHover ? "#ee9b81" : "#e9a590"}
        transparent
      />
    </Circle>
  );
};

const vertex = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  
  const float strength = 0.01; // Adjust the strength of the blur effect
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 diff = center - vUv;
    float distance = length(diff);
    vec2 blurAmount = diff * strength * smoothstep(0.0, 0.5, distance);
    
    vec4 textureColor = texture2D(tDiffuse, vUv + blurAmount);
    gl_FragColor = textureColor;
  }
`;

const RadialBlurEffect = () => {
  return (
    <shaderMaterial
      uniforms={{ tDiffuse: { value: null } }}
      vertexShader={vertex}
      fragmentShader={fragment}
    />
  );
};

export default AboutCanvas;
