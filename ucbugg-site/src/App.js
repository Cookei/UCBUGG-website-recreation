import { useRef } from "react";
//Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Syllabus from "./pages/Syllabus";
import Labs from "./pages/Labs";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
//3D Stuff
import { Canvas } from "@react-three/fiber";
import {
  View,
  Preload,
  GradientTexture,
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import SplashModel from "./models/SplashModel";
//CSS
import styles from "./styles/App.module.css";
import HelperGrid from "./models/HelperGrid";
import CameraRig from "./components/CameraRig";

function App() {
  const ref = useRef();
  const splashView = useRef();

  return (
    <div>
      <BrowserRouter>
        <div ref={ref}>
          <Navbar />
          <Routes>
            <Route
              index
              element={
                <>
                  <Home ref={splashView} />
                  <Canvas eventSource={ref} className={styles.splashCanvas}>
                    {/* --------------Home Page-------------- */}
                    <View track={splashView}>
                      <PerspectiveCamera
                        makeDefault
                        position={[3.5, 1.5, 4.5]}
                      ></PerspectiveCamera>
                      <CameraRig SPLASH_OFFSET={[3.5, 1.5, 4.5]} />
                      <GradientTexture
                        attach="background"
                        stops={[0, 1]} // As many stops as you want
                        colors={["#faf7f9", "#e1f0f5"]} // Colors need to match the number of stops
                        size={1024} // Size is optional, default = 1024
                      />
                      <ambientLight intensity={1} />
                      <Environment files="rainforest_trail_1k.hdr" />
                      <HelperGrid />
                      <SplashModel />
                      <OrbitControls makeDefault enabled={false} />
                    </View>
                    <Preload all />
                  </Canvas>
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
