import create from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  searchTerm: string;
  searchTermTimeout: NodeJS.Timeout | null;
  searchResults: any[],
  loading: boolean,
  lastRequest: number;
  setSearchTerm: (newSearchTerm: string) => void;
  fetchSearch: () => void;
}

export const useStore = create(
  persist<SearchState>((set, get) => {
    return {
      searchTerm: '',
      searchTermTimeout: null,
      searchResults: [],
      loading: false,
      lastRequest: 0,
      setSearchTerm: (newSearchTerm) => {
        set(state => {
          if (state.searchTermTimeout) clearTimeout(state.searchTermTimeout);
          if (newSearchTerm.length > 2) {
            return {
              searchTerm: newSearchTerm,
              searchTermTimeout: setTimeout(get().fetchSearch, 500),
            }
          }
          return {
            searchTerm: newSearchTerm,
          };
        });
      },
      fetchSearch: () => {
        set(state => {
          return {
            loading: true
          }
        });
        const lastRequest = get().lastRequest + 6000 - new Date().getTime();
        setTimeout(() => {
          fetch(`https://api.github.com/search/users?q=${get().searchTerm}&order=asc`)
            .then(response => response.json())
            .then(data => {
              const items: any[] = data.items;
              set(state => {
                return {
                  searchResults: [...state.searchResults, ...items],
                  loading: false,
                  lastRequest: new Date().getTime()
                }
              });
            });
        }, lastRequest > 0 ? lastRequest : 0);
      }
    }
  },
  {
    name: 'Github-UserSearch',
    partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => !["favourites"].includes(key)))
  })
);