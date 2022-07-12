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
      <meta name='theme-color' content={darkMode ? '#252850' : '#ffffff'} />
    </Helmet>
  );
};

export default memo(HelmetTitle);
