//controlador para listar produtos - GET
function getProdutos(req, res){
    //dados simulados, simula acesso ao banco
    const produtos = [
        {id: 1, nome: "Produto A", preco: 50.0 },
        {id: 1, nome: "Produto A", preco: 50.0 },
    ];

    //define status de sucesso e envia a lista de produtos com JSON
    res.statusCode = 200;
    res.end(JSON.stringify(produtos));
}

//controlador para criar novo produto - POST
function createProduto(req, res){
    let body = "";

    //Chunk
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    //Processar os dados pós requisição
    req.on("end", () => {
        try{
            const novoProduto = JSON.parse(body);
            novoProduto.id = Date.now(); //gera id unico

            //define status de criação e envia produto criado
            res.statusCode = 201;
            res.end(
                JSON.stringify({message: "Produto Criado", produto: novoProduto})
            );
        } catch (error){
            //lida com erros de parsing json
            res.statusCode = 400;
            res.end(JSON.stringify({message: "Erro ao processar o produto!"}));
        }
    });
}

//controlador para atualizar o produto - PUT
function updateProduto(req, res){
    const id = req.url.split("/")[3]; //extrai o ID da URL
    let body = "";

    //recebe os dados em chunks
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    //processa dados pós recepção dos chunks
    req.on("end", () => {
        try{
            const produtoAtualizado = JSON.parse(body);
            produtoAtualizado.id = parseInt(id, 10);

            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: "Produto atualizado",
                    produto: produtoAtualizado,
                })
            );
        }catch (error) {
            //lida com erros do JSON
            res.statusCode = 400;
            res.end(JSON.stringify({messagem: "Erro ao processar o produto"}));
        }
    });
}

//controlador para deletar o produto - DELETE
function deleteProduto(req, res){
    const id = req.url.split("/")[3];
    res.statusCode = 200;
    res.end(JSON.stringify({message: "Produto com ID ${id} foi deletado"}));
}
//exportar módulos
module.exports = {
    getProdutos,
    createProduto,
    updateProduto,
    deleteProduto,
};