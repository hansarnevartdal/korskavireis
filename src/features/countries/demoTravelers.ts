export type DemoTraveler = {
  id: string
  displayName: string
  visitedCountryCodes: string[]
}

const nordicAndEuropeLoop = [
  'NO',
  'SE',
  'DK',
  'FI',
  'IS',
  'EE',
  'LV',
  'LT',
  'PL',
  'DE',
  'NL',
  'BE',
  'FR',
  'ES',
  'PT',
  'AD',
  'IT',
  'AT',
  'CH',
  'CZ',
  'HR',
  'BA',
  'ME',
  'GR',
  'IE',
  'GB',
] as const

const asiaCircuit = ['TR', 'AE', 'TH', 'SG', 'MY', 'ID', 'JP', 'KR', 'IN', 'VN'] as const
const americasLoop = ['US', 'CA', 'MX', 'CR', 'CU', 'DO', 'BR', 'AR', 'CL', 'PE', 'CO', 'UY'] as const
const africaLoop = ['MA', 'EG', 'ZA', 'KE', 'TZ', 'GH'] as const
export const demoTravelers: DemoTraveler[] = [
  {
    id: 'demo-hansa',
    displayName: 'Hansa',
    visitedCountryCodes: [
      ...nordicAndEuropeLoop,
      ...asiaCircuit,
      ...americasLoop.slice(0, 8),
      ...africaLoop.slice(0, 3),
    ],
  },
  {
    id: 'demo-marius',
    displayName: 'Marius',
    visitedCountryCodes: [...nordicAndEuropeLoop.slice(0, 18), ...asiaCircuit.slice(0, 4), ...americasLoop.slice(0, 6)],
  },
  {
    id: 'demo-lea',
    displayName: 'Lea',
    visitedCountryCodes: [
      'JP',
      'KR',
      'TH',
      'SG',
      'MY',
      'ID',
      'VN',
      'IN',
      'AE',
      'TR',
      'AU',
      'NZ',
      'ES',
      'PT',
      'IT',
      'HR',
      'GR',
      'EG',
      'MA',
    ],
  },
  {
    id: 'demo-nora',
    displayName: 'Nora',
    visitedCountryCodes: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'FR', 'ES', 'PT', 'IT', 'AT', 'CH'],
  },
]

export const featuredTraveler = demoTravelers[0]

