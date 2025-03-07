import React, { useState } from 'react';
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

const UnidadeForm = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("UnidadeForm: handleSubmit chamado. Nome:", nome);
    try {
      const response = await api.post('/unidades', { unidade: { nome } });
      console.log("Resposta do backend:", response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: `Unidade "${response.data.nome}" criada com sucesso!`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setNome('');
    } catch (error) {
      console.error("Erro ao criar unidade:", error);
      let errorMsg = 'Erro ao criar unidade.';
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cadastrar Unidade</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Nome da Unidade:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Digite o nome da unidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
    </div>
  );
};

export default UnidadeForm;