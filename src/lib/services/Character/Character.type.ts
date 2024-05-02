export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface CharacterLocation {
  /**
   * The name of the location.
   */
  name: string;
  /**
   * Link to the location's own endpoint.
   */
  url: string;
}

export interface Character {
  /**
   * The id of the character.
   */
  id: number;
  /**
   * The name of the character.
   */
  name: string;
  /**
   * The status of the character ('Alive', 'Dead' or 'unknown').
   */
  status: CharacterStatus;
  /**
   * The species of the character.
   */
  species: string;
  /**
   * The type or subspecies of the character.
   */
  type: string;
  /**
   * The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
   */
  gender: CharacterGender;
  /**
   * origin	object	Name and link to the character's origin location.
   */
  origin: CharacterLocation;
  /**
   * object	Name and link to the character's last known location endpoint.
   */
  location: CharacterLocation;
  /**
   * Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string;
  /**
   * List of episodes in which this character appeared.
   */
  episode: Array<string>;
  /**
   * Link to the character's own URL endpoint.
   */
  url: string;
  /**
   * Time at which the character was created in the database.
   */
  created: string;
}

export interface InfoAndPagination {
  /**
   * The length of the response
   */
  count: number;
  /**
   * The amount of pages
   */
  pages: number;
  /**
   * Link to the next page (if it exists)
   */
  next: string | null;
  /**
   * Link to the previous page (if it exists)
   */
  prev: string | null;
}

export interface GetCharactersProps {
  /**
   * You can access different pages with the page parameter
   */
  page: number;
}

export interface CharactersResult {
  /**
   * The API will automatically paginate the responses. You will receive up to 20 documents per page.
   * Each resource contains an info object with information about the response.
   */
  info: InfoAndPagination;
  /**
   * List of character.
   */
  results: Array<Character>;
}
