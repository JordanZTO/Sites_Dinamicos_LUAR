const apiUrl = 'https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22menuProduto%22%5D%7B%0A++nomeProduto%2C%0A++%22imagemProduto%22%3A+imagemProduto.asset-%3Eurl%2C%0A++descricaoProduto%0A%7D&perspective=published';

async function fetchProductData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result && data.result.length > 0) {
            const produto = data.result[0];

            document.getElementById('produto-nome').textContent = produto.nomeProduto;
            document.getElementById('produto-descricao').textContent = produto.descricaoProduto;
            document.getElementById('produto-imagem').src = produto.imagemProduto;
        } else {
            console.error('Nenhum produto encontrado na resposta da API.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

fetchProductData();