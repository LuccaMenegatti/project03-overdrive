
//dependencias
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components/Navbar/Navbar';

//pages
import People from './pages/People/People';
import Company from './pages/Company/Company';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/Error" element={<Error />}></Route>
                <Route path="/people" element={<People />}/>
                <Route path="/company" element={<Company />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
