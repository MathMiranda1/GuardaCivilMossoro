import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const containerStyle = {
  maxWidth: '500px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  padding: '8px 16px',
  marginTop: '10px',
  cursor: 'pointer',
};

const fieldStyle = {
  marginBottom: '8px'
};

const MovimentacaoList = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);

  const fetchMovimentacoes = async () => {
    try {
      console.log("Buscando movimentações...");
      const response = await api.get('/movimentacoes');
      setMovimentacoes(response.data);
      console.log("Movimentações obtidas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar movimentações.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deletando movimentação com ID:", id);
    try {
      await api.delete(`/movimentacoes/${id}`);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Movimentação removida com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchMovimentacoes();
    } catch (error) {
      console.error("Erro ao remover movimentação:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao remover movimentação.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Movimentações</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movimentacoes.map(mov => (
          <li key={mov.id} style={{ padding: '15px 0', borderBottom: '1px solid #ddd' }}>
            <div style={fieldStyle}><strong>Tipo:</strong> {mov.tipo}</div>
            <div style={fieldStyle}><strong>Data:</strong> {mov.data}</div>
            <div style={fieldStyle}><strong>Hora:</strong> {mov.hora}</div>
            <div style={fieldStyle}>
              <strong>Armeiro:</strong> {mov.armeiro} (Matrícula: {mov.matricula_armeiro})
            </div>
            <div style={fieldStyle}>
              <strong>Guarda:</strong> {mov.guarda ? mov.guarda.nome_completo : "N/A"} (Porte: {mov.porte_guarda}, Matrícula: {mov.matricula_guarda})
            </div>
            <div style={fieldStyle}>
              <strong>Arma:</strong> {mov.arma ? mov.arma.modelo : "N/A"} (Registro: {mov.arma ? mov.arma.registro : "N/A"})
            </div>
            <div style={fieldStyle}><strong>Balas:</strong> {mov.quantidade_balas}</div>
            <div style={fieldStyle}><strong>Calibre:</strong> {mov.calibre}</div>
            <div style={fieldStyle}><strong>Carregadores:</strong> {mov.quantidade_carregadores}</div>
            <div style={fieldStyle}><strong>Justificativa:</strong> {mov.justificativa || "Nenhuma"}</div>
            <button style={buttonStyle} onClick={() => handleDelete(mov.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovimentacaoList;


