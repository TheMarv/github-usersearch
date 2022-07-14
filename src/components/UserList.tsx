import { Grid } from "@mui/material";
import { useStore } from "../hooks/useStore";
import UserItem from "./UserItem";

export default function UserList() {
  const searchResults = useStore(state => state.searchResults);

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const target = event.target as HTMLDivElement;
    console.log(target.scrollTop, target.scrollHeight - target.clientHeight);
  }

  return (
    <Grid
      container
      spacing={2}
      onScroll={handleScroll}
      sx={{
        overflowY: 'scroll',
        maxHeight: '100%'
      }}
    >
      {searchResults.map(result => (
        <Grid item key={result.id} width="100%">
          <UserItem {...result} />
        </Grid>
      ))}
    </Grid>
  )
}