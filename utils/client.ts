import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '4bulp1wx',
  dataset: 'production',
  apiVersion: '2023-09-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
