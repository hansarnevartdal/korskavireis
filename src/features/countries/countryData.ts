export type ContinentCode =
  | 'europe'
  | 'asia'
  | 'africa'
  | 'north-america'
  | 'south-america'
  | 'oceania'

export type CountryMetadata = {
  code: string
  name: string
  continent: ContinentCode
  subregion: string
}

export const totalWorldCountryCount = 195

export const continentOrder: ContinentCode[] = [
  'europe',
  'asia',
  'africa',
  'north-america',
  'south-america',
  'oceania',
]

export const continentMetadata: Record<ContinentCode, { label: string }> = {
  europe: { label: 'Europa' },
  asia: { label: 'Asia' },
  africa: { label: 'Afrika' },
  'north-america': { label: 'Nord-Amerika' },
  'south-america': { label: 'Sør-Amerika' },
  oceania: { label: 'Oseania' },
}

function defineCountry(
  code: string,
  name: string,
  continent: ContinentCode,
  subregion: string,
): CountryMetadata {
  return {
    code,
    name,
    continent,
    subregion,
  }
}

export const countryMetadata: CountryMetadata[] = [
  defineCountry('NO', 'Norge', 'europe', 'Norden'),
  defineCountry('SE', 'Sverige', 'europe', 'Norden'),
  defineCountry('DK', 'Danmark', 'europe', 'Norden'),
  defineCountry('FI', 'Finland', 'europe', 'Norden'),
  defineCountry('IS', 'Island', 'europe', 'Norden'),
  defineCountry('EE', 'Estland', 'europe', 'Baltikum'),
  defineCountry('LV', 'Latvia', 'europe', 'Baltikum'),
  defineCountry('LT', 'Litauen', 'europe', 'Baltikum'),
  defineCountry('PL', 'Polen', 'europe', 'Sentral-Europa'),
  defineCountry('DE', 'Tyskland', 'europe', 'Sentral-Europa'),
  defineCountry('NL', 'Nederland', 'europe', 'Vest-Europa'),
  defineCountry('BE', 'Belgia', 'europe', 'Vest-Europa'),
  defineCountry('FR', 'Frankrike', 'europe', 'Vest-Europa'),
  defineCountry('ES', 'Spania', 'europe', 'Iberia'),
  defineCountry('PT', 'Portugal', 'europe', 'Iberia'),
  defineCountry('AD', 'Andorra', 'europe', 'Iberia'),
  defineCountry('IT', 'Italia', 'europe', 'Middelhavet'),
  defineCountry('AT', 'Østerrike', 'europe', 'Alpeland'),
  defineCountry('CH', 'Sveits', 'europe', 'Alpeland'),
  defineCountry('CZ', 'Tsjekkia', 'europe', 'Sentral-Europa'),
  defineCountry('HR', 'Kroatia', 'europe', 'Balkan'),
  defineCountry('BA', 'Bosnia-Hercegovina', 'europe', 'Balkan'),
  defineCountry('ME', 'Montenegro', 'europe', 'Balkan'),
  defineCountry('GR', 'Hellas', 'europe', 'Balkan'),
  defineCountry('IE', 'Irland', 'europe', 'Vest-Europa'),
  defineCountry('GB', 'Storbritannia', 'europe', 'Vest-Europa'),
  defineCountry('TR', 'Tyrkia', 'asia', 'Anatolia'),
  defineCountry('AE', 'De forente arabiske emirater', 'asia', 'Gulfen'),
  defineCountry('TH', 'Thailand', 'asia', 'Sørøst-Asia'),
  defineCountry('SG', 'Singapore', 'asia', 'Sørøst-Asia'),
  defineCountry('MY', 'Malaysia', 'asia', 'Sørøst-Asia'),
  defineCountry('ID', 'Indonesia', 'asia', 'Sørøst-Asia'),
  defineCountry('JP', 'Japan', 'asia', 'Øst-Asia'),
  defineCountry('KR', 'Sør-Korea', 'asia', 'Øst-Asia'),
  defineCountry('IN', 'India', 'asia', 'Sør-Asia'),
  defineCountry('VN', 'Vietnam', 'asia', 'Sørøst-Asia'),
  defineCountry('US', 'USA', 'north-america', 'Nord-Amerika'),
  defineCountry('CA', 'Canada', 'north-america', 'Nord-Amerika'),
  defineCountry('MX', 'Mexico', 'north-america', 'Nord-Amerika'),
  defineCountry('CR', 'Costa Rica', 'north-america', 'Mellom-Amerika'),
  defineCountry('CU', 'Cuba', 'north-america', 'Karibia'),
  defineCountry('DO', 'Den dominikanske republikk', 'north-america', 'Karibia'),
  defineCountry('BR', 'Brasil', 'south-america', 'Sør-Amerika'),
  defineCountry('AR', 'Argentina', 'south-america', 'Sør-Amerika'),
  defineCountry('CL', 'Chile', 'south-america', 'Sør-Amerika'),
  defineCountry('PE', 'Peru', 'south-america', 'Sør-Amerika'),
  defineCountry('CO', 'Colombia', 'south-america', 'Sør-Amerika'),
  defineCountry('UY', 'Uruguay', 'south-america', 'Sør-Amerika'),
  defineCountry('MA', 'Marokko', 'africa', 'Nord-Afrika'),
  defineCountry('EG', 'Egypt', 'africa', 'Nord-Afrika'),
  defineCountry('ZA', 'Sør-Afrika', 'africa', 'Sør-Afrika'),
  defineCountry('KE', 'Kenya', 'africa', 'Øst-Afrika'),
  defineCountry('TZ', 'Tanzania', 'africa', 'Øst-Afrika'),
  defineCountry('GH', 'Ghana', 'africa', 'Vest-Afrika'),
  defineCountry('AU', 'Australia', 'oceania', 'Oseania'),
  defineCountry('NZ', 'New Zealand', 'oceania', 'Oseania'),
  defineCountry('FJ', 'Fiji', 'oceania', 'Stillehavet'),
  defineCountry('PF', 'Fransk Polynesia', 'oceania', 'Stillehavet'),
  defineCountry('WS', 'Samoa', 'oceania', 'Stillehavet'),
]

export const countryMetadataByCode = Object.fromEntries(
  countryMetadata.map((country) => [country.code, country]),
) as Record<string, CountryMetadata>

export const continentFilterOptions = ['Alle', ...continentOrder.map((continent) => continentMetadata[continent].label)]

