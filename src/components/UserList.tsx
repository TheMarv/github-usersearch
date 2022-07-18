import { CircularProgress, Grid, Typography } from "@mui/material";
import { useStore } from "../hooks/useStore";
import UserItem from "./UserItem";
import PullToRefresh from 'react-simple-pull-to-refresh';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function UserList() {
  const searchResults = useStore(state => state.searchResults);
  const hasMore = useStore(state => state.hasMore);
  const setPage = useStore(state => state.setPage);
  const fetchSearch = useStore(state => state.fetchSearch);

  return (
    <PullToRefresh onRefresh={async () => {
      setPage(-1);
      fetchSearch();
    }}>
      <Grid container>
        <InfiniteScroll
          dataLength={searchResults.length}
          hasMore={hasMore}
          next={() => {
            setPage(1);
            fetchSearch();
          }}
          loader={<CircularProgress />}
          endMessage={
            <Typography component="p">No more results</Typography>
          }
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          {searchResults.map(result => (
            <Grid item key={result.id} width="100%">
              <UserItem {...result} />
            </Grid>
          ))}
        </InfiniteScroll>
      </Grid>
    </PullToRefresh>
  )
}