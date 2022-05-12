import { FC, memo /* useCallback, useEffect, useRef, useState */ } from 'react';
import HomeDashboard from 'UI/organisms/HomeDashboard/HomeDashboard';
// import obyte, { Client } from 'obyte';
// import { useAppDispatch } from 'store';
// import { showSnackBar } from 'store/SnackStack';
// import { apiGet } from 'lib/api';
import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

// eslint-disable-next-line arrow-body-style
const Home: FC = () => {
  // const socket = useRef<Client | null>(null);
  // const [data, setData] = useState<unknown>('');
  // const dispatch = useAppDispatch();

  // const getData = useCallback(
  //   async (obyteClient: Client, address: string) => {
  //     try {
  //       const res = await obyteClient.api.getDefinition(address);
  //       if ('doc_url' in res[1]) {
  //         console.log('doc_url: ', res[1].doc_url);
  //         const meta = await apiGet(res[1].doc_url);
  //         setData(meta);
  //       } else if ('base_aa' in res[1]) {
  //         console.log('base_aa: ', res[1].base_aa);
  //         getData(obyteClient, res[1].base_aa);
  //       }
  //     } catch (e) {
  //       dispatch(
  //         showSnackBar({
  //           message: e instanceof Error ? e.message : `${e}`,
  //           severity: 'error',
  //           closable: true,
  //         })
  //       );
  //     }
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   socket.current = new obyte.Client();
  //   if (socket.current != null) {
  //     getData(socket.current, 'FU3N6IQCX3D6IB6HA2QP65YHMZQEKEXJ');
  //   }
  //   return () => {
  //     if (socket.current != null) {
  //       socket.current.close();
  //     }
  //   };
  // }, [getData]);

  // console.log(data);

  return (
    <>
      <HelmetTitle title='Home' />
      <HomeDashboard />
    </>
  );
};

export default memo(Home);
