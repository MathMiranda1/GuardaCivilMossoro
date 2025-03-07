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
  marginLeft: '10px',
  cursor: 'pointer',
};

const EquipeList = () => {
  const [equipes, setEquipes] = useState([]);

  const fetchEquipes = async () => {
    try {
      console.log("Buscando equipes...");
      const response = await api.get('/equipes');
      setEquipes(response.data);
      console.log("Equipes obtidas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar equipes.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deletando equipe com id:", id);
    try {
      await api.delete(`/equipes/${id}`);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Equipe removida com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchEquipes();
    } catch (error) {
      console.error("Erro ao remover equipe:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao remover equipe.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdate = async (id, currentNome) => {
    const { value: novoNome } = await Swal.fire({
      title: 'Atualizar Equipe',
      input: 'text',
      inputLabel: 'Digite o novo nome para a equipe:',
      inputValue: currentNome,
      showCancelButton: true,
      confirmButtonText: 'Atualizar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'O nome não pode ser vazio!';
        }
      }
    });

    if (novoNome) {
      try {
        await api.put(`/equipes/${id}`, { equipe: { nome: novoNome } });
        Swal.fire({
          title: 'Sucesso!',
          text: 'Equipe atualizada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchEquipes();
      } catch (error) {
        console.error("Erro ao atualizar equipe:", error);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar equipe.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Equipes</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {equipes.map(equipe => (
          <li key={equipe.id} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            {equipe.nome}
            <button style={buttonStyle} onClick={() => handleUpdate(equipe.id, equipe.nome)}>
              Atualizar
            </button>
            <button style={buttonStyle} onClick={() => handleDelete(equipe.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipeList;