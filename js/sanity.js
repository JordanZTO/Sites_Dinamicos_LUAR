// sanity.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'uzgfgx3m', // substitua pelo seu Project ID
  dataset: 'production',
  useCdn: true, // usar CDN para uma melhor performance
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client;
