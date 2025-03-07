import React, { useState, useEffect } from 'react';
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

const MovimentacaoForm = () => {
  const [armeiro, setArmeiro] = useState('');
  const [matriculaArmeiro, setMatriculaArmeiro] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('emprestimo');
  const [armaId, setArmaId] = useState('');
  const [quantidadeBalas, setQuantidadeBalas] = useState('');
  const [calibre, setCalibre] = useState('');
  const [quantidadeCarregadores, setQuantidadeCarregadores] = useState('');
  const [guardaId, setGuardaId] = useState('');
  const [porteGuarda, setPorteGuarda] = useState('');
  const [matriculaGuarda, setMatriculaGuarda] = useState('');
  const [justificativa, setJustificativa] = useState('');

  const [armas, setArmas] = useState([]);
  const [guardas, setGuardas] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [armasRes, guardasRes] = await Promise.all([
          api.get('/armas'),
          api.get('/guardas')
        ]);
        setArmas(armasRes.data);
        setGuardas(guardasRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados para movimentação:", error);
      }
    };
    fetchDados();
  }, []);

  // Ao selecionar um guarda, preenche automaticamente os campos de porte e matrícula
  const handleGuardaChange = (e) => {
    const selectedGuardId = e.target.value;
    setGuardaId(selectedGuardId);
    const selectedGuard = guardas.find(guard => guard.id.toString() === selectedGuardId);
    if (selectedGuard) {
      setPorteGuarda(selectedGuard.numeracao_porte);
      setMatriculaGuarda(selectedGuard.matricula);
    } else {
      setPorteGuarda('');
      setMatriculaGuarda('');
    }
    console.log("Guarda selecionado:", selectedGuard);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit foi chamado. Dados do formulário:", {
      armeiro,
      matriculaArmeiro,
      data,
      hora,
      tipo,
      armaId,
      quantidadeBalas,
      calibre,
      quantidadeCarregadores,
      guardaId,
      porteGuarda,
      matriculaGuarda,
      justificativa
    });
    try {
      const response = await api.post('/movimentacoes', {
        movimentacao: {
          armeiro,
          matricula_armeiro: matriculaArmeiro,
          data,
          hora,
          tipo,
          arma_id: armaId,
          quantidade_balas: quantidadeBalas,
          calibre,
          quantidade_carregadores: quantidadeCarregadores,
          guarda_id: guardaId,
          porte_guarda: porteGuarda,
          matricula_guarda: matriculaGuarda,
          justificativa: justificativa
        }
      });
      console.log("Resposta do backend:", response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Movimentação cadastrada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Opcional: limpar os campos após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar movimentação:", error);
      let errorMsg = 'Erro ao cadastrar movimentação.';
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
      <h2>Cadastrar Movimentação</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Armeiro:</label>
        <input 
          type="text"  
          style={inputStyle}
          value={armeiro} 
          onChange={(e) => setArmeiro(e.target.value)} 
          required 
        />
        
        <label style={labelStyle}>Matrícula do Armeiro:</label>
        <input 
          type="text"  
          style={inputStyle}
          value={matriculaArmeiro} 
          onChange={(e) => setMatriculaArmeiro(e.target.value)} 
          required 
        />

        <label style={labelStyle}>Data:</label>
        <input 
          type="date" 
          style={inputStyle}
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          required 
        />

        <label style={labelStyle}>Hora:</label>
        <input 
          type="time" 
          style={inputStyle}
          value={hora} 
          onChange={(e) => setHora(e.target.value)} 
          required 
        />

        <label style={labelStyle}>Tipo:</label>
        <select style={inputStyle} value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="emprestimo">Empréstimo</option>
          <option value="devolucao">Devolução</option>
        </select>

        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>Arma:</label>
          <select style={inputStyle} value={armaId} onChange={(e) => setArmaId(e.target.value)} required>
            <option value="">Selecione uma arma</option>
            {armas.map(arma => (
              <option key={arma.id} value={arma.id}>
                {arma.modelo} - Registro: {arma.registro}
              </option>
            ))}
          </select>
        </div>

        <label style={labelStyle}>Quantidade de Balas:</label>
        <input 
          type="text" 
          style={inputStyle}
          value={quantidadeBalas} 
          onChange={(e) => setQuantidadeBalas(e.target.value)} 
          required 
        />

        <label style={labelStyle}>Calibre:</label>
        <input 
          type="text"  
          style={inputStyle}
          value={calibre} 
          onChange={(e) => setCalibre(e.target.value)} 
          required 
        />

        <label style={labelStyle}>Carregadores:</label>
        <input 
          type="text" 
          style={inputStyle}
          value={quantidadeCarregadores} 
          onChange={(e) => setQuantidadeCarregadores(e.target.value)} 
          required 
        />

        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>Guarda:</label>
          <select style={inputStyle} value={guardaId} onChange={handleGuardaChange} required>
            <option value="">Selecione um guarda</option>
            {guardas.map(guarda => (
              <option key={guarda.id} value={guarda.id}>
                {guarda.nome_completo} - Matrícula: {guarda.matricula}
              </option>
            ))}
          </select>
        </div>

        {/* Exibe os dados do guarda automaticamente */}
        <div style={{ marginBottom: '10px' }}>
          <p style={labelStyle}><strong>Porte do Guarda:</strong> {porteGuarda}</p>
          <p style={labelStyle}><strong>Matrícula do Guarda:</strong> {matriculaGuarda}</p>
        </div>

        <label style={labelStyle}>Justificativa (caso haja discrepância na devolução):</label>
        <textarea 
          style={{ ...inputStyle, height: '80px' }}
          value={justificativa} 
          onChange={(e) => setJustificativa(e.target.value)} 
        />
        <button type="submit" style={buttonStyle}>Cadastrar Movimentação</button>
      </form>
    </div>
  );
};

export default MovimentacaoForm;