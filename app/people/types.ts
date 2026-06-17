// Generated from lib/schemas/peopleSchema.json in https://transform.tools/json-schema-to-typescript and adapted with ResourceUrl instead of unknown (HATEOAS)

import { ResourceUrl } from "../types"

/**
 * A person within the Star Wars universe
 */
export interface People {
    /**
     * An array of starship resources that this person has piloted
     */
    starships: ResourceUrl[]
    /**
     * the ISO 8601 date format of the time that this resource was edited.
     */
    edited: string
    /**
     * The name of this person.
     */
    name: string
    /**
     * The ISO 8601 date format of the time that this resource was created.
     */
    created: string
    /**
     * The url of this resource
     */
    url: string
    /**
     * The gender of this person (if known).
     */
    gender: string
    /**
     * An array of vehicle resources that this person has piloted
     */
    vehicles: ResourceUrl[]
    /**
     * The skin color of this person.
     */
    skin_color: string
    /**
     * The hair color of this person.
     */
    hair_color: string
    /**
     * The height of this person in meters.
     */
    height: string
    /**
     * The eye color of this person.
     */
    eye_color: string
    /**
     * The mass of this person in kilograms.
     */
    mass: string
    /**
     * An array of urls of film resources that this person has been in.
     */
    films: ResourceUrl[]
    /**
     * The url of the species resource that this person is.
     */
    species: ResourceUrl[]
    /**
     * The url of the planet resource that this person was born on.
     */
    homeworld: string
    /**
     * The birth year of this person. BBY (Before the Battle of Yavin) or ABY (After the Battle of Yavin).
     */
    birth_year: string
}
