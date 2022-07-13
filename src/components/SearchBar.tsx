import TextField from '@mui/material/TextField';
import { useStore } from '../hooks/useStore';
import ClearAdornment from './ClearAdornment';

export default function Searchbar() {

  const searchTerm = useStore(state => state.searchTerm);
  const setSearchTerm = useStore(state => state.setSearchTerm);

  function onSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <TextField
      label="Search Term..."
      value={searchTerm}
      onChange={onSearchTermChange}
      fullWidth
      autoComplete='off'
      InputProps={{
        endAdornment: (<ClearAdornment setSearchTerm={setSearchTerm}/>)
      }}
    />
  )
}