import { useRef, useState, useEffect } from "react";
//Routing
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, Route } from "wouter";
import Home from "./pages/Home";
import About from "./pages/About";
import Syllabus from "./pages/Syllabus";
import Labs from "./pages/Labs";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
//3D Stuff
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
//CSS
import styles from "./styles/App.module.css";
import HomeCanvas from "./pages/HomeCanvas";
//MarkdownGeneration
import data from "./pages/labExport";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
const tempEntries = [];
function getRoute(obj) {
  Object.entries(obj).forEach((element) => {
    let [key, value] = element;
    if (value.markdown != undefined && value.images != undefined) {
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

  const [markdownReferences, setMarkdownReferences] = useState({});
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    tempEntries.forEach((e) => {
      let newObj = markdownReferences;
      fetch(e.element)
        .then((res) => res.text())
        .then((text) => {
          newObj[e.key] = text;
          setMarkdownReferences(newObj);
          setEntries(tempEntries);
        });
    });
    console.log("test");
  }, []);

  return (
    <>
      <Navbar />
      <Route path="/">
        <Home ref={splashView} />
      </Route>
      <Route path="/syllabus">
        <Syllabus />
      </Route>
      <Route path="/labs">
        <Labs />
      </Route>
      {entries.map((e) => {
        console.log("Path", e.path);
        return (
          <Route path={`/labs/${e.path}`} key={e.key}>
            <div>
              <Markdown
                remarkPlugins={[remarkGfm, remarkExtendedTable]}
                rehypePlugins={[rehypeRaw]}
                remarkRehypeOptions={{
                  handlers: { ...extendedTableHandlers },
                }}
                urlTransform={(uri) => {
                  return e.images[uri.replace(/%20/g, " ")];
                }}
              >
                {markdownReferences[e.key]}
              </Markdown>
            </div>
          </Route>
        );
      })}
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Canvas
        eventSource={document.getElementById("root")}
        className={styles.splashCanvas}
      >
        <Route path="/">
          <HomeCanvas ref={{ splashView: splashView }} />
        </Route>
        <Preload all />
      </Canvas>
    </>
  );
}

export default App;
