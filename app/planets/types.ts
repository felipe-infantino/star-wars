// Generated from lib/schemas/planetsSchema.json in https://transform.tools/json-schema-to-typescript and adapted with ResourceUrl instead of unknown (HATEOAS)

import { ResourceUrl } from "../types"

/**
 * A planet.
 */
export interface Planet {
    /**
     * The diameter of this planet in kilometers.
     */
    diameter: string
    /**
     * The climate of this planet. Comma-seperated if diverse.
     */
    climate: string
    /**
     * The percentage of the planet surface that is naturally occuring water or bodies of water.
     */
    surface_water: string
    /**
     * The name of this planet.
     */
    name: string
    /**
     * The ISO 8601 date format of the time that this resource was created.
     */
    created: string
    /**
     * The hypermedia URL of this resource.
     */
    url: string
    /**
     * The number of standard hours it takes for this planet to complete a single rotation on its axis.
     */
    rotation_period: string
    /**
     * the ISO 8601 date format of the time that this resource was edited.
     */
    edited: string
    /**
     * the terrain of this planet. Comma-seperated if diverse.
     */
    terrain: string
    /**
     * A number denoting the gravity of this planet. Where 1 is normal.
     */
    gravity: string
    /**
     * The number of standard days it takes for this planet to complete a single orbit of its local star.
     */
    orbital_period: string
    /**
     * An array of Film URL Resources that this planet has appeared in.
     */
    films: ResourceUrl[]
    /**
     * An array of People URL Resources that live on this planet.
     */
    residents: ResourceUrl[]
    /**
     * The average populationof sentient beings inhabiting this planet.
     */
    population: string
}
