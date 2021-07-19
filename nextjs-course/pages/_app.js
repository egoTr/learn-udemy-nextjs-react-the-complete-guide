import { Provider } from 'next-auth/client';
import '../styles/global.css'
import NavTop from '../components/layout/nav-top';

function MyApp({ Component, pageProps }) {
  return <Provider session={pageProps.session}>
    <NavTop />
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
