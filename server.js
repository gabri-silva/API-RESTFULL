const http = require("http");
const { handlerequest } = require("./routes"); //importar rotas configuradas
const PORT = 300;

const server = http.createServer((req, res) => {
    handlerequest(req, res); //redirecionar requisições para esta função
});

//servidor escutando na porta 300
server.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}');
});