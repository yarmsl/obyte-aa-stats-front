import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

const NotFound = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <>
      <HelmetTitle title='404' />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ m: '20px 0' }} variant='h3'>
          There is no such page yet
        </Typography>
        <Button
          color='secondary'
          size='large'
          variant='contained'
          onClick={() => nav('/')}
        >
          back to safe
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
