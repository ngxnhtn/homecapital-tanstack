import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  typegen: {
    path: './src/sanity/**/*.{ts,tsx,js,jsx}',
    schema: './sanity/schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
