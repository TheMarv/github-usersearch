import Clear from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";

interface ClearAdornmentProps {
  setSearchTerm: (newSearchTerm: string) => void;
  hidden: boolean
}

export default function ClearAdornment({ setSearchTerm, hidden }: ClearAdornmentProps) {
  return (
    <InputAdornment
      position="start"
      onClick={() => setSearchTerm('')}
      sx={{
          cursor: 'pointer',
          display: hidden ? 'none' : 'flex'
        }}>
      <Clear />
    </InputAdornment>
  )
}