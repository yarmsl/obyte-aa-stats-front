import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';

interface IHelmetProps {
  title: string;
}

const HelmetTitle = ({ title }: IHelmetProps): JSX.Element => {
  const darkMode = useAppSelector(darkModeSelector);
  return (
    <Helmet>
      <title>{title}</title>
      <meta content={darkMode ? '#252850' : '#ffffff'} name='theme-color' />
    </Helmet>
  );
};

export default memo(HelmetTitle);
