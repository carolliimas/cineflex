// src/pages/Assentos.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Assentos() {
  const { idSessao } = useParams();
  const navigate = useNavigate();

  const [sessao, setSessao] = useState(null);
  const [selecionados, setSelecionados] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    axios.get(URL)
      .then(res => setSessao(res.data))
      .catch(err => console.log("Erro ao buscar assentos:", err.response.data));
  }, [idSessao]);

  if (!sessao) return <p>Carregando...</p>;

  function toggleAssento(assento) {
    if (!assento.isAvailable) {
      alert("Esse assento não está disponível!");
      return;
    }
    if (selecionados.includes(assento.id)) {
      setSelecionados(selecionados.filter(id => id !== assento.id));
    } else {
      setSelecionados([...selecionados, assento.id]);
    }
  }

  function reservarAssentos(e) {
    e.preventDefault();

    const dadosReserva = {
      ids: selecionados,
      name: nome,
      cpf: cpf
    };

    const nomesAssentos = selecionados.map(id => {
      const cadeira = sessao.seats.find(s => s.id === id);
      return cadeira ? cadeira.name : id;
    });

    axios.post(
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
      dadosReserva
    )
      .then(() => {
        navigate("/sucesso", {
          state: {
            filme: sessao.movie.title,
            data: sessao.day.date,
            horario: sessao.name,
            assentos: nomesAssentos,
            nome,
            cpf
          }
        });
      })
      .catch(err => console.log("Erro ao reservar:", err.response.data));
  }

  return (
    <Container>
      <Titulo>Selecione o(s) assento(s)</Titulo>

      <AssentosGrid>
        {sessao.seats.map(assento => (
          <Assento
            key={assento.id}
            disponivel={assento.isAvailable}
            selecionado={selecionados.includes(assento.id)}
            onClick={() => toggleAssento(assento)}
            data-identifier="seat"
          >
            {assento.name}
          </Assento>
        ))}
      </AssentosGrid>

      <Formulario onSubmit={reservarAssentos}>
        <label htmlFor="nome">Nome do comprador(a):</label>
        <input
          id="nome"
          type="text"
          placeholder="Digite seu nome..."
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          data-identifier="buyer-name-input"
        />

        <label htmlFor="cpf">CPF do comprador(a):</label>
        <input
          id="cpf"
          type="text"
          placeholder="Digite seu CPF..."
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
          data-identifier="buyer-cpf-input"
        />

        <button type="submit" data-identifier="reservation-btn">
          Reservar assento(s)
        </button>
      </Formulario>
    </Container>
  );
}

// styled-components
const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 130px;
  padding: 0 20px;
`;

const Titulo = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 30px;
`;

const AssentosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const Assento = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 12px;
  background-color: ${props =>
    props.selecionado
      ? "#FADBC5"
      : props.disponivel
      ? "#9DB899"
      : "#2B2D36"};
  border: ${props =>
    props.selecionado
      ? "2px solid #EE897F"
      : "1px solid #2B2D36"};
  color: #2B2D36;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  cursor: pointer;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;

  label {
    font-size: 18px;
    color: #FFFFFF;
  }

  input {
    height: 40px;
    padding: 8px;
    font-size: 16px;
  }

  button {
    margin-top: 20px;
    height: 42px;
    background-color: #ee897f;
    color: #2B2D36;
    font-size: 18px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;


