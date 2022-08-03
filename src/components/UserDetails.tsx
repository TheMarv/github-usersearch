import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useStore } from '../hooks/useStore';
import UserItem from './UserItem';
import { Skeleton, Typography } from '@mui/material';
import { Home, People, Room, Twitter, Business } from '@mui/icons-material';

type IconName = 'Home' | 'Room' | 'Twitter' | 'Business';

export default function UserDetails() {
  const currentUser = useStore(state => state.currentUser);
  const setCurrentUser = useStore(state => state.setCurrentUser);

  function UserDetailSkeleton() {
    return (
      <>
        <Box display="flex">
          <Skeleton variant="circular" width={72} height={72} />
          <Skeleton variant="text" width={300} sx={{ marginLeft: 2 }} />
        </Box>
        <Box sx={{ paddingLeft: 11 }}>
          <Box display="flex">
            <Skeleton variant="text" width={75} />
            <Typography
              component="span"
              sx={{
                paddingX: 1,
                fontWeight: 700,
              }}
            >
              ·
            </Typography>
            <Skeleton variant="text" width={75} />
          </Box>
          <Skeleton variant="text" width={170} />
          <Skeleton variant="text" width={170} />
          <Skeleton variant="text" width={170} />
          <Skeleton variant="text" width={170} />
        </Box>
      </>
    );
  }

  function formatThousand(amount: number) {
    return amount > 1000 ? (amount / 1000).toFixed(1) + 'k' : amount;
  }

  function displayDetail(detail: string, iconName: IconName, link = '') {
    if (!detail) return '';
    const Icon = () => {
      return iconName === 'Home' ? (
        <Home sx={iconStyle} />
      ) : iconName === 'Room' ? (
        <Room sx={iconStyle} />
      ) : iconName === 'Twitter' ? (
        <Twitter sx={iconStyle} />
      ) : iconName === 'Business' ? (
        <Business sx={iconStyle} />
      ) : (
        <></>
      );
    };
    return (
      <Typography component="p">
        <Icon />
        {link ? (
          <a href={link} rel="noreferrer" target="_blank">
            {detail}
          </a>
        ) : (
          detail
        )}
      </Typography>
    );
  }

  return (
    <>
      {currentUser && (
        <Modal
          open={true}
          onClose={() => setCurrentUser(-1)}
          aria-labelledby="user-detail-title"
          aria-describedby="user-detail-description"
          id="user-modal"
        >
          <Box sx={modalStyle}>
            {!currentUser.user_details && UserDetailSkeleton()}
            {currentUser.user_details && (
              <>
                <UserItem border={false} {...currentUser} />
                <Box sx={{ paddingLeft: 12 }}>
                  <Typography variant="h5">
                    {currentUser.user_details.name}
                  </Typography>
                  <Box display="flex">
                    <Typography component="p">
                      <People sx={iconStyle} />
                      {formatThousand(currentUser.user_details.followers)}{' '}
                      followers
                      <Typography
                        component="span"
                        sx={{
                          paddingX: 1,
                          fontWeight: 700,
                        }}
                      >
                        ·
                      </Typography>
                      {formatThousand(currentUser.user_details.following)}{' '}
                      following
                    </Typography>
                  </Box>
                  {displayDetail(currentUser.user_details.company, 'Business')}
                  {displayDetail(
                    currentUser.user_details.blog,
                    'Home',
                    currentUser.user_details.blog
                  )}
                  {displayDetail(currentUser.user_details.location, 'Room')}
                  {displayDetail(
                    currentUser.user_details.twitter_username,
                    'Twitter',
                    `https://twitter.com/@${currentUser.user_details.twitter_username}`
                  )}
                </Box>
              </>
            )}
          </Box>
        </Modal>
      )}
    </>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const iconStyle = {
  fontSize: 16,
  paddingRight: 0.25,
  verticalAlign: 'middle',
};
