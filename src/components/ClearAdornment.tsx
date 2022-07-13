import Clear from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";

interface ClearAdornmentProps {
  setSearchTerm: (newSearchTerm: string) => void;
}

export default function ClearAdornment({ setSearchTerm }: ClearAdornmentProps) {
  return (
    <InputAdornment
      position="start"
      onClick={() => setSearchTerm('')}
      sx={{
          cursor: 'pointer',
        }}>
      <Clear />
    </InputAdornment>
  )
}