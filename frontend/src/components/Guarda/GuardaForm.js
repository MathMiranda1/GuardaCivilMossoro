import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
  width: '100%',
  maxWidth: '400px',
};

const labelStyle = {
  marginTop: '10px',
  marginBottom: '5px',
  display: 'block',
  fontWeight: 'bold',
};

const containerStyle = {
  maxWidth: '500px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  padding: '10px 20px',
  marginTop: '10px',
  cursor: 'pointer',
};

const GuardaForm = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [matricula, setMatricula] = useState('');
  const [numeracaoPorte, setNumeracaoPorte] = useState('');
  const [equipeId, setEquipeId] = useState('');
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        console.log("Buscando equipes para guarda...");
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
    fetchEquipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("GuardaForm: handleSubmit chamado. Nome:", nomeCompleto);
    try {
      const response = await api.post('/guardas', { 
        guarda: { 
          nome_completo: nomeCompleto, 
          matricula, 
          numeracao_porte: numeracaoPorte, 
          equipe_id: equipeId 
        }
      });
      Swal.fire({
        title: 'Sucesso!',
        text: `Guarda "${response.data.nome_completo}" cadastrado com sucesso!`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setNomeCompleto('');
      setMatricula('');
      setNumeracaoPorte('');
      setEquipeId('');
    } catch (error) {
      console.error("Erro ao cadastrar guarda:", error);
      let errorMsg = 'Erro ao cadastrar guarda.';
      if (error.response && error.response.data && error.response.data.errors) {
        errorMsg += ' ' + error.response.data.errors.join(', ');
      }
      Swal.fire({
        title: 'Erro!',
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cadastrar Guarda</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Nome Completo:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Digite o nome completo"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          required
        />

        <label style={labelStyle}>Matrícula:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Digite a matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />

        <label style={labelStyle}>Numeração do Porte:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Digite a numeração do porte"
          value={numeracaoPorte}
          onChange={(e) => setNumeracaoPorte(e.target.value)}
          required
        />

        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>Equipe:</label>
          <select style={inputStyle} value={equipeId} onChange={(e) => setEquipeId(e.target.value)} required>
            <option value="">Selecione uma equipe</option>
            {equipes.map((equipe) => (
              <option key={equipe.id} value={equipe.id}>
                {equipe.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
    </div>
  );
};

export default GuardaForm;
