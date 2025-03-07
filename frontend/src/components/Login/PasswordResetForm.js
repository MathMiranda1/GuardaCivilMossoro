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

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#343a40',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const linkStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '10px',
  textDecoration: 'none',
  color: '#343a40'
};

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("PasswordResetForm: handleSubmit chamado. E-mail:", email);
    try {
      const response = await api.post('/password_resets', { email });
      console.log("Resposta do backend:", response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: response.data.message || `Instruções de redefinição de senha enviadas para ${email}.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Opcional: redirecionar para a página de login após o envio
      navigate('/login');
      setEmail('');
    } catch (error) {
      console.error("Erro ao enviar e-mail de recuperação:", error);
      let errorMsg = 'Erro ao enviar e-mail de recuperação.';
      if (error.response && error.response.data && error.response.data.error) {
        errorMsg += ' ' + error.response.data.error;
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
        <h2>Recuperação de Senha</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-mail:</label>
        <input 
          type="email" 
          placeholder="Digite seu e-mail" 
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit" style={buttonStyle}>Enviar Instruções</button>
      </form>
      <Link to="/login" style={linkStyle}>Voltar para Login</Link>
    </div>
  );
};

export default PasswordResetForm;
