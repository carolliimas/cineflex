// src/pages/Sucesso.jsx

import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Sucesso() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { filme, data, horario, assentos, nome, cpf } = state || {};

  if (!filme) return <p>Reserva não encontrada. 😢</p>;

  return (
    <Container>
      <Titulo>Pedido finalizado!</Titulo>

      <InfoBox>
        <Section>
          <h2>Filme e sessão</h2>
          <p>{filme}</p>
          <p>
            {data} às {horario}
          </p>
        </Section>

        <Section>
          <h2>Ingressos</h2>
          {assentos.map(num => (
            <p key={num}>Assento {num}</p>
          ))}
        </Section>

        <Section>
          <h2>Comprador(a)</h2>
          <p>Nome: {nome}</p>
          <p>CPF: {cpf}</p>
        </Section>
      </InfoBox>

      <VoltarBtn
        onClick={() => navigate("/")}
        data-identifier="back-to-home-btn"
      >
        Voltar para tela inicial
      </VoltarBtn>
    </Container>
  );
}

// styled-components

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 130px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #9db899;
  margin-bottom: 30px;
`;

const InfoBox = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    color: #ee897f;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #5c5c5c;
  }

  p {
    font-size: 18px;
    color: #ffffff;
    margin: 4px 0;
  }
`;

const VoltarBtn = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 12px 0;
  background-color: #ee897f;
  color:  #2B2D36;
  font-size: 18px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
