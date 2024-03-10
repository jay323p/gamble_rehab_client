import { Route, Routes } from 'react-router-dom';
import './App.css';
import Games from './pages/Games';
import Landing from './pages/Landing';
import Login from './pages/Login';
import About from './pages/About';
import Learn from './pages/Learn';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/games" element={<Games />} />
                <Route path="/about" element={<About />} />
                <Route path="/learn" element={<Learn />} />
            </Routes>
        </div>
    );
}

export default App;
