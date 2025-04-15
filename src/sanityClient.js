import { createClient } from '@sanity/client'

// Oppretter en klient for å kommunisere med Sanity-prosjektet
const sanityClient = createClient({
  projectId: 'h6frulns',         // ID-en til ditt Sanity-prosjekt
  dataset: 'hjemmeside',         // Navnet på datasettet du bruker (eks: 'production' eller 'hjemmeside')
  apiVersion: '2023-01-01',      // Versjon av Sanity API (velg en dato)
  useCdn: false,                 // false = alltid hent fersk data (true = hurtigbufret data)
})

export default sanityClient // Eksporterer klienten slik at du kan bruke den i resten av appen
