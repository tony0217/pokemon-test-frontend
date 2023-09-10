import axiosInstance from "@lib/adapters/axios-adapter";
import { PokemonData } from "@lib/interfaces/pokemon.interfece";

const POKEMON_URL = '/pokemon'

export const pokemonService = {
  async getAllPokemon(): Promise<PokemonData[]> {
    try {
      const response = await axiosInstance.get(POKEMON_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
