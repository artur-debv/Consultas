import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Saldo from "./pages/Saldo";
import Movimentos from "./pages/Movimentos";
import OrganizacoesLista from "./pages/OrganizacoesLista";
import OrganizacoesForm from "./pages/OrganizacoesForm";
import ProdutoresLista from "./pages/ProdutoresLista";
import ProdutoresForm from "./pages/ProdutoresForm";
import ProdutosLista from "./pages/ProdutosLista";
import ProdutosForm from "./pages/ProdutosForm";
import Login from "./pages/Login";
import Configuracao from "./pages/Configuracao";
import Dashboard from "./pages/Dashboard";
import InscricoesLista from "./pages/InscricoesLista";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saldo" element={<Saldo />} />
        <Route path="/movimentos" element={<Movimentos />} />
        <Route path="/organizacoes" element={<OrganizacoesLista />} />
        <Route path="/organizacoes/nova-organizacao" element={<OrganizacoesForm />} />        
        <Route path="/produtores" element={<ProdutoresLista />} />
        <Route path="/produtores/novo-produtor" element={<ProdutoresForm />} />
        <Route path="/inscricoes" element={<InscricoesLista />} />
        <Route path="/produtos" element={<ProdutosLista />} />
        <Route path="/produtos/novo-produto" element={<ProdutosForm />} />
        <Route path="/configuracoes" element={<Configuracao />} />
      </Routes>
    </Router>
  );
}
