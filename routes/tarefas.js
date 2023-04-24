const { Router } = require("express");
const Tarefa = require("../models/tarefa");

const router = Router();

// configuração de rotas:

// inserção de tarefa (POST):
router.post("/tarefas", async (req, res) => {
    try {
      const { titulo, descricao, status } = req.body;
      // criando um novo documento do mongo
      const tarefa = new Tarefa({ titulo, descricao, status });
      // inserir o documento na coleção tarefas:
      await tarefa.save();
      res.status(201).json(tarefa);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  
  
  
  // Listagem de todas as Tarefas (GET)
  router.get("/tarefas", async (req, res) => {
    // realiza uma busca de todos os documentos na coleção:
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  });
  // ou:
  // router.get("/tarefas", async (req, res) =>{
  //     try {
  //         //realiza um busca de todos os docs
  //         const tarefas = await Tarefa.find(); //find = findAll
  //         res.json(tarefas);
  //     } catch (error) {
  //         console.log("Ocorreu um erro ", error);
  //         res.status(500).json({message: "Ocorreu um erro ", error});
  //     }
  // });
  
  
  
  // Listagem de uma Tarefa (GET)
  router.get("/tarefas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tarefaExistente = await Tarefa.findById(id); // realiza uma busca específica por um documento
      if (tarefaExistente) {
        // Responde com um documento encontrado:
        res.json(tarefaExistente); // quando res.status é 200, não precisa colocar
      } else {
        // Notifica o erro exatamente:
        res.status(404).json({ message: "Tarefa não encontrada." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  
  
  // Atualização de uma Tarefa (PUT)
  router.put("/tarefas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, status } = req.body;
      const tarefaExistente = await Tarefa.findByIdAndUpdate(id, {
        titulo,
        descricao,
        status,
      }); // caso encontre o id, realiza a tualização  // retorna o objeto encontrado
  
      if (tarefaExistente) {
        res.json({ message: "Tarefa atualizada." });
      } else {
        res.status(404).json({ message: "Tarefa não encontrada." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  
  
  // Remoção de uma Tarefa (DELETE)
  router.delete("/tarefas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // checa se a tarefa existe e remove do banco:
      const tarefaExistente = await Tarefa.findByIdAndRemove(id);
  
      const tarefasRestantes = await Tarefa.find();
  
      if (tarefaExistente) {
        res.json({ message: "Tarefa REMOVIDA.", tarefasRestantes });
      } else {
        res.status(404).json({ message: "Tarefa não encontrada." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  module.exports = router;