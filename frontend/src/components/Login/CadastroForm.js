import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const containerStyle = {
  maxWidth: '400px',
  margin: '80px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  backgroundColor: '#fff'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px'
};

const inputStyle = {
  padding: '10px',
  marginBottom: '15px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#343a40',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '10px'
};

const linkStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '10px',
  textDecoration: 'none',
  color: '#343a40'
};

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia apenas nome e e-mail; o backend irá gerar a senha provisória
      const response = await api.post('/users', { user: { name: nome, email } });
      Swal.fire({
        title: 'Sucesso!',
        text: `Usuário "${response.data.user.name}" cadastrado com sucesso. Verifique seu e-mail para a senha provisória.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/login');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      let errorMsg = 'Erro ao cadastrar usuário.';
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
      <div style={headerStyle}>
        <h2>Cadastrar Usuário</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Nome:</label>
        <input 
          type="text" 
          placeholder="Digite seu nome" 
          style={inputStyle}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />
        <label style={labelStyle}>E-mail:</label>
        <input 
          type="email" 
          placeholder="Digite seu e-mail" 
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
      <Link to="/login" style={linkStyle}>Já possui uma conta? Faça login</Link>
    </div>
  );
};

export default CadastroForm;