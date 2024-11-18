/*


const url = "https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%22product%22%5D"

async function carregaDados() {
    const nome = document.querySelector("#nome");
    console.log(nome);
    const detalhe = document.querySelector("#detalhe");
    console.log(detalhe);
    const valor = document.querySelector("#valor");
    console.log(valor);
    const imagem_principal = document.querySelector("#foto_principal");
    console.log(imagem_principal);
    const img_sec_1 = document.querySelector("#img_sec_1");
    console.log(img_sec_1);
    const img_sec_2 = document.querySelector("#img_sec_2");
    console.log(img_sec_2);
    const img_sec_3 = document.querySelector("#img_sec_3");
    console.log(img_sec_3);
    const img_sec_4 = document.querySelector("#img_sec_4");
    console.log(img_sec_4);

    const tipo = await fetch(url);
    const resultado = await tipo.json();
    console.log(resultado);

    console.log(resultado.result);
    
    

    console.log(resultado.result[0].title);


   nome.innerHTML = resultado.result[0].title;
   detalhe.innerHTML = resultado.result[0].description;
   valor.innerHTML = resultado.result[0].price;
   imagem_principal.innerHTML = resultado.result[0].Imagem_princ;
   img_sec_1.innerHTML = resultado.result[0].image_secund_1;
   img_sec_2.innerHTML = resultado.result[0].image_secund_2;
   img_sec_3.innerHTML = resultado.result[0].image_secund_3;
   img_sec_4.innerHTML = resultado.result[0].image_secund_4;
   
      
}



carregaDados()*/

async function carregaDados() {
    try {
        const response = await fetch("https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%22product%22%5D%7Btitle,%20description,%20price,%20image_princ,%20%22fotoUrl%22:%20image_princ.asset-%3Eurl,%20%22fotoSecundariaUrl1%22:%20image_secund_1.asset-%3Eurl,%20%22fotoSecundariaUrl2%22:%20image_secund_2.asset-%3Eurl,%20%22fotoSecundariaUrl3%22:%20image_secund_3.asset-%3Eurl,%20%22fotoSecundariaUrl4%22:%20image_secund_4.asset-%3Eurl%7D");
        const data = await response.json();
        
        if (!data.result || data.result.length === 0) {
            console.error("Nenhum produto encontrado na resposta da API.");
            return;
        }
        
        const produto = data.result[0];
        console.log("Produto:", produto); // Confirme a estrutura do objeto `produto` no console

        // Elementos HTML
        const nome = document.querySelector("#nome");
        const detalhe = document.querySelector("#detalhe");
        const valor = document.querySelector("#valor");
        const imagem_principal = document.querySelector("#foto_principal");
        const img_sec_1 = document.querySelector("#img_sec_1");
        const img_sec_2 = document.querySelector("#img_sec_2");
        const img_sec_3 = document.querySelector("#img_sec_3");
        const img_sec_4 = document.querySelector("#img_sec_4");

        // Atualizando o conteúdo dos elementos com dados do produto ou valores padrão
        nome.innerHTML = produto.title || "Nome do produto não disponível";
        detalhe.innerHTML = produto.description || "Descrição do produto não disponível";
        valor.innerHTML = `R$${produto.price.toFixed(2).replace(".", ",")}`;
        
        // Definindo a URL da imagem principal usando `fotoUrl`
        imagem_principal.src = produto.fotoUrl || "./images/default.png";
        
        // Definindo URLs das imagens secundárias usando `fotoSecundariaUrl1`, `fotoSecundariaUrl2`, etc.
        img_sec_1.src = produto.fotoSecundariaUrl1 || "./images/default.png";
        img_sec_2.src = produto.fotoSecundariaUrl2 || "./images/default.png";
        img_sec_3.src = produto.fotoSecundariaUrl3 || "./images/default.png";
        img_sec_4.src = produto.fotoSecundariaUrl4 || "./images/default.png";

        // Função para trocar imagens entre principal e secundária
        function trocaImagem(secundaria) {
            const tempSrc = imagem_principal.src;
            imagem_principal.src = secundaria.src;
            secundaria.src = tempSrc;
        }

        // Adiciona eventos de clique para as imagens secundárias
        img_sec_1.addEventListener("click", () => trocaImagem(img_sec_1));
        img_sec_2.addEventListener("click", () => trocaImagem(img_sec_2));
        img_sec_3.addEventListener("click", () => trocaImagem(img_sec_3));
        img_sec_4.addEventListener("click", () => trocaImagem(img_sec_4));
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

carregaDados();



async function loadRelatedProducts() {
    try {
        const response = await fetch("https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*[_type == 'product']{title, price, 'imageUrl': image_princ.asset->url}");
        const data = await response.json();

        const relatedProductsContainer = document.getElementById("related-products");
        relatedProductsContainer.innerHTML = ""; // Limpar conteúdo anterior

        data.result.forEach((product) => {
            // Gera uma classificação de estrelas aleatória entre 1 e 5 para simular avaliações
            const randomRating = Math.floor(Math.random() * 5) + 1;

            // HTML para cada produto relacionado
            const productHTML = `
                <div onclick="link('https://api.whatsapp.com/send/?phone=5545920013524&text=Olá, gostaria de saber mais sobre a vela ${product.title}.')" class="col-4 cursor-pointer">
                    <img src="${product.imageUrl || './images/default.png'}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <div class="rating">
                        ${'★'.repeat(randomRating)}${'☆'.repeat(5 - randomRating)}
                    </div>
                    <p>R$${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
            `;

            // Inserir o HTML do produto no contêiner
            relatedProductsContainer.insertAdjacentHTML("beforeend", productHTML);
        });
    } catch (error) {
        console.error("Erro ao carregar os produtos relacionados:", error);
    }
}

// Carregar produtos relacionados quando a página for carregada
document.addEventListener("DOMContentLoaded", loadRelatedProducts);




function switch_menu() {
    let dropdown_menu = document.getElementById("drop-down")
    if (dropdown_menu) {
        if (dropdown_menu.classList.contains("opacity-[0]")) {
            dropdown_menu.classList.remove("opacity-[0]")
        } else {
            dropdown_menu.classList.add("opacity-[0]")
        }
    }

}

function link(link) {
    window.location.href = link
}

function getBuy(link, e) {
    console.log(link, e)
    let doc = document.getElementById(e)
    if (doc) {
        window.location.href = link.replace("$quantidade", doc.value)
    }
}