import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ClearAdornment from './ClearAdornment';

export default function SearchBar() {

  const [ searchTerm, setSearchTerm ] = useState('');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function onSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        label="Search Term..."
        value={searchTerm}
        onChange={onSearchTermChange}
        fullWidth
        InputProps={{
          endAdornment: (<ClearAdornment setSearchTerm={setSearchTerm} />)
        }}
      />
    </Box>
  )
}