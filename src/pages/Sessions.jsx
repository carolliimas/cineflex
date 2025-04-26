// src/pages/Sessions.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Sessions() {
  const { idFilme } = useParams();
  const [sessoes, setSessoes] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

    axios.get(URL)
      .then(res => setSessoes(res.data))
      .catch(err => console.log("Erro ao buscar sessões:", err.response.data));
  }, [idFilme]);

  if (sessoes === null) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Titulo>Selecione o horário</Titulo>

      {sessoes.days.map((dia) => (
        <Dia key={dia.id} data-identifier="session-date">
          <p>{dia.weekday} , {dia.date}</p>

          <Horarios>
            {dia.showtimes.map((horario) => (
              <Link key={horario.id} to={`/assentos/${horario.id}`}>
                <BotaoHorario data-identifier="hour-minute-btn">
                  {horario.name}
                </BotaoHorario>
              </Link>
            ))}
          </Horarios>
        </Dia>
      ))}

    </Container>
  );
}

// styled-components:
const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 130px;
  padding: 0 20px;
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

const Dia = styled.div`
  width: 100%;
  background-color: #2c2c2c; 
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
    position: relative;
    padding-bottom: 10px;
  }

  p::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #5c5c5c;
  }
`;


const Horarios = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const BotaoHorario = styled.button`
  width: 83px;
  height: 43px;
  background-color: transparent;
  color:  #ee897f;
  border: 1px solid  #ee897f;
  border-radius: 3px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color:  #ee897f;
    color: white;
  }
`;