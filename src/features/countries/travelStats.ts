import {
  continentMetadata,
  continentOrder,
  countryMetadata,
  countryMetadataByCode,
  supportedCountryCount,
  type ContinentCode,
  type CountryMetadata,
} from './countryData'

const displayNameCollator = new Intl.Collator('nb-NO', { sensitivity: 'base' })

export type TravelerStatsInput = {
  id: string
  displayName: string
  visitedCountryCodes: string[]
}

export type ContinentBreakdown = {
  continent: ContinentCode
  label: string
  visitedCount: number
  totalCount: number
}

export type TravelerSummary = {
  id: string
  displayName: string
  visitedCountries: CountryMetadata[]
  visitedCountryCount: number
  datasetCoveragePercentage: number
  unsupportedCountryCodes: string[]
  visitedContinentCount: number
  continentBreakdown: ContinentBreakdown[]
  leadingContinent: ContinentBreakdown | null
}

export type LeaderboardRow = TravelerSummary & {
  rank: number
}

export type TravelerComparison = {
  comparedTraveler: string
  countryDelta: number
  sharedVisitedCount: number
  narrative: string
}

export type SuggestedTrip = {
  title: string
  countries: CountryMetadata[]
  reason: string
  continentLabel: string
  subregion: string
}

const continentCountryTotals = Object.fromEntries(
  continentOrder.map((continent) => [
    continent,
    countryMetadata.filter((country) => country.continent === continent).length,
  ]),
) as Record<ContinentCode, number>

function getUniqueNormalizedCountryCodes(countryCodes: string[]): string[] {
  const normalizedCodes: string[] = []
  const seenCodes = new Set<string>()

  for (const countryCode of countryCodes) {
    const normalizedCode = countryCode.trim().toUpperCase()

    if (normalizedCode === '') {
      continue
    }

    if (seenCodes.has(normalizedCode)) {
      continue
    }

    seenCodes.add(normalizedCode)
    normalizedCodes.push(normalizedCode)
  }

  return normalizedCodes
}

function getCountryBuckets(countryCodes: string[]): {
  normalizedCountryCodes: string[]
  visitedCountries: CountryMetadata[]
  unsupportedCountryCodes: string[]
} {
  const normalizedCountryCodes = getUniqueNormalizedCountryCodes(countryCodes)
  const visitedCountries: CountryMetadata[] = []
  const unsupportedCountryCodes: string[] = []

  for (const normalizedCode of normalizedCountryCodes) {
    const country = countryMetadataByCode[normalizedCode]

    if (country === undefined) {
      unsupportedCountryCodes.push(normalizedCode)
      continue
    }

    visitedCountries.push(country)
  }

  return {
    normalizedCountryCodes,
    visitedCountries,
    unsupportedCountryCodes,
  }
}

export function getTravelerSummary(traveler: TravelerStatsInput): TravelerSummary {
  const { normalizedCountryCodes, visitedCountries, unsupportedCountryCodes } = getCountryBuckets(
    traveler.visitedCountryCodes,
  )
  const continentCounts = new Map<ContinentCode, number>()

  for (const country of visitedCountries) {
    continentCounts.set(country.continent, (continentCounts.get(country.continent) ?? 0) + 1)
  }

  const continentBreakdown = continentOrder.map((continent) => ({
    continent,
    label: continentMetadata[continent].label,
    visitedCount: continentCounts.get(continent) ?? 0,
    totalCount: continentCountryTotals[continent],
  }))

  const leadingContinent =
    [...continentBreakdown]
      .sort((left, right) => right.visitedCount - left.visitedCount || left.label.localeCompare(right.label, 'nb-NO'))
      .find((entry) => entry.visitedCount > 0) ?? null

  return {
    id: traveler.id,
    displayName: traveler.displayName,
    visitedCountries,
    visitedCountryCount: normalizedCountryCodes.length,
    datasetCoveragePercentage: Math.round((visitedCountries.length / supportedCountryCount) * 100),
    unsupportedCountryCodes,
    visitedContinentCount: continentBreakdown.filter((entry) => entry.visitedCount > 0).length,
    continentBreakdown,
    leadingContinent,
  }
}

export function rankTravelers(travelers: TravelerStatsInput[]): LeaderboardRow[] {
  return travelers
    .map((traveler) => getTravelerSummary(traveler))
    .sort(
      (left, right) =>
        right.visitedCountryCount - left.visitedCountryCount ||
        displayNameCollator.compare(left.displayName, right.displayName) ||
        left.id.localeCompare(right.id),
    )
    .map((traveler, index) => ({
      ...traveler,
      rank: index + 1,
    }))
}

export function compareTravelers(reference: TravelerStatsInput, traveler: TravelerStatsInput): TravelerComparison {
  const referenceSummary = getTravelerSummary(reference)
  const travelerSummary = getTravelerSummary(traveler)
  const referenceCodes = new Set(referenceSummary.visitedCountries.map((country) => country.code))
  const sharedVisitedCount = travelerSummary.visitedCountries.filter((country) => referenceCodes.has(country.code)).length
  const countryDelta = referenceSummary.visitedCountryCount - travelerSummary.visitedCountryCount
  const differenceLabel =
    countryDelta === 0 ? 'samme antall land som' : countryDelta > 0 ? `${countryDelta} færre land enn` : `${Math.abs(countryDelta)} flere land enn`

  return {
    comparedTraveler: traveler.displayName,
    countryDelta,
    sharedVisitedCount,
    narrative: `${traveler.displayName} har ${differenceLabel} ${reference.displayName} og deler ${sharedVisitedCount} land i datasettet.`,
  }
}

export function buildVacationSuggestions(
  traveler: TravelerStatsInput,
  limit = 3,
): SuggestedTrip[] {
  const travelerSummary = getTravelerSummary(traveler)
  const visitedCodes = new Set(travelerSummary.visitedCountries.map((country) => country.code))
  const continentBreakdownMap = Object.fromEntries(
    travelerSummary.continentBreakdown.map((entry) => [entry.continent, entry]),
  ) as Record<ContinentCode, ContinentBreakdown>
  const unvisitedCountries = countryMetadata.filter((country) => !visitedCodes.has(country.code))
  const countriesBySubregion = new Map<string, CountryMetadata[]>()

  for (const country of unvisitedCountries) {
    const key = `${country.continent}:${country.subregion}`
    const existingGroup = countriesBySubregion.get(key)

    if (existingGroup === undefined) {
      countriesBySubregion.set(key, [country])
      continue
    }

    existingGroup.push(country)
  }

  return [...countriesBySubregion.entries()]
    .map(([groupKey, countries]) => {
      const [continent, subregion] = groupKey.split(':') as [ContinentCode, string]
      const continentBreakdown = continentBreakdownMap[continent]
      const continentLabel = continentMetadata[continent].label

      return {
        title: `${subregion} som neste steg`,
        countries: countries.slice(0, 3),
        reason: `${continentLabel} er fortsatt underrepresentert med ${continentBreakdown.visitedCount} av ${continentBreakdown.totalCount} land i den delte datamodellen. ${subregion} gir et tydelig neste steg uten at forslagene må hardkodes per side.`,
        continentLabel,
        subregion,
        score: continentBreakdown.visitedCount,
      }
    })
    .sort(
      (left, right) =>
        left.score - right.score ||
        right.countries.length - left.countries.length ||
        left.title.localeCompare(right.title, 'nb-NO'),
    )
    .slice(0, limit)
    .map((suggestion) => ({
      title: suggestion.title,
      countries: suggestion.countries,
      reason: suggestion.reason,
      continentLabel: suggestion.continentLabel,
      subregion: suggestion.subregion,
    }))
}

