require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");



// configuração do App:
const app = express();
app.use(express.json());



// configuração do banco:
mongoose.connect(process.env.MONGODB_URL);
const Tarefa = require("./models/tarefa");






// rotas
const tarefasRoutes = require("./routes/tarefas");
app.use(tarefasRoutes);

// escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
