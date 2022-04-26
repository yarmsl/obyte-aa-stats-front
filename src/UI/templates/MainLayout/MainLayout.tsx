import { Container } from '@mui/material';
import { FC, memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from 'UI/atoms/Loading/Loading';
import Header from 'UI/templates/Header/Header';
import Footer from '../Footer/Footer';
import { styles } from './styles';

const MainLayout: FC = () => (
  <Container sx={styles.root} disableGutters maxWidth={false}>
    <Header />
    <Container component='main' disableGutters sx={styles.main} maxWidth='lg'>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Container>
    <Footer />
  </Container>
);

export default memo(MainLayout);
