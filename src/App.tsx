import Box from '@mui/material/Box';
import Searchbar from './components/Searchbar';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from './hooks/useStore';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

function App() {
  const loading = useStore(state => state.loading);

  return (
    <Container maxWidth="sm" sx={{ paddingY: 3, position: 'relative' }}>
      <Searchbar />
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: 128,
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <UserList />
      <UserDetails />
    </Container>
  );
}

export default App;
