import React, { Suspense, useEffect, useState } from "react";
import {
  Html,
  TransformControls,
  Wireframe,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import model from "../assets/models/christmas_hat.glb";

const SplashModel = () => {
  // This is a wrapper for the actual fox model to handle all the hover and transformation logic
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [transformMode, setTransformMode] = useState("translate");
  const scene = useThree((state) => state.scene);
  const viewport = useThree((state) => state.viewport);
  const SPLASH_OFFSET = [
    -viewport.width / 5 + 1.85,
    0.9,
    viewport.width / 5 - 1,
  ];

  // Change transform mode based on w/e/r
  useEffect(() => {
    const handleButton = (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
          setTransformMode("translate");
          console.log(1);
          break;
        case "e":
          setTransformMode("rotate");
          break;
        case "r":
          setTransformMode("scale");
          break;
        default:
      }
    };
    window.addEventListener("keydown", handleButton);

    return () => {
      window.removeEventListener("keydown", handleButton);
    };
  }, []);

  function Loader() {
    const { progress, total } = useProgress();
    return (
      <Html position={SPLASH_OFFSET}>
        <div>
          <p>Loading</p>
          <progress value={0.5} />
        </div>
      </Html>
    );
  }

  useGLTF.preload(model);

  return (
    <Suspense fallback={<Loader />}>
      {hovered || selected ? (
        <TransformControls
          enabled={selected ? true : false}
          object={scene.getObjectByName("ChristmasHatMesh")}
          mode={transformMode}
        />
      ) : null}
      <mesh
        position={SPLASH_OFFSET} // initial position
        rotation={[Math.PI / 12, Math.PI / 1.5, -0]} // initial rotation
        // Mouse hover and unhover
        onPointerOver={() => {
          if (!selected) setHovered(true);
        }}
        onPointerOut={() => {
          if (!selected) setHovered(false);
        }}
        onClick={() => {
          setSelected(true);
          setHovered(false);
        }}
        onPointerMissed={() => setSelected(false)} // Mouse deselect
        name="ChristmasHatMesh"
        scale={0.55}
      >
        <Model
          fillMix={hovered ? 0.1 : 0}
          strokeOpacity={selected || hovered ? 1 : 0}
        />
      </mesh>
    </Suspense>
  );
};

export default SplashModel;

// The actual fox model
export function Model({ fillMix, strokeOpacity, ...props }) {
  const { nodes, materials } = useGLTF(model);
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.lambert1}
        >
          <Wireframe
            stroke={0x50f250}
            backfaceStroke={0x50f250}
            fillMix={fillMix}
            strokeOpacity={strokeOpacity}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials["Material.003"]}
        >
          <Wireframe
            stroke={0x50f250}
            backfaceStroke={0x50f250}
            fillMix={fillMix}
            strokeOpacity={strokeOpacity}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(model);
