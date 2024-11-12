// sanityClient.js
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'YOUR_PROJECT_ID', // Substitua por seu Project ID do Sanity
  dataset: 'production', // Nome do dataset que está usando (normalmente 'production')
  apiVersion: '2023-10-19', // Versão da API, por exemplo, uma data
  useCdn: true // Use o CDN para otimizar a velocidade
});

export async function fetchProducts() {
  const query = `*[_type == "product"]{
    title,
    description,
    price,
    "imageUrl": image.asset->url,
    slug
  }`;
  return await client.fetch(query);
}
