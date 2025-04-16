import { createClient } from '@sanity/client'

// Oppretter en klient for å kommunisere med Sanity-prosjektet
const sanityClient = createClient({
  projectId: 'h6frulns',         // ID-en til Sanity-prosjektet
  dataset: 'hjemmeside',         // Navnet på datasettet
  apiVersion: '2023-01-01',      // Versjon av Sanity API
  useCdn: false,                 // false = alltid hent fersk data
})

export default sanityClient
