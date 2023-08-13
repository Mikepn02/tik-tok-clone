import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '4bulp1wx',
  dataset: 'production',
  apiVersion: '2022-08-13',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
