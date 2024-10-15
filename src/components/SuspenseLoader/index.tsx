import NProgress from 'nprogress';
import { useEffect } from 'react';
import Loader from '../Loader';

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <Loader />;
}

export default SuspenseLoader;
