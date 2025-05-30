import { create } from 'zustand';

const usePokemonStore = create((set) => ({
  pokemonList: [],
  addPokemon: (pokemon) => set((state) => ({
    pokemonList: [...state.pokemonList, pokemon]
  })),
  clearPokemon: () => set({ pokemonList: [] }),
}));

export default usePokemonStore;