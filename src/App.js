import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import { useState } from 'react';
import Inicial from './pages/Inicial';



function App() {
  const [isLogado, setIsLogado] = useState(true)
  return ( 
   
     <div className="App">
        <Router>
    
          <Routes>
            <Route path='/Home' element={<Home/>} />
            <Route path='/Cadastro' element={<Cadastro setIsLogado={setIsLogado}/>}/>
            <Route path='/Perfil' element={<Perfil/>}/>
            <Route path='/' element={<Inicial/>}/>
            
            
          </Routes>
        </Router>
      

    </div>
    
  );

}

export default App;

