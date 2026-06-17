// Generated from lib/schemas/filmsSchema.json in https://transform.tools/json-schema-to-typescript and adapted with ResourceUrl instead of unknown (HATEOAS)

import { ResourceUrl } from "../types"

/**
 * A Star Wars film
 */
export interface Film {
  /**
   * The starship resources featured within this film.
   */
  starships: ResourceUrl[]
  /**
   * the ISO 8601 date format of the time that this resource was edited.
   */
  edited: string
  /**
   * The planet resources featured within this film.
   */
  planets: ResourceUrl[]
  /**
   * The producer(s) of this film.
   */
  producer: string
  /**
   * The title of this film.
   */
  title: string
  /**
   * The url of this resource
   */
  url: string
  /**
   * The release date at original creator country.
   */
  release_date: string
  /**
   * The vehicle resources featured within this film.
   */
  vehicles: ResourceUrl[]
  /**
   * The episode number of this film.
   */
  episode_id: number
  /**
   * The director of this film.
   */
  director: string
  /**
   * The ISO 8601 date format of the time that this resource was created.
   */
  created: string
  /**
   * The opening crawl text at the beginning of this film.
   */
  opening_crawl: string
  /**
   * The people resources featured within this film.
   */
  characters: ResourceUrl[]
  /**
   * The species resources featured within this film.
   */
  species: ResourceUrl[]
}
