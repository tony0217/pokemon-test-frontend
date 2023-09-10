import { PokemonData } from "./pokemon.interfece";

export interface User {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}


export interface Favorite {
  userId: string;
  pokemon: PokemonData[];
}