import { createClient } from '@sanity/client'
import { createGroqBuilder, makeSafeQueryRunner } from 'groqd'

import type * as SanityTypes from '../../sanity.types'

const client = () => {
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: process.env.SANITY_API_VERSION,
    dataset: process.env.SANITY_DATASET,
  })
}

const q = createGroqBuilder<{
  schemaTypes: SanityTypes.AllSanitySchemaTypes
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo
}>()

const runQuery = makeSafeQueryRunner((query) => client().fetch(query))

export { client, q, runQuery }
