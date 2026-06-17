// These specs hit the real swapi.py4e.com API (the app has no mocking layer —
// fetches happen server-side in RSCs, so browser-level route mocking can't reach them).
// The counts below come from this canonical, long-frozen dataset and aren't expected to change.
export const PAGE_SIZE = 10

export const RESOURCES = [
  { path: '/people', title: 'People', count: 87 },
  { path: '/planets', title: 'Planets', count: 61 },
  { path: '/films', title: 'Films', count: 7 },
  { path: '/species', title: 'Species', count: 37 },
  { path: '/vehicles', title: 'Vehicles', count: 39 },
  { path: '/starships', title: 'Starships', count: 37 },
] as const

export const DETAIL_FIXTURES = [
  {
    path: '/planets/1',
    name: 'Tatooine',
    props: ['arid', 'desert', '200000'],
    accordions: { Residents: 10, Films: 5 },
  },
  {
    path: '/species/1',
    name: 'Human',
    props: ['mammal', 'sentient', 'Galactic Basic'],
    accordions: { People: 35, Films: 7 },
  },
  {
    path: '/starships/12',
    name: 'X-wing',
    props: ['Starfighter', 'Incom Corporation'],
    accordions: { Pilots: 4, Films: 3 },
  },
  {
    path: '/vehicles/14',
    name: 'Snowspeeder',
    props: ['airspeeder', 'Incom corporation'],
    accordions: { Pilots: 2, Films: 1 },
  },
] as const
