import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';

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

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Função para exibir o modal de troca de senha se for o primeiro login
  const promptChangePassword = async (userId, token) => {
    const { value: formValues } = await Swal.fire({
      title: 'Troque sua senha',
      html:
        '<input id="swal-input1" type="password" class="swal2-input" placeholder="Nova senha">' +
        '<input id="swal-input2" type="password" class="swal2-input" placeholder="Confirme a nova senha">',
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        const newPassword = document.getElementById('swal-input1').value;
        const confirmPassword = document.getElementById('swal-input2').value;
        if (!newPassword || !confirmPassword) {
          Swal.showValidationMessage('Por favor, preencha os dois campos');
        } else if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('As senhas não conferem');
        }
        return { newPassword };
      }
    });

    if (formValues) {
      try {
        // Envia a nova senha para o backend, que deve atualizar o usuário e desativar first_login
        await api.put(`/users/${userId}/update_password`, { password: formValues.newPassword });
        Swal.fire({
          title: 'Sucesso!',
          text: 'Senha atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível atualizar a senha.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LoginForm: handleSubmit chamado. E-mail:", email);
    try {
      // Ajuste conforme seu endpoint de login; espera-se que retorne { user, token }
      const response = await api.post('/login', { email, password: senha });
      console.log("Resposta do backend:", response.data);
      const { user, token } = response.data;
      localStorage.setItem('authToken', token);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/unidades');
      // Se for o primeiro login, força a troca de senha
      if (user.first_login) {
        promptChangePassword(user.id, token);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      let errorMsg = 'Erro ao realizar login.';
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
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>E-mail:</label>
        <input 
          type="email" 
          placeholder="Digite seu e-mail" 
          style={inputStyle}
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label style={labelStyle}>Senha:</label>
        <input 
          type="password" 
          placeholder="Digite sua senha" 
          style={inputStyle}
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
        <button type="submit" style={buttonStyle}>Entrar</button>
      </form>
      <Link to="/password-reset" style={linkStyle}>Esqueci minha senha</Link>
      <Link to="/cadastro" style={linkStyle}>Cadastrar novo usuário</Link>
    </div>
  );
};

export default LoginForm;