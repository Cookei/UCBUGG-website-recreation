import './App.css';
import ReactDom from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Syllabus from './pages/Syllabus';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="syllabus" element={<Syllabus/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;