// URL da API
const apiUrl = 'https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%20%3D%3D%20%22secaoProdutosMaisVendidos%22%5D%7B%0A%20%20titulo%2C%0A%20%20tituloimg1%2C%0A%20%20imagem1%7B%0A%20%20%20%20asset-%3E%7B%0A%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20tituloimg2%2C%0A%20%20imagem2%7B%0A%20%20%20%20asset-%3E%7B%0A%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20tituloimg3%2C%0A%20%20imagem3%7B%0A%20%20%20%20asset-%3E%7B%0A%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20tituloimg4%2C%0A%20%20imagem4%7B%0A%20%20%20%20asset-%3E%7B%0A%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D';

// Função para buscar os dados e atualizar o conteúdo do HTML
async function atualizarProdutosMaisVendidos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifica se os dados foram retornados corretamente
        if (data.result && data.result.length > 0) {
            const sectionData = data.result[0];  // Aqui, pegamos o primeiro (e provavelmente único) item da lista

            // Atualiza o título da seção
            const tituloElement = document.querySelector('.title');
            if (tituloElement) {
                tituloElement.textContent = sectionData.titulo || 'Mais Vendidos';
            }

            // Atualiza os títulos das imagens
            const titulosImagens = [
                sectionData.tituloimg1,
                sectionData.tituloimg2,
                sectionData.tituloimg3,
                sectionData.tituloimg4
            ];

            titulosImagens.forEach((titulo, index) => {
                const tituloImgElement = document.querySelectorAll('.col-4 h4')[index];
                if (tituloImgElement) {
                    tituloImgElement.textContent = titulo || 'Produto sem título';
                }
            });

            // Atualiza as imagens
            const imagens = [
                sectionData.imagem1?.asset?.url,
                sectionData.imagem2?.asset?.url,
                sectionData.imagem3?.asset?.url,
                sectionData.imagem4?.asset?.url
            ];

            const imageElements = document.querySelectorAll('.col-4 img');
            imageElements.forEach((img, index) => {
                if (imagens[index]) {
                    img.src = imagens[index];  // A URL da imagem será configurada aqui
                }
            });
        } else {
            console.error('Nenhum dado encontrado na resposta da API.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Chama a função para buscar e atualizar o conteúdo
atualizarProdutosMaisVendidos();
