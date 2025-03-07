import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const containerStyle = {
  maxWidth: '500px',
  margin: '50px auto',
  padding: '25px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  padding: '8px 16px',
  marginTop: '10px',
  marginRight: '10px',
  cursor: 'pointer',
};

const ArmaList = () => {
  const [armas, setArmas] = useState([]);
  
  // Para mensagens, usamos os modais do SweetAlert2, então não precisamos renderizá-las inline.

  const fetchArmas = async () => {
    try {
      console.log("Buscando armas...");
      const response = await api.get('/armas');
      setArmas(response.data);
      console.log("Armas obtidas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar armas:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar armas.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    fetchArmas();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deletando arma com id:", id);
    try {
      await api.delete(`/armas/${id}`);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Arma removida com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchArmas();
    } catch (error) {
      console.error("Erro ao remover arma:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao remover arma.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdate = async (id, currentModelo, currentRegistro) => {
    // Atualiza o modelo
    const novoModelo = window.prompt("Digite o novo modelo para a arma:", currentModelo);
    if (!novoModelo || novoModelo.trim() === '') return;

    // Atualiza o registro
    const novoRegistro = window.prompt("Digite o novo registro para a arma:", currentRegistro);
    if (!novoRegistro || novoRegistro.trim() === '') return;

    // Modal para perguntar se a arma está emprestada (botões "Sim"/"Não")
    const result = await MySwal.fire({
      title: 'A arma está emprestada?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });

    const emprestadaConfirm = result.isConfirmed;

    try {
      await api.put(`/armas/${id}`, { arma: { modelo: novoModelo, registro: novoRegistro, emprestada: emprestadaConfirm } });
      Swal.fire({
        title: 'Sucesso!',
        text: 'Arma atualizada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchArmas();
    } catch (error) {
      console.error("Erro ao atualizar arma:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao atualizar arma.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Armas</h2>
      <ul style={{ listStyle: 'none', padding: 10 }}>
        {armas.map(arma => (
          <li key={arma.id} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <strong>{arma.modelo}</strong> - Registro: {arma.registro} - Emprestada: {arma.emprestada ? "Sim" : "Não"}
            <button 
              style={buttonStyle}
              onClick={() => handleUpdate(arma.id, arma.modelo, arma.registro)}
            >
              Atualizar
            </button>
            <button 
              style={buttonStyle}
              onClick={() => handleDelete(arma.id)}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArmaList;




