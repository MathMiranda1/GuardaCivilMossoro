import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const containerStyle = {
  maxWidth: '600px',
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
  marginRight: '10px',
};

const GuardaList = () => {
  const [guardas, setGuardas] = useState([]);

  const fetchGuardas = async () => {
    try {
      console.log("Buscando guardas...");
      const response = await api.get('/guardas');
      setGuardas(response.data);
      console.log("Guardas obtidas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar guardas:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar guardas.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    fetchGuardas();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deletando guarda com id:", id);
    try {
      await api.delete(`/guardas/${id}`);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Guarda removido com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchGuardas();
    } catch (error) {
      console.error("Erro ao remover guarda:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao remover guarda.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdate = async (id, currentData) => {
    // Atualiza os campos básicos via prompt
    const novoNome = window.prompt("Digite o novo nome completo:", currentData.nome_completo);
    if (!novoNome || novoNome.trim() === '') return;

    const novaMatricula = window.prompt("Digite a nova matrícula:", currentData.matricula);
    if (!novaMatricula || novaMatricula.trim() === '') return;

    const novaNumeracaoPorte = window.prompt("Digite a nova numeração do porte:", currentData.numeracao_porte);
    if (!novaNumeracaoPorte || novaNumeracaoPorte.trim() === '') return;

    // Busca as equipes para construir as opções do modal
    let equipesOptions = {};
    try {
      const equipesRes = await api.get('/equipes');
      const equipes = equipesRes.data;
      equipes.forEach(equipe => {
        equipesOptions[equipe.id] = equipe.nome;
      });
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao buscar equipes para atualização.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Modal customizado para seleção da nova equipe
    const result = await MySwal.fire({
      title: 'Selecione a nova equipe para o guarda',
      input: 'select',
      inputOptions: equipesOptions,
      inputPlaceholder: 'Selecione uma equipe',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed || !result.value) {
      Swal.fire({
        title: 'Atenção',
        text: 'Atualização cancelada.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }

    const novaEquipeId = result.value;

    try {
      await api.put(`/guardas/${id}`, { 
        guarda: { 
          nome_completo: novoNome, 
          matricula: novaMatricula, 
          numeracao_porte: novaNumeracaoPorte, 
          equipe_id: novaEquipeId 
        } 
      });
      Swal.fire({
        title: 'Sucesso!',
        text: 'Guarda atualizado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchGuardas();
    } catch (error) {
      console.error("Erro ao atualizar guarda:", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao atualizar guarda.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Guardas</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {guardas.map(guarda => (
          <li key={guarda.id} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>{guarda.nome_completo}</strong> - Matrícula: {guarda.matricula} - Porte: {guarda.numeracao_porte} - Equipe: {guarda.equipe ? guarda.equipe.nome : "N/A"}
            </div>
            <div>
              <button style={buttonStyle} onClick={() => handleUpdate(guarda.id, guarda)}>
                Atualizar
              </button>
              <button style={buttonStyle} onClick={() => handleDelete(guarda.id)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuardaList;



