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

const UnidadeList = () => {
  const [unidades, setUnidades] = useState([]);

  const fetchUnidades = async () => {
    try {
      console.log("Buscando unidades...");
      const response = await api.get('/unidades');
      setUnidades(response.data);
      console.log("Unidades obtidas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar unidades:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar unidades.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deletando unidade com id:", id);
    try {
      await api.delete(`/unidades/${id}`);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Unidade removida com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchUnidades();
    } catch (error) {
      console.error("Erro ao remover unidade:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao remover unidade.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdate = async (id, currentNome) => {
    const { value: novoNome } = await Swal.fire({
      title: 'Atualizar Unidade',
      input: 'text',
      inputLabel: 'Digite o novo nome para a unidade:',
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
        await api.put(`/unidades/${id}`, { unidade: { nome: novoNome } });
        Swal.fire({
          title: 'Sucesso!',
          text: 'Unidade atualizada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchUnidades();
      } catch (error) {
        console.error("Erro ao atualizar unidade:", error);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar unidade.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Lista de Unidades</h2>
      <ul style={{ listStyle: 'none', padding: 15 }}>
        {unidades.map(unidade => (
          <li key={unidade.id} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            {unidade.nome}
            <button style={buttonStyle} onClick={() => handleUpdate(unidade.id, unidade.nome)}>
              Atualizar
            </button>
            <button style={buttonStyle} onClick={() => handleDelete(unidade.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnidadeList;

