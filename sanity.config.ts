'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {createTranslationAction} from './sanity/actions/createTranslation'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: SITE_URL,
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (prev, context) => {
      const translatableTypes = ['page', 'post', 'therapyOffering']
      if (translatableTypes.includes(context.schemaType)) {
        return [...prev, createTranslationAction]
      }
      return prev
    },
  },
})
