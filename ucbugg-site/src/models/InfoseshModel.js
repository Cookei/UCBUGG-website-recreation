import React, { Suspense, useRef, useState} from "react";
import {
  Html,
  useGLTF,
  Wireframe,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import model from "../assets/models/interestform.glb";
import { MeshBasicMaterial } from "three";

const InfoseshModel = () => {
  // This is a wrapper for the actual fox model to handle all the hover and transformation logic
  const [hovered, setHovered] = useState(false);
  const scene = useThree((state) => state.scene);
  const viewport = useThree((state) => state.viewport);
  const TXT_OFFSET = [1, 2, -1];

  const meshRef = useRef();
  const peematerial = new MeshBasicMaterial({ color: "orange" });
  const poomaterial = new MeshBasicMaterial({ color: "red" });
   // Rotate the object continuously

   useFrame(() => {
    if (meshRef.current && !hovered) {
      if (meshRef.current.scale.y == 0.5) {
        meshRef.current.scale.y = 0.4
        meshRef.current.position.z = -1
        meshRef.current.material = peematerial;
      }
      meshRef.current.rotation.z += 0.01; // Rotate around the Y axis

      meshRef.current.position.y = 0.1*Math.sin(meshRef.current.rotation.z)+ 2
    } else {
      meshRef.current.scale.y = 0.5
      meshRef.current.position.z = -0.5
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
  const material = peematerial
  return (
    <Suspense fallback={<Loader />}>
     
      <mesh 
      ref={meshRef}
        geometry={nodes.text.geometry} 
        material={material}
        position={TXT_OFFSET}       // X, Y, Z position in world space
        rotation={[Math.PI / 2, 0, 0]}
        scale = {0.4}
        // Mouse hover and unhover
        onPointerOver={() => {
          setHovered(true)
        }}
        onPointerOut={() => {
          setHovered(false)
        }}
        onClick={() => {
          window.location.href = 'https://forms.gle/uPkium81Ewg4w5ni7'; // Redirect to the specified URL
        }}
    >
    
    </mesh>
      
    </Suspense>
  );
};

export default InfoseshModel;

// // The actual fox model
// export function Model({ fillMix, strokeOpacity, ...props }) {
//   const { nodes, materials } = useGLTF(model);
//   return (
//     <group {...props} dispose={null}>
//       <group rotation={[Math.PI / 2, 0, 0]}>
//         <mesh
//           geometry={nodes.splashModel_1.geometry}
//           material={materials.standardSurface2SG}
//         >
//           <Wireframe
//             stroke={0x50f250}
//             backfaceStroke={0x50f250}
//             fillMix={fillMix} //determine the interior color of the wireframe. 0 means there is no wireframe
//             strokeOpacity={strokeOpacity}
//           />
//         </mesh>
//         <mesh
//           geometry={nodes.splashModel_2.geometry}
//           material={materials.standardSurface3SG}
//         >
//           <Wireframe
//             stroke={0x50f250}
//             backfaceStroke={0x50f250}
//             fillMix={fillMix}
//             strokeOpacity={strokeOpacity}
//           />
//         </mesh>
//         <mesh
//           geometry={nodes.splashModel_3.geometry}
//           material={materials.standardSurface5SG}
//         >
//           <Wireframe
//             stroke={0x50f250}
//             backfaceStroke={0x50f250}
//             fillMix={fillMix}
//             strokeOpacity={strokeOpacity}
//           />
//         </mesh>
//         <mesh
//           geometry={nodes.splashModel_4.geometry}
//           material={materials.standardSurface4SG}
//         >
//           <Wireframe
//             stroke={0x50f250}
//             backfaceStroke={0x50f250}
//             fillMix={fillMix}
//             strokeOpacity={strokeOpacity}
//           />
//         </mesh>
//       </group>
//     </group>
//   );
// }

useGLTF.preload(model);
