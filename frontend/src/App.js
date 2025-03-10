import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import CadastroForm from './components/Login/CadastroForm';
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
import PasswordResetForm from './components/Login/PasswordResetForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão: redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<CadastroForm />} />
        <Route path="/password-reset" element={<PasswordResetForm />} />
        {/* Você pode incluir uma rota para recuperação de senha, se necessário */}
        {/* Rotas protegidas */}
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
                      <li><a href="/unidades">Unidades</a></li>
                      <li><a href="/nova-unidade">Nova Unidade</a></li>
                      <li><a href="/equipes">Equipes</a></li>
                      <li><a href="/nova-equipe">Nova Equipe</a></li>
                      <li><a href="/armas">Armas</a></li>
                      <li><a href="/nova-arma">Nova Arma</a></li>
                      <li><a href="/guardas">Guardas</a></li>
                      <li><a href="/novo-guarda">Novo Guarda</a></li>
                      <li><a href="/movimentacoes">Movimentações</a></li>
                      <li><a href="/nova-movimentacao">Nova Movimentação</a></li>
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

