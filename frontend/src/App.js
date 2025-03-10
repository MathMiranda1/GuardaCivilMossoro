// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import CadastroForm from './components/Login/CadastroForm';
import PasswordResetForm from './components/Login/PasswordResetForm';
import TestApi from './components/TestApi';
import UnidadeList from './components/Unidade/UnidadeList';
import UnidadeForm from './components/Unidade/UnidadeForm';
import EquipeList from './components/Equipe/EquipeList';
import EquipeForm from './components/Equipe/EquipeForm';
import ArmaList from './components/Arma/ArmaList';
import ArmaForm from './components/Arma/ArmaForm';
import GuardaList from './components/Guarda/GuardaList';
import GuardaForm from './components/Guarda/GuardaForm';
import MovimentacaoList from './components/Movimentacao/MovimentacaoList';
import MovimentacaoForm from './components/Movimentacao/MovimentacaoForm';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

// Componente de botão de logout
// Ele usa o hook useNavigate para redirecionar o usuário ao login após remover o token
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: '10px', cursor: 'pointer' }}>
      Logout
    </button>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão: redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<CadastroForm />} />
        <Route path="/password-reset" element={<PasswordResetForm />} />

        {/* Rotas protegidas: tudo que estiver em path="/*" será acessado
            somente se PrivateRoute permitir */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-container">
                <header className="app-header">
                  <h1>Sistema de Controle de Armas</h1>
                </header>
                <div className="app-body">
                  <nav className="app-nav">
                    <ul>
                      <li><Link to="/unidades">Unidades</Link></li>
                      <li><Link to="/nova-unidade">Nova Unidade</Link></li>
                      <li><Link to="/equipes">Equipes</Link></li>
                      <li><Link to="/nova-equipe">Nova Equipe</Link></li>
                      <li><Link to="/armas">Armas</Link></li>
                      <li><Link to="/nova-arma">Nova Arma</Link></li>
                      <li><Link to="/guardas">Guardas</Link></li>
                      <li><Link to="/novo-guarda">Novo Guarda</Link></li>
                      <li><Link to="/movimentacoes">Movimentações</Link></li>
                      <li><Link to="/nova-movimentacao">Nova Movimentação</Link></li>
                      {/* Botão de logout */}
                      <li><LogoutButton /></li>
                    </ul>
                  </nav>
                  <main className="app-content">
                    <Routes>
                      <Route path="/test" element={<TestApi />} />
                      <Route path="/unidades" element={<UnidadeList />} />
                      <Route path="/nova-unidade" element={<UnidadeForm />} />
                      <Route path="/equipes" element={<EquipeList />} />
                      <Route path="/nova-equipe" element={<EquipeForm />} />
                      <Route path="/armas" element={<ArmaList />} />
                      <Route path="/nova-arma" element={<ArmaForm />} />
                      <Route path="/guardas" element={<GuardaList />} />
                      <Route path="/novo-guarda" element={<GuardaForm />} />
                      <Route path="/movimentacoes" element={<MovimentacaoList />} />
                      <Route path="/nova-movimentacao" element={<MovimentacaoForm />} />
                    </Routes>
                  </main>
                </div>
                <footer className="app-footer">
                  <p>&copy; 2025 Guarda Civil Municipal de Mossoró/RN</p>
                </footer>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;