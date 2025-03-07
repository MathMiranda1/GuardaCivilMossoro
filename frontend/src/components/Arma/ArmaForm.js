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

const ArmaForm = () => {
  const [modelo, setModelo] = useState('');
  const [registro, setRegistro] = useState('');
  const [emprestada, setEmprestada] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ArmaForm: handleSubmit chamado. Modelo:", modelo, "Registro:", registro);
    try {
      const response = await api.post('/armas', { arma: { modelo, registro, emprestada } });
      console.log("Resposta do backend:", response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: `Arma "${response.data.modelo}" criada com sucesso!`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setModelo('');
      setRegistro('');
      setEmprestada(false);
    } catch (error) {
      console.error("Erro ao criar arma:", error);
      let errorMsg = 'Erro ao criar arma.';
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
      <h2>Cadastrar Arma</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Modelo da Arma:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Digite o modelo da arma"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />

        <label style={labelStyle}>Registro da Arma:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Digite o registro da arma"
          value={registro}
          onChange={(e) => setRegistro(e.target.value)}
          required
        />

        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={emprestada}
              onChange={(e) => setEmprestada(e.target.checked)}
              style={{ marginRight: '5px' }}
            />
            Emprestada?
          </label>
        </div>

        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
    </div>
  );
};

export default ArmaForm;

