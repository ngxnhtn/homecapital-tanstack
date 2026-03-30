import type { SanityImageSource } from '@sanity/image-url/signed'

import { createImageUrlBuilder } from '@sanity/image-url/signed'
import { createServerFn } from '@tanstack/react-start'

import type { LocalesContextValue } from '../hooks/locales'

const builder = createImageUrlBuilder({
  clientConfig: {
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
  },
})

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source)
}

export const urlForImageServer = createServerFn()
  .inputValidator((data: SanityImageSource) => data)
  .handler(({ data }) => {
    return urlForImage(data).url()
  })

type InternationalArray = Array<{
  _type: string
  value?: string
  language?: string
  _key: string
}>

type ConvertedI18nFormat = {
  [k in LocalesContextValue]: string
}

const convertLocalesFormat = (
  i18nArray: InternationalArray,
): ConvertedI18nFormat => {
  const vi = i18nArray.filter((e) => e.language == 'vi')[0].value || ''
  const en = i18nArray.filter((e) => e.language == 'en')[0].value || ''

  return {
    vi,
    en,
  }
}

export const resolveLanguage = (
  i18nArray: InternationalArray | undefined,
  lang: LocalesContextValue,
) => {
  if (!i18nArray) return ''
  const converted = convertLocalesFormat(i18nArray)

  if (lang == 'vi') {
    return converted['vi']
  } else {
    return converted['en']
  }
}

export type DistrictRoman =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII'
  | 'IX'
  | 'X'
  | 'XI'
  | 'XII'
  | 'XIII'
  | 'XIV'
  | 'XV'
  | 'XVI'
  | 'XVII'
  | 'XVIII'
  | 'XIX'
  | 'XX'

export const getDistrictFromZip = (zip?: number): string => {
  if (!zip) {
    return ''
  } else {
    const arr = String(zip).split('')
    const district = arr[1] + arr[2]
    switch (district) {
      case '01':
        return 'I'
      case '02':
        return 'II'
      case '03':
        return 'III'
      case '04':
        return 'IV'
      case '05':
        return 'V'
      case '06':
        return 'VI'
      case '07':
        return 'VII'
      case '08':
        return 'VIII'
      case '09':
        return 'IX'
      case '10':
        return 'X'
      case '11':
        return 'XI'
      case '12':
        return 'XII'
      case '13':
        return 'XIII'
      case '14':
        return 'XIV'
      case '15':
        return 'XV'
      case '16':
        return 'XVI'
      case '17':
        return 'XVII'
      case '18':
        return 'XVIII'
      case '19':
        return 'XIX'
      case '20':
        return 'XX'
      default:
        return ''
    }
  }
}
