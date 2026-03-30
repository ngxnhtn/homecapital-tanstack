import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import { runQuery } from './client'
import {
  aboutQuery,
  agencyQuery,
  allQuery,
  entryQuery,
  featuredQuery,
  landingQuery,
  latestQuery,
} from './query'

// AGENCY

const getAgency = createServerFn().handler(async () => {
  const agency = await runQuery(agencyQuery)
  return agency
})

export const agencyQueryOptions = () =>
  queryOptions({
    queryKey: ['agency'],
    queryFn: () => getAgency(),
    staleTime: 5 * 60 * 1000,
  })

// LANDING

const getLanding = createServerFn().handler(async () => {
  console.log(`${new Date().toISOString()} -> Begin fetch: Landing`)
  const landing = await runQuery(landingQuery)
  return landing
})

export const landingQueryOptions = () =>
  queryOptions({
    queryKey: ['landing'],
    queryFn: () => getLanding(),
    staleTime: 5 * 60 * 1000,
  })

// About

const getAbout = createServerFn().handler(async () => {
  console.log(`${new Date().toISOString()} -> Begin fetch: About`)
  const about = await runQuery(aboutQuery)
  return about
})

export const aboutQueryOptions = () =>
  queryOptions({
    queryKey: ['about'],
    queryFn: () => getAbout(),
    staleTime: 5 * 60 * 1000,
  })

// Featured

const getFeatured = createServerFn().handler(async () => {
  const featured = await runQuery(featuredQuery)
  return featured
})

export const featuredQueryOptions = () =>
  queryOptions({
    queryKey: ['properties', 'featured'],
    queryFn: () => getFeatured(),
  })

// Latest

const getLatest = createServerFn()
  .inputValidator((data: 'rent' | 'sale') => data)
  .handler(async ({ data }) => {
    const latest = await runQuery(latestQuery(data))
    return latest
  })

export const latestQueryOptions = (status: 'sale' | 'rent') =>
  queryOptions({
    queryKey: ['properties', status],
    queryFn: () => getLatest({ data: status }),
  })

// All

const getAll = createServerFn().handler(async () => {
  const all = await runQuery(allQuery)
  return all
})

export const allQueryOptions = () =>
  queryOptions({
    queryKey: ['properties', 'all'],
    queryFn: () => getAll(),
  })

// Entry

const getEntry = createServerFn()
  .inputValidator((data: string) => data)
  .handler(async ({ data }) => {
    const entry = await runQuery(entryQuery(data))
    return entry
  })

export const entryQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['property', slug],
    queryFn: () => getEntry({ data: slug }),
  })
