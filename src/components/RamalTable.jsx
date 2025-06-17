import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const API_URL = "http://localhost:3001/api/ramais";

export default function RamalTable() {
  const permissao = localStorage.getItem("permissao");
  const [ramais, setRamais] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [form, setForm] = useState({ nome: "", setor: "", email: "", ramal: "" });
  const [novoRamal, setNovoRamal] = useState({ nome: "", setor: "", email: "", ramal: "" });
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setRamais(response.data))
      .catch(error => console.error("Erro ao buscar ramais:", error));
  }, []);

  const iniciarEdicao = (email) => {
    const index = ramais.findIndex(r => r.email === email);
    if (index !== -1) {
      setEditandoIndex(index);
      setForm(ramais[index]);
    }
  };

  const salvarEdicao = () => {
    axios.put(`${API_URL}/${form.email}`, form)
      .then(() => {
        const atualizados = ramais.map(r => r.email === form.email ? form : r);
        setRamais(atualizados);
        cancelarEdicao();
      })
      .catch(error => console.error("Erro ao atualizar ramal:", error));
  };

  const excluir = (email) => {
    axios.delete(`${API_URL}/${email}`)
      .then(() => setRamais(ramais.filter(r => r.email !== email)))
      .catch(error => console.error("Erro ao excluir ramal:", error));
  };

  const adicionarRamal = () => {
    const { nome, setor, email, ramal } = novoRamal;
    if (!nome || !setor || !email || !ramal) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const emailJaExiste = ramais.some(r => r.email.toLowerCase() === email.toLocaleLowerCase());
    if(emailJaExiste){
      alert("Colaborador já cadastrado com este e-mail"); 
      fecharModal();
      return;
    }

    axios.post(API_URL, novoRamal)
      .then(response => {
        setRamais([...ramais, response.data]);
        fecharModal();
      })
      .catch(error => console.error("Erro ao adicionar ramal:", error));
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null);
    setForm({ nome: "", setor: "", email: "", ramal: "" });
  };

  const abrirModal = () => setShowModal(true);
  const fecharModal = () => {
    setNovoRamal({ nome: "", setor: "", email: "", ramal: "" });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editandoIndex !== null) {
      setForm({ ...form, [name]: value });
    } else {
      setNovoRamal({ ...novoRamal, [name]: value });
    }
  };

  const ramaisFiltrados = ramais
    .filter(({ nome, setor, ramal }) => {
      const busca = filtro.toLowerCase();
      return (
        nome.toLowerCase().includes(busca) ||
        setor.toLowerCase().includes(busca) ||
        ramal.toLowerCase().includes(busca)
      );
    })
    .sort((a, b) => a.setor.localeCompare(b.setor))
    .reduce((acc, r) => {
      acc[r.setor] = acc[r.setor] || [];
      acc[r.setor].push(r);
      return acc;
    }, {});

  return (
    <div>
      <div className="cabecalho">
        <img src={logo} alt="Logo Rede Dom Pedro" className="logo" />
      </div>

      <input
        type="text"
        placeholder="Buscar por nome, setor ou ramal..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px", marginBottom: "20px" }}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Setor</th>
            <th>Email</th>
            <th>Ramal</th>
           {permissao === "admin" && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {Object.entries(ramaisFiltrados).map(([setor, lista]) => (
            <React.Fragment key={setor}>
              <tr>
                <td colSpan="5" style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>{setor}</td>
              </tr>
              {lista.map((item) => {
                const index = ramais.findIndex(r => r.email === item.email);
                const emEdicao = editandoIndex === index;

                return (
                  <tr key={item.email}>
                    {emEdicao ? (
                      <>
                        <td><input name="nome" value={form.nome} onChange={handleChange} /></td>
                        <td><input name="setor" value={form.setor} onChange={handleChange} /></td>
                        <td><input name="email" value={form.email} onChange={handleChange} /></td>
                        <td><input name="ramal" value={form.ramal} onChange={handleChange} /></td>
                         {permissao === "admin" && (
                        <td>
                          <button onClick={salvarEdicao}>Salvar</button>
                         <button onClick={() => setEditandoIndex(null)}>Cancelar</button>
                        </td>
                          )}
                      </>
                    ) : (
                      <>
                        <td>{item.nome}</td>
                        <td>{item.setor}</td>
                        <td>{item.email}</td>
                        <td>{item.ramal}</td>
                        {permissao === "admin" && (
                        <td>
                          <button onClick={() => iniciarEdicao(item.email)}>Editar</button>
                          <button onClick={() => excluir(item.email)}>Excluir</button>
                        </td>
                        )}
                      </>
                    )}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {permissao === "admin" && (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={abrirModal}>➕ Adicionar colaborador</button>
      </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Novo Colaborador</h2>
            <input name="nome" placeholder="Nome" value={novoRamal.nome} onChange={handleChange} />
            <input name="setor" placeholder="Setor" value={novoRamal.setor} onChange={handleChange} />
            <input name="email" placeholder="Email" value={novoRamal.email} onChange={handleChange} />
            <input name="ramal" placeholder="Ramal" value={novoRamal.ramal} onChange={handleChange} />
            <div style={{ marginTop: "10px" }}>
              <button onClick={adicionarRamal}>Salvar</button>
              <button onClick={fecharModal} style={{ marginLeft: "10px" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
