// styles
import '../styles/globals.css'

// components
import NavTop from '../components/layout/nav-top'
import Wrapper from '../components/layout/wrapper';
import Footer from '../components/layout/footer';

function MyApp({ Component, pageProps }) {
  return <>
    <NavTop />
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
    <Footer />
  </>
}

export default MyApp
