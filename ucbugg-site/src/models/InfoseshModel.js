import React, { Suspense, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import model from "../assets/models/interestform.glb";
import { MeshBasicMaterial } from "three";

// make an invisible rectangle  for infosession link clicking instead

const InfoseshModel = () => {
  // This is a wrapper for the actual fox model to handle all the hover and transformation logic
  const [hovered, setHovered] = useState(false);
  const TXT_OFFSET = [1, 2, -1];

  const meshRef = useRef();
  const peematerial = new MeshBasicMaterial({ color: "orange" });
  const poomaterial = new MeshBasicMaterial({ color: "red" });
  // Rotate the object continuously

  useFrame(() => {
    if (meshRef.current && !hovered) {
      if (meshRef.current.scale.y == 0.5) {
        meshRef.current.scale.y = 0.4;
        meshRef.current.position.z = -1;
        meshRef.current.material = peematerial;
      }
      meshRef.current.rotation.z += 0.025; // Rotate around the Y axis

      meshRef.current.position.y =
        0.1 * Math.sin(meshRef.current.rotation.z) + 2;
      if (document.body.style.cursor == "pointer") {
        document.body.style.cursor = "auto";
      }
    } else {
      document.body.style.cursor = "pointer";
      // meshRef.current.scale.y = 0.5;
      // meshRef.current.position.z = -0.5;
      meshRef.current.position.y =
        0.1 * Math.sin(meshRef.current.rotation.z) + 2;
      meshRef.current.rotation.z += 0.015;
      meshRef.current.material = poomaterial;
    }
  });

  function Loader() {
    return (
      <Html position={TXT_OFFSET}>
        <div>
          <p>Loading</p>
          <progress value={0.5} />
        </div>
      </Html>
    );
  }

  useGLTF.preload(model);
  const { nodes } = useGLTF(model);
  const material = peematerial;
  return (
    <Suspense fallback={<Loader />}>
      <mesh
        ref={meshRef}
        geometry={nodes.text.geometry}
        material={material}
        position={TXT_OFFSET} // X, Y, Z position in world space
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.4}
      />

      <mesh
        position={TXT_OFFSET}
        rotation={[Math.PI / 2, 0, 0]} // Mouse hover and unhover
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
        onClick={() => {
          window.open("https://forms.gle/uPkium81Ewg4w5ni7", "_blank"); // Redirect to the specified URL
        }}
      >
        <boxGeometry args={[2, 0.5, 0.75]} />
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
    </Suspense>
  );
};

export default InfoseshModel;

useGLTF.preload(model);
