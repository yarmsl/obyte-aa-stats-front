import { FC, memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { saveHomeLayout } from 'store/UI';
import SaveLayoutButtonLayout from './SaveLayoutButton.layout';

const SaveLayoutButton: FC = () => {
  const { homeLayoutsCache } = useAppSelector((st) => st.ui);
  const isCache = useMemo(() => 'sm' in homeLayoutsCache, [homeLayoutsCache]);
  const dispatch = useAppDispatch();
  const save = useCallback(() => dispatch(saveHomeLayout()), [dispatch]);
  if (!isCache) return null;
  return <SaveLayoutButtonLayout save={save} />;
};

export default memo(SaveLayoutButton);
