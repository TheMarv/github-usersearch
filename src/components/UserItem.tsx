import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { User, useStore } from '../hooks/useStore';

interface UserProps extends User {
  border?: boolean;
}

export default function UserItem({
  login,
  id,
  avatar_url,
  favorite,
  border = true,
}: UserProps) {
  const toggleFavorite = useStore(state => state.toggleFavorites);
  const setCurrentUser = useStore(state => state.setCurrentUser);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        paddingY: 2,
        paddingX: 1,
        border: border ? '1px solid black' : '',
      }}
      onClick={() => setCurrentUser(id)}
    >
      <Avatar
        src={avatar_url}
        alt={login}
        sx={{
          width: 72,
          height: 72,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 2,
          justifyContent: 'center',
        }}
      >
        <Typography component="h2" variant="h4">
          {login}
        </Typography>
      </Box>
      <IconButton
        sx={{
          position: 'absolute',
          right: 1,
          top: 1,
          color: favorite ? 'gold' : 'gray',
        }}
        onClick={() => toggleFavorite(id)}
      >
        <Star />
      </IconButton>
    </Box>
  );
}
