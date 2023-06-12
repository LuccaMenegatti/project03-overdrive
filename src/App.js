
//dependencias
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components/Navbar/Navbar';

//pages
import People from './pages/People/People';
import Company from './pages/Company/Company';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
            <Routes>
                <Route path="/people" element={<People />}/>
                <Route path="/company" element={<Company />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
