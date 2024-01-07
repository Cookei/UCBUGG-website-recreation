import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Syllabus from './pages/Syllabus';
import Labs from "./pages/Labs";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/syllabus" element={<Syllabus/>}/>
          <Route path="/labs" element={<Labs/>}/>
          <Route path="/projects" element={<Projects/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;