import Clear from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import { Dispatch, SetStateAction } from "react";

interface ClearAdornmentProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function ClearAdornment({ setSearchTerm }: ClearAdornmentProps) {
  return (
    <InputAdornment position="start" onClick={() => setSearchTerm('')} sx={{cursor: 'pointer'}}>
      <Clear />
    </InputAdornment>
  )
}