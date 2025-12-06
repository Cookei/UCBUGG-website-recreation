//Routing
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router, Redirect, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Home from "./pages/Home";
import About from "./pages/About";
import Syllabus from "./pages/Syllabus";
import Labs from "./pages/Labs";
import Navbar from "./components/Navbar";
//3D Stuff
import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
//CSS
import styles from "./styles/App.module.css";
//MarkdownGeneration
import data from "./pages/labExport";
import LabMarkdown from "./components/LabMarkdown";
import Bladerunner from "./pages/Bladerunner";
// import AboutCanvas from "./pages/AboutCanvas";

const tempEntries = [];
function getRoute(obj) {
  Object.entries(obj).forEach((element) => {
    let [key, value] = element;
    if (value.markdown !== undefined) {
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
  return (
    <>
      <Router hook={useHashLocation}>
        <Navbar />
        <Switch>
          <Route path="/">
            <Home />
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
                <LabMarkdown path={e.path} />
              </Route>
            );
          })}
          <Route path="/about">
            <About />
          </Route>
          <Route path="/bladerunner">
            <Bladerunner />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <Canvas
          eventSource={document.getElementById("root")}
          className={styles.splashCanvas}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </Router>
    </>
  );
}

export default App;
