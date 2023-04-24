const { model, Schema } = require("mongoose");

// titulo, descrição, status (finalizada/pendente)
const Tarefa = model(
    "tarefa", // nome do modelo (base para coleção)
new Schema({ // validação do documento
        titulo: {
            type: String, // string, number, booblean
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pendente",
        }
}
));

module.exports = Tarefa;

