import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Gruppehjemmeside',

  projectId: 'h6frulns',
  dataset: 'hjemmeside',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
