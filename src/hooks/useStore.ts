import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../components/UserItem';

interface SearchState {
  searchTerm: string;
  searchTermTimeout: NodeJS.Timeout | null;
  searchResults: User[],
  loading: boolean,
  lastRequest: number;
  page: number;
  hasMore: boolean;
  setPage: (amount: number) => void;
  setSearchTerm: (newSearchTerm: string) => void;
  fetchSearch: () => void;
  toggleFavorites: (id: number) => void;
}

export const useStore = create(
  persist<SearchState>((set, get) => {
    return {
      searchTerm: '',
      searchTermTimeout: null,
      searchResults: [],
      loading: false,
      hasMore: false,
      lastRequest: 0,
      page: 1,
      setSearchTerm: (newSearchTerm) => {
        set(state => {
          if (state.searchTermTimeout) clearTimeout(state.searchTermTimeout);
          if (newSearchTerm.length > 2) {
            return {
              searchResults: [],
              page: 0,
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
          fetch(`https://api.github.com/search/users?q=${get().searchTerm}&per_page=30&page=${get().page}&order=asc`)
            .then(response => response.json())
            .then(data => {
              set(state => {
                const items: User[] = data.items;
                console.log(items.length > 0);
                return {
                  searchResults: [...state.searchResults, ...items].filter((user, index, newArray) => 
                    index === newArray.findIndex(filterUser => filterUser.id === user.id)),
                  loading: false,
                  lastRequest: new Date().getTime(),
                  hasMore: items.length > 0
                }
              });
            });
        }, lastRequest > 0 ? lastRequest : 0);
      },
      toggleFavorites: id => {
        set(state => {
          return {
            searchResults: state.searchResults.map(user => 
              user.id === id ? 
              {...user, favorite: !user.favorite} 
              : user)
          }
        });
      },
      setPage: (amount) => {
        set(state => {
          return {
            page: state.page + amount
          };
        });
      }
    }
  },
  {
    name: 'Github-UserSearch',
    partialize: state => {
      return Object.fromEntries(Object.entries(state).filter(([key]) => ['page', 'searchResults', 'searchTerm'].includes(key)));
    }
  })
);