import TextField from '@mui/material/TextField';
import { useStore } from '../hooks/useStore';
import ClearAdornment from './ClearAdornment';
import { useState } from 'react';

export default function Searchbar() {
  const [hideClear, setHideClear] = useState(true);

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
      autoComplete="off"
      onFocus={() => setHideClear(false)}
      onBlur={() => setHideClear(true)}
      InputProps={{
        endAdornment: (
          <ClearAdornment setSearchTerm={setSearchTerm} hidden={hideClear} />
        ),
      }}
    />
  );
}
