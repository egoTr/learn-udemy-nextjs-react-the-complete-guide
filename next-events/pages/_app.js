// styles
import '../styles/globals.css'

// components
import NavTop from '../components/layout/nav-top'
import Wrapper from '../components/layout/wrapper';

function MyApp({ Component, pageProps }) {
  return <>
    <NavTop />
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  </>
}

export default MyApp
