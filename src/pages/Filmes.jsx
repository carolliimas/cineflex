// src/pages/Filmes.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Filmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
    axios.get(URL)
      .then(res => setFilmes(res.data))
      .catch(err => console.log("Erro ao buscar filmes:", err.response.data));
  }, []);

  return (
    <Container>
      <Titulo>Em Cartaz</Titulo>

      <ListaFilmes>
        {filmes.map(filme => (
          <Link key={filme.id} to={`/sessoes/${filme.id}`}>
            <Cartaz data-identifier="movie-outdoor">
              <img src={filme.posterURL} alt={filme.title} />
            </Cartaz>
          </Link>
        ))}
      </ListaFilmes>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 70px;
  background-color: #1b1b1b;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h2`
  font-size: 24px;
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;

const ListaFilmes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-bottom: 100px;
`;

const Cartaz = styled.div`
  width: 145px;
  height: 209px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 10px;    
  overflow: hidden;       
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
