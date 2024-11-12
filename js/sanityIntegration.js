// Usando o Sanity Client direto do objeto global
const client = window.sanityClient({
    projectId: 'uzgfgx3m', // Substitua com o ID do seu projeto Sanity
    dataset: 'production',        // Substitua pelo seu dataset (geralmente 'production')
    useCdn: true,
  });
  
  async function loadProduct(slug) {
    try {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        title,
        description,
        price,
        "mainImage": image_princ.asset->url,
        "secondaryImages": [
          image_secund_1.asset->url,
          image_secund_2.asset->url,
          image_secund_3.asset->url,
          image_secund_4.asset->url
        ]
      }`;
      const product = await client.fetch(query, { slug });
  
      if (product) {
        document.getElementById('nome').textContent = product.title;
        document.getElementById('valor').textContent = `R$${product.price.toFixed(2)}`;
        document.getElementById('detalhe').textContent = product.description;
        document.getElementById('foto_principal').src = product.mainImage;
  
        const imageIds = ['img_sec_1', 'img_sec_2', 'img_sec_3', 'img_sec_4'];
        product.secondaryImages.forEach((imgUrl, index) => {
          document.getElementById(imageIds[index]).src = imgUrl;
        });
      } else {
        console.error("Produto não encontrado.");
      }
    } catch (error) {
      console.error('Erro ao carregar o produto:', error);
    }
  }
  
  // Função para carregar produtos relacionados
  async function loadRelatedProducts() {
    try {
      const query = `*[_type == "product"][0...4]{
        title,
        price,
        "image": image_princ.asset->url,
        "slug": slug.current
      }`;
      const products = await client.fetch(query);
  
      const productsContainer = document.querySelector('.small-container .row');
      productsContainer.innerHTML = ''; // Limpa os produtos existentes
  
      products.forEach((product) => {
        const productHTML = `
          <div onclick="window.location.href='/produto.html?slug=${product.slug}'" class="col-4 cursor-pointer">
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>R$${product.price.toFixed(2)}</p>
          </div>
        `;
        productsContainer.innerHTML += productHTML;
      });
    } catch (error) {
      console.error('Erro ao carregar produtos relacionados:', error);
    }
  }
  
  // Extrai o slug da URL e carrega o produto
  const urlParams = new URLSearchParams(window.location.search);
  const productSlug = urlParams.get('slug');
  if (productSlug) {
    loadProduct(productSlug);
    loadRelatedProducts();
  }
  