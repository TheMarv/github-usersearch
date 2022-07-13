import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import UserItem from "./UserItem";

export default function UserList() {

  const searchResults = useStore(state => state.searchResults);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults])

  return (
    <Grid container spacing={2}>
      {searchResults.map(result => (
        <Grid item key={result.id} width="100%">
          <UserItem {...result} />
        </Grid>
      ))}
    </Grid>
  )
}