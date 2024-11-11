// URL da API
const apiUrl = 'https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%20%3D%3D%20%22secaoProdutosPremium%22%5D%20%7B%0A%20%20titulo%2C%0A%20%20subtitulo%2C%0A%20%20%22produto1Url%22%3A%20produto1.asset-%3Eurl%2C%0A%20%20%22produto2Url%22%3A%20produto2.asset-%3Eurl%2C%0A%20%20%22produto3Url%22%3A%20produto3.asset-%3Eurl%0A%7D%5B0%5D';


// Função para buscar os dados e atualizar o conteúdo do HTML
async function atualizarProdutosPremium() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifica se os dados foram retornados corretamente
        if (data.result) {
            const sectionData = data.result;

            // Atualiza o título da seção usando um seletor alternativo
            document.querySelector('h1[class*="text-[30px]"]').textContent = sectionData.titulo;

            // Atualiza o subtítulo
            document.querySelector('h1[class*="text-[gray]"]').textContent = sectionData.subtitulo;

            // Atualiza as imagens
            const images = document.querySelectorAll('.col-3 img');
            if (images.length >= 3) {
                images[0].src = sectionData.produto1Url;
                images[1].src = sectionData.produto2Url;
                images[2].src = sectionData.produto3Url;
            }

        } else {
            console.error('Nenhum dado encontrado na resposta da API.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Chama a função para buscar e atualizar o conteúdo
atualizarProdutosPremium();
