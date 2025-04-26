// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Filmes from './pages/Filmes';
import Sessions from './pages/Sessions';
import Assentos from './pages/Assentos';
import Sucesso from './pages/Sucesso';

export default function App() {
  return (
    <BrowserRouter>
      <Topo>
  <img src="/icone-cineflex.png" alt="Ícone Cineflex" />
  Cineflex
</Topo>

      <Routes>
        <Route path="/" element={<Filmes />} />
        <Route path="/sessoes/:idFilme" element={<Sessions />} />
        <Route path="/assentos/:idSessao" element={<Assentos />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  );
}

const Topo = styled.div`
  width: 100%;
  height: 70px;
  background-color: #ee897f; 
  color: #FADBC5;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  position: fixed;
  top: 0;
  z-index: 1;
  
  img {
    width: 60px;
    margin-right: 10px;
  }
`;





