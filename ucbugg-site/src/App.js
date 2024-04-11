import { useRef, useState, useEffect } from "react";
//Routing
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, Redirect, Route, Switch, useLocation, useRoute } from "wouter";
import Home from "./pages/Home";
import About from "./pages/About";
import Syllabus from "./pages/Syllabus";
import Labs from "./pages/Labs";
import Navbar from "./components/Navbar";
//3D Stuff
import { Canvas, extend, invalidate } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import HomeCanvas from "./pages/HomeCanvas";
//CSS
import styles from "./styles/App.module.css";
//MarkdownGeneration
import data from "./pages/labExport";
import LabMarkdown from "./components/LabMarkdown";
import AboutCanvas from "./pages/AboutCanvas";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

const tempEntries = [];
function getRoute(obj) {
  Object.entries(obj).forEach((element) => {
    let [key, value] = element;
    if (value.markdown != undefined) {
      tempEntries.push({
        path: value.markdown[1].toLowerCase(),
        element: value.markdown[0],
        images: value.images,
        key: tempEntries.length,
      });
    } else {
      getRoute(value);
    }
  });
}

getRoute(data);

function App() {
  const splashView = useRef();
  const storyboardingRef = useRef();
  const modelingRef = useRef();
  const shadingRef = useRef();
  const riggingRef = useRef();
  const animatingRef = useRef();
  const compositingRef = useRef();

  const timelineRefs = {
    storyboardingRef: storyboardingRef,
    modelingRef: modelingRef,
    shadingRef: shadingRef,
    riggingRef: riggingRef,
    animatingRef: animatingRef,
    compositingRef: compositingRef,
  };

  const pastFacilitatorsView = useRef();

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/">
          <Home ref={{ splashView: splashView, timelineRefs: timelineRefs }} />
        </Route>
        <Route path="/syllabus">
          <Syllabus />
        </Route>
        <Route path="/labs">
          <Labs />
        </Route>
        {tempEntries.map((e) => {
          return (
            <Route path={`/labs/${e.path}`} key={e.key}>
              {/* <LabMarkdown e={e} markdownReferences={markdownReferences} /> */}
              <LabMarkdown path={e.path} />
            </Route>
          );
        })}
        <Route path="/about">
          <About ref={{ pastFacilitatorsView: pastFacilitatorsView }} />
        </Route>
      </Switch>

      <Canvas
        eventSource={document.getElementById("root")}
        className={styles.splashCanvas}
      >
        <Route path="/">
          <HomeCanvas
            ref={{ splashView: splashView, timelineRefs: timelineRefs }}
          />
        </Route>
        {/* <Route path="/about">
          <AboutCanvas ref={{ pastFacilitatorsView: pastFacilitatorsView }} />
        </Route> */}
        <Preload all />
      </Canvas>
    </>
  );
}

export default App;
