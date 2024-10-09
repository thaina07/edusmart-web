import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Inicial from './pages/Inicial';
import Profile from './pages/Profile'; 
import Aulas from './pages/Aulas';

import { useState } from 'react'; 

function App() {
  const [isLogado, setIsLogado] = useState(false);
  
  return ( 
    <div className="App">
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/cadastro' element={<Cadastro setIsLogado={setIsLogado} />} />
          <Route path='/perfil' element={<Perfil setIsLogado={setIsLogado} />} />
          <Route path='/inicial' element={<Inicial />} />
          <Route path='/Aulas' element={<Aulas />} />
          <Route path="/aulas/matematica" element={<Aulas />} />
          <Route path="/aulas/portugues" element={<Aulas />} />
          <Route path="/aulas/quimica" element={<Aulas />} />
          <Route path="/aulas/geografia" element={<Aulas />} />
          <Route path="/aulas/historia" element={<Aulas />} />
          <Route path="/aulas/ingles" element={<Aulas />} />
          <Route path="/aulas/sociologia" element={<Aulas />} />
          <Route path="/aulas/fisiologia" element={<Aulas />} />
          <Route path="/aulas/fisica" element={<Aulas />} />
          <Route path="/aulas/questoes" element={<Aulas />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
