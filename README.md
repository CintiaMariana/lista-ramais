# 📞 Sistema de Gerenciamento de Ramais - React.js + Node.js

Este é um projeto full-stack desenvolvido com **React.js** no frontend e **Node.js + Express** no backend, com o objetivo de cadastrar, editar, visualizar, filtrar e excluir ramais de uma empresa. 

## 🔍 Funcionalidades

- 🔒 Controle de permissões (admin vs usuário)
- 🔄 Edição e atualização de dados em tempo real
- ➕ Modal para adicionar novos colaboradores
- ❌ Exclusão com segurança de ramais
- 🔍 Filtro dinâmico por nome, setor ou número de ramal
- 🧠 Organização por setor com agrupamento automático
- 💾 Integração com API via Axios
- 🌐 Pronto para migração para banco de dados na nuvem

## 🖼️ Layout e Design

- Interface limpa e funcional
- Agrupamento visual por setor
- Botões e modais para melhor experiência do usuário

## 📁 Estrutura de Pastas (Frontend)

src/
├── components/
│ └── RamalTable.jsx
├── assets/
│ └── logo.png
├── App.js
├── index.js


## 🚀 Tecnologias Utilizadas

### Frontend:
- React.js
- Axios
- HTML5 + CSS3

### Backend:
- Node.js
- Express.js
- JSON como base de dados local (podendo ser substituído por banco na nuvem futuramente)

## 🔐 Sobre permissões
Este sistema utiliza o localStorage para identificar o tipo de usuário:

"admin": Pode adicionar, editar e excluir ramais.

"user": Acesso apenas de leitura e busca.

## 🌩️ Pronto para a nuvem!
O projeto já está estruturado para futura migração para um banco de dados remoto (MongoDB Atlas, PostgreSQL, Supabase, entre outros), bastando ajustar a API no backend.

## 🤝 Contribuição
Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias! Esse projeto está em constante evolução 💪

## 🧑‍💻 Autor
Desenvolvido com dedicação por Cintia Oliveira






