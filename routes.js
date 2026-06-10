const { getProdutos, createProduto, updateProduto, deleteProduto } = require('./controllers/produtosController'); //CRUD

function handlerequest(req, res){
    res.setHeader('Content-Type', 'Application/json');
    const routeKey = '${req.method}  ${req.url}';
        switch (true){
            //CRUD
            case routeKey === 'GET /api/produtos':
                getProdutos(req, res); //listar produtos - método GET
                break;

            case routeKey === 'POST /api/produtos':
                createProduto(req, res); //Criar produto - Método POST
                break;
            
            case req.url.startsWith('/api/produtos/') && req.method === 'DELETE':
                deleteProduto(req, res); //Deletar produto - Método DELETE
                break;
            
            case req.url.startsWith('/api/produtos/') && req.method === 'PUT':
                updateProduto(req, res); //Atualizar produto - Método PUT
                break;
            
            default:
                res.statusCode = 404;
                res.end(JSON.stringify({message: 'Rota não encontrada'})); //404 para rotas não encontradas
                break;
        }
}

module.exports = { handleRequest };