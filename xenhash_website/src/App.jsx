import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';


function App() {

  return (
    <Router>
      <div className="w-full">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />        
        </Routes>
      </div>
    </Router>
  );
}

export default App;