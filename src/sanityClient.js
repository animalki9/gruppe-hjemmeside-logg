import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'h6frulns',         
  dataset: 'hjemmeside',         
  apiVersion: '2023-01-01', 
  useCdn: false,
});

export default sanityClient;
