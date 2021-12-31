import '../styles/globals.css'
import 'bulma/bulma.sass'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'


function MyApp({ Component, pageProps }: AppProps) {
    return (<>
        <Header brand='mesh-viewer'></Header>
        <Component  {...pageProps} />
    </>)
}

export default MyApp
