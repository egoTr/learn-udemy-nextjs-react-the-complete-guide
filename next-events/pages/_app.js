// styles
import '../styles/globals.css'

// components
import NavTop from '../components/layout/nav-top'
import Wrapper from '../components/layout/wrapper';
import Footer from '../components/layout/footer';

// notification context
import NotificationProvider from "../hooks/context-notification";

function MyApp({ Component, pageProps }) {
  return <NotificationProvider>
    <NavTop />
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
    <Footer />
  </NotificationProvider>
}

export default MyApp
