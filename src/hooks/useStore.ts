import create from 'zustand';

interface SearchState {
  searchTerm: string;
  setSearchTerm: (newSearchTerm: string) => void;
}

export const useStore = create<SearchState>((set) => {
  return {
    searchTerm: '',
    setSearchTerm: (newSearchTerm) => {
      set(state => {
        return {
          searchTerm: newSearchTerm,
        };
      });
    },
  }
});