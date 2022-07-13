import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar'
import { IconButton, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

export interface User {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

export default function UserItem({login, id, avatar_url, url}: User) {
  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      paddingY: 2,
      paddingX: 1,
      border: '1px solid black',
    }}>
      <Avatar
        src={avatar_url}
        alt={login}
        sx={{
          width: 72,
          height: 72
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
        <Typography
          component="h2"
          variant="h4"
        >
          {login}
        </Typography>
      </Box>
        <IconButton sx={{
          position: 'absolute',
          right: 1,
          top: 1
        }}>
          <Star />
        </IconButton>
    </Box>
  )
}