const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./db');
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET todos os ramais
app.get('/api/ramais', (req, res) => {
  connection.query('SELECT * FROM ramais', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST novo ramal
app.post('/api/ramais', (req, res) => {
  const { nome, setor, email, ramal } = req.body;
  const sql = 'INSERT INTO ramais (nome, setor, email, ramal) VALUES (?, ?, ?, ?)';
  connection.query(sql, [nome, setor, email, ramal], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, nome, setor, email, ramal });
  });
});

// PUT atualizar ramal
app.put('/api/ramais/:email', (req, res) => {
  const { email } = req.params;
  const { nome, setor, ramal } = req.body;
  const sql = 'UPDATE ramais SET nome = ?, setor = ?, ramal = ? WHERE email = ?';
  connection.query(sql, [nome, setor, ramal, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ nome, setor, email, ramal });
  });
});

// DELETE remover ramal
app.delete('/api/ramais/:email', (req, res) => {
  const { email } = req.params;
  connection.query('DELETE FROM ramais WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
