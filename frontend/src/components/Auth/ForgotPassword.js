import React, { useState } from 'react';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecovery = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/password_resets', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro: email não encontrado.');
    }
  };

  return (
    <div>
      <h2>Recuperação de Senha</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRecovery}>
        <input
          type="email"
          placeholder="Informe seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Instruções</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
